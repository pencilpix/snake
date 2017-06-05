import { Snake } from '../src/core/snake';
import { Level } from '../src/core/level';
import * as utils from '../src/core/utils';
import { Vector } from '../src/core/vector';

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

  it('should have step property equal to 1', () => {
    expect(snake.step).toEqual(1);
  });

  it('should have speed property of x = 0, y = 0', () => {
    expect(snake.speed instanceof Vector).toBe(true);
    expect(snake.speed.x).toEqual(0);
    expect(snake.speed.y).toEqual(0);
  });

  it('should have size property of x = 1, y = 1', () => {
    level.sounds = {fed: {play: function() {}}};

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
      levelSnake.step = 5;

      levelSnake.move(level, direction);
      levelSnake.step = 1;

      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x - 5);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y);
    });

    it('should not move snake to right, but left 1 point', () => {
      let direction = { up: false, right: true, bottom: false, left: false };
      let oldSnakePosition = levelSnake.pos;
      levelSnake.move(level, direction);
      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x - 1);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y);
    });

    it('should move snake to up', () => {
      let direction = { up: true, right: false, bottom: false, left: false };
      let oldSnakePosition = levelSnake.pos;

      levelSnake.move(level, direction);
      expect(levelSnake.pos.x).toEqual(oldSnakePosition.x);
      expect(levelSnake.pos.y).toEqual(oldSnakePosition.y - 1);
    });


    it('should add new body part', () => {
      let direction = { up: false, right: false, bottom: false, left: true };
      let partsNo = levelSnake.parts.length;
      levelSnake.pos.x = 10;
      levelSnake.pos.y = 4;

      levelSnake.move(level, direction);
      expect(levelSnake.parts.length).toEqual(partsNo + 1);
    });

    it('should remove the last part and add new part with the new position', () => {
      let direction = { up: false, right: false, bottom: false, left: true };
      let lastPart = levelSnake.parts[levelSnake.parts.length - 1];
      let newPos = new Vector(levelSnake.parts[0].x - 1, levelSnake.parts[0].y)

      levelSnake.move(level, direction);
      expect(levelSnake.parts[levelSnake.parts.length - 1]).not.toEqual(lastPart);
      expect(levelSnake.parts[0]).toEqual(newPos);
    });
  });

  describe('snake.updateBody', () => {
    it('should add new body as first body with new pos, should be one move to left', () => {
      let lastPart = levelSnake.parts[levelSnake.parts.length - 1];
      let firstPart = levelSnake.parts[0];
      let newPos = new Vector(firstPart.x - 1, firstPart.y);

      levelSnake.updateBody(newPos);
      expect(lastPart).not.toEqual(levelSnake.parts[levelSnake.parts.length - 1])
      expect(firstPart).toEqual(levelSnake.parts[1]);
    })
  });

  describe('snake.increaseParts', () => {
    it('should add new part to the parts array', () => {
      let direction = { up: false, right: false, bottom: false, left: true };
      let length = levelSnake.parts.length;

      levelSnake.increaseParts(levelSnake.parts[0], direction);
      expect(levelSnake.parts.length).toEqual(length + 1);
    });
  });

  describe('snake.isBody', () => {
    it('should return null', () => {
      let pos = new Vector(0, 0);
      let body = levelSnake.isBody(pos);

      expect(body).toEqual(null);
    });

    it('should return string of body', () => {
      let pos = new Vector(levelSnake.parts[2].x, levelSnake.parts[2].y);
      let body = levelSnake.isBody(pos);
      expect(body).toEqual('body');
    });
  });
});
