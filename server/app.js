const express = require('express');
const swaggerUI = require('swagger-ui-express');
const AppError = require('./utils/error/appError');

const app = express();

// Enable compression to reduce response sizes
app.use(require('compression')());

// Enable CORS
app.use(require('cors')());

// Use cookie parser middleware
app.use(require('cookie-parser')());

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger documentation route
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(require('./swaggers/options'))
);

// User API routes
app.use('/api/v1/users', require('./routes/usersRouter'));

// Fallback for unmatched routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler middleware
app.use(require('./controllers/errorController'));

module.exports = app;
