import { Vector } from '../src/core/vector';

describe('Vector', () => {
  let vector;

  beforeAll(() => {
    vector = new Vector(2, 1);
  });

  it('should have properties x = 2 and y = 1', () => {
    expect(vector.x).toEqual(2);
    expect(vector.y).toEqual(1);
  });

  it('should have a method plus', () => {
    expect(vector.plus).toBeDefined();
  });

  describe('plus method', () => {
    it('should get new instance of vector with sumX and sumY', () => {
      let posVector = new Vector(3, 6);
      let zeroVector = new Vector(0, 0);
      let negVector = new Vector(-1, -3);
      let posSum = vector.plus(posVector);
      let zeroSum = vector.plus(zeroVector);
      let negSum = vector.plus(negVector);

      expect([posSum.x, posSum.y]).toEqual([5, 7]);
      expect([zeroSum.x, zeroSum.y]).toEqual([2, 1]);
      expect([negSum.x, negSum.y]).toEqual([1, -2]);
    });
  });
});
