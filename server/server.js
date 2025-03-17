require('dotenv').config({ path: './config/config.env' });
const { sequelize } = require('./models');
const cluster = require('cluster');
const os = require('os');
const process = require('process');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running with ${numCPUs} CPUs.`);
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection. In this case it is an Express app.
  const app = require('./app');
  const port = process.env.PORT || 5005;
  app.listen(port, async () => {
    await sequelize.authenticate();
    sequelize.connectionManager.pool;

    console.log(
      `Connected to DB and listening on port  ${port} - ${process.env.NODE_ENV}...`
    );
  });

  process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    app.close(() => {
      process.exit();
    });
  });
}
