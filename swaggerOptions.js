const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Description of your API',
      },
      
      servers: [
        {
          url: 'http://localhost:3000', // Update with your server URL
          description: 'Development Server',
        },
      ],
    },
    apis: ['./src/users/*.js','./src/todos/*.js'], // Update with the path to your route files
  };
  
  module.exports = swaggerOptions;
  