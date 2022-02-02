const expect = require('chai').expect;
const LinesBusiness = require('../lines/business/lines.business.js');

describe('Line Business Layer Test', () => {
  // isInLine Test
  describe('isInLine Test', () => {
    it('reference points are equals', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 1, y: 2};
      const pointToSearch = {x: 3, y: 4};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.true;
    });

    it('reference points with same x, search point too', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 1, y: 7};
      const pointToSearch = {x: 1, y: 4};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.true;
    });

    it('reference points with same x, search point not', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 1, y: 7};
      const pointToSearch = {x: 2, y: 4};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.false;
    });

    it('reference points with same y, search point too', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 7, y: 2};
      const pointToSearch = {x: 5, y: 2};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.true;
    });

    it('reference points with same y, search point not', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 7, y: 2};
      const pointToSearch = {x: 5, y: 4};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.false;
    });

    it('inline points: m=2, q=0', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 4, y: 8};
      const pointToSearch = {x: 2, y: 4};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.true;
    });

    it('not inline points: m=2, q=0', () => {
      // arrange
      const point1 = {x: 1, y: 2};
      const point2 = {x: 4, y: 8};
      const pointToSearch = {x: 2, y: 10};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.false;
    });

    it('inline points: m=2, q=5', () => {
      // arrange
      const point1 = {x: 1, y: 7};
      const point2 = {x: 4, y: 13};
      const pointToSearch = {x: 2, y: 9};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.true;
    });

    it('not inline points: m=2, q=5', () => {
      // arrange
      const point1 = {x: 1, y: 7};
      const point2 = {x: 4, y: 13};
      const pointToSearch = {x: 8, y: 9};

      // act
      const result = LinesBusiness.isInLine(point1, point2, pointToSearch);

      // assert
      expect(result).to.be.false;
    });
  });

  // isSameLine Test
  describe('isSameLine Test', () => {
    it('same lines with different points', () => {
      // arrange
      const line1 = [{x: 1, y: 2}, {x: 2, y: 4}];
      const line2 = [{x: 3, y: 6}, {x: 4, y: 8}];

      // act
      const result = LinesBusiness.isSameLine(line1, line2);

      // assert
      expect(result).to.be.true;
    });

    it('same lines with same points', () => {
      // arrange
      const line1 = [{x: 1, y: 2}, {x: 2, y: 4}];
      const line2 = [{x: 1, y: 2}, {x: 2, y: 4}];

      // act
      const result = LinesBusiness.isSameLine(line1, line2);

      // assert
      expect(result).to.be.true;
    });

    it('different lines with different points', () => {
      // arrange
      const line1 = [{x: 1, y: 2}, {x: 2, y: 4}];
      const line2 = [{x: 2, y: 2}, {x: 4, y: 4}];

      // act
      const result = LinesBusiness.isSameLine(line1, line2);

      // assert
      expect(result).to.be.false;
    });

    it('different lines with 1 common point', () => {
      // arrange
      const line1 = [{x: 1, y: 2}, {x: 2, y: 4}];
      const line2 = [{x: 1, y: 2}, {x: 4, y: 5}];

      // act
      const result = LinesBusiness.isSameLine(line1, line2);

      // assert
      expect(result).to.be.false;
    });
  });

  // linesArrayContainsLine Test
  describe('linesArrayContainsLine Test', () => {
    it('lines array contains line', () => {
      // arrange
      const linesArray = [
        [{x: 1, y: 2}, {x: 1, y: 4}],
        [{x: 1, y: 2}, {x: 3, y: 2}],
        [{x: 1, y: 2}, {x: 2, y: 4}],
      ];
      const line = [{x: 1, y: 3}, {x: 1, y: 7}];

      // act
      const result = LinesBusiness.linesArrayContainsLine(linesArray, line);

      // assert
      expect(result).to.be.true;
    });

    it('lines array not contains line', () => {
      // arrange
      const linesArray = [
        [{x: 1, y: 2}, {x: 1, y: 4}],
        [{x: 1, y: 2}, {x: 3, y: 2}],
        [{x: 1, y: 2}, {x: 2, y: 4}],
      ];
      const line = [{x: 1, y: 3}, {x: 2, y: 7}];

      // act
      const result = LinesBusiness.linesArrayContainsLine(linesArray, line);

      // assert
      expect(result).to.be.false;
    });
  });

  // getLinesWithNPoints Test
  describe('getLinesWithNPoints Test', () => {
    it('3 different points and lines through 2 points', () => {
      // arrange
      const points = [{x: 1, y: 2}, {x: 5, y: 2}, {x: 3, y: 5}];
      const pointsNumber = 2;

      // act
      const result = LinesBusiness.getLinesWithNPoints(points, pointsNumber);

      // assert
      expect(result).to.have.lengthOf(3);
      expect(result).to.deep.include([{x: 1, y: 2}, {x: 5, y: 2}]);
      expect(result).to.deep.include([{x: 5, y: 2}, {x: 3, y: 5}]);
      expect(result).to.deep.include([{x: 1, y: 2}, {x: 3, y: 5}]);
    });

    it('3 inline points and lines through 3 points', () => {
      // arrange
      const points = [{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}];
      const pointsNumber = 3;

      // act
      const result = LinesBusiness.getLinesWithNPoints(points, pointsNumber);

      // assert
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.include(
        [{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}],
      );
    });

    it('4 inline points and lines through 3 points', () => {
      // arrange
      const points = [{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 7}];
      const pointsNumber = 3;

      // act
      const result = LinesBusiness.getLinesWithNPoints(points, pointsNumber);

      // assert
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.include(
        [{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 7}],
      );
    });
  });
});
