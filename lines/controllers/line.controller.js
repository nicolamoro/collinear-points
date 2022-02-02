const PointModel = require('../../points/models/points.model.js');
const LinesBusiness = require('../business/lines.business.js');

/**
 * @swagger
 * tags:
 *   name: Lines
 *   description: Lines management.
 */

/**
 * @swagger
 * path:
 *  /lines/{pointsNumber}:
 *    get:
 *      summary: Get all lines passing through at least N points.
 *      tags: [Lines]
 *      parameters:
 *        - in: path
 *          name: pointsNumber
 *          schema:
 *            type: integer
 *          required: true
 *          description: Number of points.
 *      responses:
 *        "200":
 *          description: Return all lines that meet the criteria
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/LineResponse'
 *        "400":
 *          description: points number is invalid.
 *        "404":
 *          description: no lines matching criteria found.
 */
exports.getByPointsNumber = async (req, res) => {
  const pointsNumber = req.params.pointsNumber;

  if (pointsNumber <= 0) {
    res.status(400).send('Points number must be between greater than 0');
    return;
  }
  if (pointsNumber == 1) {
    res.status(400).send('Through a single point it pass infinite lines');
    return;
  }

  const allPoints = await PointModel.listAll();
  const lines = LinesBusiness.getLinesWithNPoints(allPoints, pointsNumber);

  if (lines.length == 0) {
    res.status(404).send('No lines matching criteria');
    return;
  }

  res.status(200).send(lines.map((line) => {
    return line.map((point) => {
      return {
        id: point._id,
        x: point.x,
        y: point.y,
      };
    });
  }));
};
