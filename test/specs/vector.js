import { Vector } from '../../src/assets/js/es5/modules/vector';

describe('Vector', () => {
  let vector;

  beforeAll(() => {
    vector = new Vector(2, 1);
  });

  it('should have properties x = 2 and y = 1', () => {
    expect(vector.x).toEqual(2);
    expect(vector.y).toEqual(1);
  });
});
