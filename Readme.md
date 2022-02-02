# Collinear Points

Welcome! :)

The purpose of this project is to create a service that exhibits ReST API interface, allow to insert / read / delete points in a bidimensional space (saving them to a persistence layer), and give the possibility to determine every line that contains at least N or more collinear points.

This is my personal implementation for the interview assignment.

## Getting Started

Some basic information about the technological stack used.

### Prerequisites

All of this technologies have been used for this project:
- [Node JS](https://nodejs.org/en/): JavaScript runtime
- [MongoDB](https://www.mongodb.com/): general purpose, document-based, distributed database
- [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/): Node.js package managers
- [Docker](https://www.docker.com/): platform to create, deploy and manage virtualized application containers

If you don't want to use Docker, you have to install this components in your local machine.

### Other npm packages used

- [express](https://expressjs.com/): web framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware
- [mongoose](https://mongoosejs.com/): mongodb object modeling for Node.js
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express):  serve auto-generated swagger-ui generated API docs
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc): document code and keep a live and reusable OpenAPI (Swagger) specification
- [eslint](https://eslint.org/): JavaScript linting utility *(dev dependency)*
- [eslint-config-google](https://github.com/google/eslint-config-google): ESLint shareable config for the Google JavaScript style guide *(dev dependency)*
- [mocha](https://mochajs.org/): feature-rich JavaScript test framework *(dev dependency)*
- [chai](https://www.chaijs.com/): BDD / TDD assertion library *(dev dependency)*
- [chai-things](https://www.chaijs.com/plugins/chai-things/): adds support to Chai for assertions on array elements *(dev dependency)*

### Installing

After cloning the repository, as usual you need to fetch external dependencies:

```
yarn install
```

## Configuration

In the `common/config/env.config.js` file you will find some configuration parameter for the project:
- **port**: port for the ReST endpoint of the service (default: *3600*);
- **dbUri**: uri of the MongoDB instance (default: *mongodb://mongo:27017/collinear-points* - change it to *mongodb://localhost:27017/collinear-points* if you want to run the project in your local machine).

## Running the project

### Using Docker

To run the project using Docker, execute in terminal console:

```
docker-compose up
```

### On your local machine

To run the project on your local machine, execute in terminal console:

```
npm start
```

## APIs documentation

You can find detailed auto-generated information about ReST API at uri:

```
http://ADDRESS:PORT/api-docs/
```

The ReST API expose following endpoints:

### CREATE POINT endpoint

This endpoint is reachable using **POST method** at uri:

```
http://ADDRESS:PORT/points/
```

The payload of the HTTP request, encoded with *application/json* content type, must be in the form:

```
{
  "x": POINT_X_COORDINATE,
  "y": POINT_Y_COORDINATE
}
```

Both *x* and *y* are intended to be integer values.
If all data is ok and the point is not yet saved, the response will be in the form:

```
{
  "id": POINT_GUID,
  "x": POINT_X_COORDINATE,
  "y": POINT_Y_COORDINATE
}
```

### RETRIEVE SINGLE POINT endpoint 

This endpoint is reachable using **GET method** at uri:

```
http://ADDRESS:PORT/points/POINT_GUID
```

If point exists, the response will be in the form:

```
{
  "id": POINT_GUID,
  "x": POINT_X_COORDINATE,
  "y": POINT_Y_COORDINATE
}
```

### RETRIEVE ALL POINTS endpoint 

This endpoint is reachable using **GET method** at uri:

```
http://ADDRESS:PORT/points
```

The response will be in the form:

```
[
  {
    "id": POINT1_GUID,
    "x": POINT1_X_COORDINATE,
    "y": POINT1_Y_COORDINATE
  },
  {
    "id": POINT2_GUID,
    "x": POINT2_X_COORDINATE,
    "y": POINT2_Y_COORDINATE
  },
  ...
]
```

### DELETE SINGLE POINT endpoint 

This endpoint is reachable using **DELETE method** at uri:

```
http://ADDRESS:PORT/points/POINT_GUID
```

If point exists, the point will be removed from persistence layer.

### DELETE ALL POINTS endpoint 

This endpoint is reachable using **DELETE method** at uri:

```
http://ADDRESS:PORT/points
```

All the points saved will be removed from persistence layer.

### RETRIEVE ALL LINES WITH N POINTS endpoint 

This endpoint is reachable using **GET method** at uri:

```
http://ADDRESS:PORT/lines/POINTS_NUMBER
```

The response will contain every line that contains at least N or more collinear points among those inserted (a line segment is a set of collinear points). The response will be in the form:

```
[
  [
    {
      "id": POINT1_GUID,
      "x": POINT1_X_COORDINATE,
      "y": POINT1_Y_COORDINATE
    },
    {
      "id": POINT2_GUID,
      "x": POINT2_X_COORDINATE,
      "y": POINT2_Y_COORDINATE
    },
    ...
  ],
  [
    {
      "id": POINT4_GUID,
      "x": POINT4_X_COORDINATE,
      "y": POINT4_Y_COORDINATE
    },
    {
      "id": POINT5_GUID,
      "x": POINT5_X_COORDINATE,
      "y": POINT5_Y_COORDINATE
    },
    ...
  ],
  ...
]
```

## Running the tests

To run automated unit tests use the command:

```
npm run test
```

To execute also some kind of smoke test, you can use your favorite ReST client (e.g. [Postman](https://www.postman.com/) or [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for VS Code), and inside the `test/rest-client.http` file you will find an example of calls to the endpoints (using VS Code extension can be run directly from there).

### Coding style tests

For this test we have choosen [Google JavaScript style guide (ES2015+ version)](https://google.github.io/styleguide/jsguide.html) as coding style.

To run coding style tests use the command:

```
npm run eslint
```

## Authors

* **Nicola Moro** - *Initial work* - [nikiz](https://dev.azure.com/nikiz) - nikimoroAtGmailDotCom

## Acknowledgments

* Thanks to [Alessandra](https://www.facebook.com/alessandra.detoffoli) for feeding me during this work! :yum:
