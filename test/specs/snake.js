import { Snake } from '../../src/assets/js/es5/modules/snake';
import { Level } from '../../src/assets/js/es5/modules/level';
import * as utils from '../../src/assets/js/es5/modules/utils';
import { Vector } from '../../src/assets/js/es5/modules/vector';

describe('Snake class', () => {
  let snake, vector, level, levelSnake;
  beforeAll(() => {
    vector = new Vector(2, 3);
    level = new Level(utils.SIMPLE_PLAN);
    snake = new Snake(vector);
    levelSnake = level.actors.filter(actor => actor.type === 'snake')[0];
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

  describe('Snake.move', () => {
    it('should make snake move 5 points to left', () => {
      let direction = { up: false, right: false, bottom: false, left: true };
      let oldSnakePosition = levelSnake.pos;
      levelSnake.step = .5;

      levelSnake.move(level, direction);
      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x - 5);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y);
    });

    it('should not move snake to up, but left 0.5 point', () => {
      let direction = { up: true, right: false, bottom: false, left: false };

      levelSnake.pos.x += 0.5;
      levelSnake.pos.y += 0.5;

      let oldSnakePosition = levelSnake.pos;
      levelSnake.step = .05;

      levelSnake.move(level, direction);
      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x - 0.5);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y);
    });

    it('should move snake to up', () => {
      let direction = { up: true, right: false, bottom: false, left: false };

      levelSnake.pos.y -= 0.5;
      let oldSnakePosition = levelSnake.pos;
      levelSnake.step = .05;


      levelSnake.move(level, direction);
      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y - 0.5);
    });
  });


  describe('Snake.isSameDirection', () => {
    it('should be same direction as default, left', () => {
      let direction = { up: false, right: false, bottom: false, left: true };
      let sameDirection = snake.isSameDirection(direction);
      expect(sameDirection).toBe(true);
    });

    it('should not be same direction as default, right', () => {
      let direction = { up: false, right: true, bottom: false, left: false };
      let sameDirection = snake.isSameDirection(direction);
      expect(sameDirection).toBe(false);
    });

    it('should not be same direction as default, up', () => {
      let direction = { up: true, right: false, bottom: false, left: false };
      let sameDirection = snake.isSameDirection(direction);
      expect(sameDirection).toBe(false);
    });
  });
});
