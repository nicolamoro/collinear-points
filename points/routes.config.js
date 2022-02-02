const PointController = require('./controllers/point.controller');

exports.routesConfig = (app) => {
  app.post('/points', [
    PointController.insert,
  ]);
  app.get('/points', [
    PointController.getAll,
  ]);
  app.delete('/points', [
    PointController.removeAll,
  ]);
  app.get('/points/:id', [
    PointController.getById,
  ]);
  app.delete('/points/:id', [
    PointController.removeById,
  ]);
};
