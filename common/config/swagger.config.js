exports.options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Collinear Points',
      version: '1.0.0',
      description:
        'A service that exhibits ReST API interface ' +
        'and store informations in a persistence layer, ' +
        'to determine lines that contains collinear points.',
      contact: {
        name: 'Nicola Moro',
        email: 'nikimoro@gmail.com',
      },
    },
  },
  apis: [
    './points/models/points.model.js',
    './points/controllers/point.controller.js',
    './lines/controllers/line.controller.js',
  ],
};
