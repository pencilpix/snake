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

  it('should have step property equal to 0.05', () => {
    expect(snake.step).toEqual(0.05);
  });

  it('should have speed property of x = 0, y = 0', () => {
    expect(snake.speed instanceof Vector).toBe(true);
    expect(snake.speed.x).toEqual(0);
    expect(snake.speed.y).toEqual(0);
  });

  it('should have maxSpeed property equal to 10', () => {
    expect(snake.maxSpeed).toEqual(10);
  });

  it('should have size property of x = 1, y = 1', () => {
    expect(snake.size instanceof Vector).toBe(true);
    expect(snake.size.x).toEqual(1);
    expect(snake.size.y).toEqual(1);
  });

  it('should have direction property with left direction true', () => {
    Object.keys(snake.direction).forEach(dir => {
      if(dir === 'left')
        expect(snake.direction[dir]).toBe(true);
      else
        expect(snake.direction[dir]).toBe(false);
    });
  });

  describe('Snake.moveX', () => {
    it('should be defined', () => {
      expect(snake.moveX).toBeDefined();
    });
  });
});
