import { Body } from '../../src/assets/js/es5/modules/snake-body';
import { Vector } from '../../src/assets/js/es5/modules/vector';

describe('Body class', () => {
  let body, vector;
  beforeAll(() => {
    vector = new Vector(2, 3);
    body = new Body(vector);
  });

  it('should have pos property of x = 2 and y = 3', () => {
    expect(body.pos).toBeDefined();
    expect(body.pos.x).toEqual(2, 'x is not equal to 2');
    expect(body.pos.y).toEqual(3, 'y is not equal to 3');
  });
});
