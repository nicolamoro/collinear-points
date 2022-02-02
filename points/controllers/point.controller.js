const PointModel = require('../models/points.model.js');

/**
 * @swagger
 * tags:
 *   name: Points
 *   description: Points management.
 */

/**
 * @swagger
 * path:
 *  /points/:
 *    post:
 *      summary: Create a new point.
 *      tags: [Points]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PointCreateRequest'
 *      responses:
 *        "201":
 *          description: Point has been created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PointResponse'
 *        "400":
 *          description: If input parameters are invalid.
 */
exports.insert = (req, res) => {
  const x = req.body.x;
  const y = req.body.y;

  if (x === undefined ||
    y === undefined) {
    res.status(400).send('Invalid input parameters');
    return;
  }

  PointModel.findByXY(x, y)
    .then((oldvalue) => {
      if (oldvalue.length > 0) {
        res.status(400).send('Point already present');
        return;
      }

      PointModel.createPoint({
        x: x,
        y: y,
      })
        .then((result) => {
          res.status(201).send({
            id: result._id,
            x: result.x,
            y: result.y,
          });
        });
    });
};

/**
 * @swagger
 * path:
 *  /points/{pointGuid}:
 *    get:
 *      summary: Get single points.
 *      tags: [Points]
 *      parameters:
 *        - in: path
 *          name: pointGuid
 *          schema:
 *            type: string
 *          required: true
 *          description: Guid of the point.
 *      responses:
 *        "200":
 *          description: Return point information.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PointResponse'
 *        "404":
 *          description: Point guid is not found.
 */
exports.getById = (req, res) => {
  PointModel.findById(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send('GUID not found');
      } else {
        res.status(200).send({
          id: result._id,
          x: result.x,
          y: result.y,
        });
      }
    });
};

/**
 * @swagger
 * path:
 *  /points/:
 *    get:
 *      summary: Get all points.
 *      tags: [Points]
 *      responses:
 *        "200":
 *          description: Return all points.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/PointResponse'
 */
exports.getAll = (req, res) => {
  PointModel.listAll()
    .then((points) => {
      res.status(200).send(points.map((point) => {
        return {
          id: point._id,
          x: point.x,
          y: point.y,
        };
      }));
    });
};

/**
 * @swagger
 * path:
 *  /points/{pointGuid}:
 *    delete:
 *      summary: Delete single points.
 *      tags: [Points]
 *      parameters:
 *        - in: path
 *          name: pointGuid
 *          schema:
 *            type: string
 *          required: true
 *          description: Guid of the point.
 *      responses:
 *        "204":
 *          description: Point successfully removed.
 *        "404":
 *          description: Point guid is not found.
 */
exports.removeById = (req, res) => {
  PointModel.removeById(req.params.id)
    .then((result) => {
      res.status(204).send({});
    });
};

/**
 * @swagger
 * path:
 *  /points/:
 *    delete:
 *      summary: Delete all points.
 *      tags: [Points]
 *      responses:
 *        "204":
 *          description: Points successfully removed.
 */
exports.removeAll = (req, res) => {
  PointModel.removeAll(req.params.id)
    .then((result) => {
      res.status(204).send({});
    });
};
