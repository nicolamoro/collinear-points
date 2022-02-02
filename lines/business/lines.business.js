exports.isInLine = (point1, point2, pointToSearch) => {
  if (point1.x == point2.x && point1.y == point2.y) {
    return true;
  }

  if (point1.x == point2.x) {
    if (pointToSearch.x == point1.x) {
      return true;
    } else {
      return false;
    }
  }

  if (point1.y == point2.y) {
    if (pointToSearch.y == point1.y) {
      return true;
    } else {
      return false;
    }
  }

  if (((pointToSearch.x - point1.x) / (point2.x - point1.x)) ==
    ((pointToSearch.y - point1.y) / (point2.y - point1.y))) {
    return true;
  }

  return false;
};

exports.isSameLine = (line1, line2) => {
  return this.isInLine(line1[0], line1[1], line2[0]) &&
    this.isInLine(line1[0], line1[1], line2[1]);
};

exports.linesArrayContainsLine = (linesArray, inputLine) => {
  for (let i = 0; i < linesArray.length; i++) {
    if (this.isSameLine(linesArray[i], inputLine)) {
      return true;
    }
  };
  return false;
};

exports.getLinesWithNPoints = (points, pointsNumber) => {
  const result = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const line = [];
      line.push(points[i]);
      line.push(points[j]);

      for (let k = j + 1; k < points.length; k++) {
        if (this.isInLine(points[i], points[j], points[k])) {
          line.push(points[k]);
        }
      }

      if (line.length >= pointsNumber &&
        !this.linesArrayContainsLine(result, line)) {
        result.push(line);
      }
    }
  }

  return result;
};
