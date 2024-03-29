const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PointsRouter = require('./points/routes.config');
const LinesRouter = require('./lines/routes.config');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerConfig = require('./common/config/swagger.config.js');
const swaggerSpecs = swaggerJsdoc(swaggerConfig.options);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, X-Requested-With, Range',
  );
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
PointsRouter.routesConfig(app);
LinesRouter.routesConfig(app);

app.listen(config.port, () => {
  console.log('App listening at port %s', config.port);
});
