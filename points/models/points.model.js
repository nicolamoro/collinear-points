const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

/**
 * @swagger
 *  components:
 *    schemas:
 *      PointCreateRequest:
 *        type: object
 *        required:
 *          - x
 *          - y
 *        properties:
 *          x:
 *            type: integer
 *            description: x coordinate of the point.
 *          y:
 *            type: integer
 *            description: y coordinate of the point.
 *        example:
 *          x: 2
 *          y: 5
 *      PointResponse:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: GUID of the point.
 *          x:
 *            type: integer
 *            description: x coordinate of the point.
 *          y:
 *            type: integer
 *            description: y coordinate of the point.
 *        example:
 *          id: 5e61079f70e21605208baff2
 *          x: 2
 *          y: 5
 *      LineResponse:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/PointResponse'
 */

const pointSchema = new Schema({
  x: Number,
  y: Number,
});

pointSchema.virtual('id').get(() => this._id.toHexString());

// Ensure virtual fields are serialised.
pointSchema.set('toJSON', {
  virtuals: true,
});

pointSchema.findById = (cb) => {
  return this.model('Points').find({
    id: this.id,
  }, cb);
};

const Point = mongoose.model('Points', pointSchema);

exports.findById = (id) => {
  return Point.findById(id)
    .then((result) => {
      if (!result) {
        return null;
      }

      return result;
    });
};

exports.findByXY = (x, y) => {
  return Point.find({x: x, y: y})
    .then((result) => {
      if (!result) {
        return null;
      }

      return result;
    });
};

exports.createPoint = (pointData) => {
  const point = new Point(pointData);
  return point.save();
};

exports.listPaged = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Point.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.listAll = () => {
  return new Promise((resolve, reject) => {
    Point.find()
      .exec((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.patchPoint = (id, pointData) => {
  return new Promise((resolve, reject) => {
    Point.findById(id, (err, point) => {
      if (err) reject(err);
      for (const i in pointData) {
        if ({}.hasOwnProperty.call(pointData, i)) {
          point[i] = pointData[i];
        }
      }
      point.save((err, result) => {
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

exports.removeById = (pointId) => {
  return new Promise((resolve, reject) => {
    Point.deleteOne({
      _id: pointId,
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

exports.removeAll = () => {
  return new Promise((resolve, reject) => {
    Point.deleteMany({}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
