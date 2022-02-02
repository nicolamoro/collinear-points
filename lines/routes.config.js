const LineController = require('./controllers/line.controller');

exports.routesConfig = (app) => {
  app.get('/lines/:pointsNumber(\\d+)', [
    LineController.getByPointsNumber,
  ]);
};
