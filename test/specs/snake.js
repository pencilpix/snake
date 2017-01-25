import { Snake } from '../../src/assets/js/es5/modules/snake';
import { Vector } from '../../src/assets/js/es5/modules/vector';

describe('Snake class', () => {
  let snake, vector;
  beforeAll(() => {
    vector = new Vector(2, 3);
    snake = new Snake(vector);
  });

  it('should have pos property of x = 2 and y = 3', () => {
    expect(snake.pos).toBeDefined();
    expect(snake.pos.x).toEqual(2, 'x is not equal to 2');
    expect(snake.pos.y).toEqual(3, 'y is not equal to 3');
  });
});
