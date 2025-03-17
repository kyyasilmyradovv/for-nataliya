const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Test Work Api',
      version: '1.0.0',
      description: 'Test Work API documentation.',
      contact: {
        name: 'Kyyas Ilmyradov',
        email: 'kyyas.ilmyradov@gmail.com',
        telegram: '@kyyasilmyradov',
      },
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      variables: {
        host: {
          enum: ['localhost'],
          default: 'localhost',
        },
        port: {
          default: process.env.PORT,
        },
      },
    },
  ],
  apis: [`${__dirname}/*.yaml`, `${__dirname}/*/*.yaml`],
};

const specs = require('swagger-jsdoc')(options);

module.exports = specs;
