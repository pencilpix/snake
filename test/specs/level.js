import { Level }  from '../../src/assets/js/es5/modules/level';
import { Food }   from '../../src/assets/js/es5/modules/food';
import { Snake }  from '../../src/assets/js/es5/modules/snake';
import { Vector }  from '../../src/assets/js/es5/modules/vector';
import * as utils from '../../src/assets/js/es5/modules/utils';

describe('Level class', () => {
  let level;

  beforeAll(() => {
    level = new Level(utils.SIMPLE_PLAN);
  });

  it('should have height equal to plan array length', () => {
    expect(level.height).toEqual(utils.SIMPLE_PLAN.ar.length);
  });

  it('should have width equal to plan item length', () => {
    expect(level.width).toEqual(utils.SIMPLE_PLAN.ar[0].length);
  });

  it('should have grid property Array(nxm) as plan(nxm)', () => {
    expect(Array.isArray(level.grid)).toBe(true);
    expect(level.grid.length).toEqual(utils.SIMPLE_PLAN.ar.length);
    expect(level.grid[0].length).toEqual(utils.SIMPLE_PLAN.ar[0].length);
  });

  it('should have a maxScore as Plan.score', () => {
    expect(level.maxScore).toEqual(utils.SIMPLE_PLAN.score);
  });

  it('should make grid property of wall or null', () => {
    let otherActors = level.grid.reduce((pre, cur) => {
      let ar = cur.filter(item => item !== null && item !== 'wall');
      if(ar.length) pre.push(ar[0]);
      return pre;
    }, []);

    expect(otherActors.length).toEqual(0);
  });

  it('should have actors property as array of Snake or Food classes', () => {
    let food = level.actors.filter(item => item instanceof Food);
    let snake = level.actors.filter(item => item instanceof Snake);
    let other = level.actors.filter(item => !item instanceof Food && !item instanceof Snake);

    expect(Array.isArray(level.actors)).toBe(true, 'level.actors is not array');
    expect(food.length).toEqual(1, 'food in simple plan is one');
    expect(snake.length).toEqual(1, 'snake in simple plan is one');
    expect(other.length).toEqual(0, 'there is no other actors');
  });


  describe('Level.animate', () => {
    it('should move snake step to up direction', () => {
      let oldDirction = level.direction;
      let snake = level.actors.filter(item => item instanceof Snake)[0];
      let oldSnakePosition = snake.pos;
      let direction = {
            up: true,
            left: false,
            down: false,
            right: false
          };

      level.frames = 7;
      level.animate(direction);

      expect(snake.pos.x).toEqual(oldSnakePosition.x, 'should equal old x pos');
      expect(snake.pos.y).not.toEqual(oldSnakePosition.y, 'should not equal old y pos');
      expect(snake.direction.up).toBe(true);
    });
  });

  describe('Level.isObstacle', () => {
    it('should return null', () => {
      let fakePos = new Vector(3, 1);
      let fakeSize = new Vector(1, 1);

      expect(level.isObstacle(fakePos, fakeSize)).toEqual(null);
    });

    it('should return wall at the end of grid', () => {
      let fakePos = new Vector(utils.SIMPLE_PLAN.ar.length - 1, 1);
      let fakeSize = new Vector(1, 1);

      expect(level.isObstacle(fakePos, fakeSize)).toEqual(null);
    });

    it('should return wall if wall at the middle of grid', () => {
      let fakePos = new Vector(4, 1);
      let fakeSize = new Vector(1, 1);

      level.grid.push('wall');
      expect(level.isObstacle(fakePos, fakeSize)).toEqual(null);
    });
  });


  describe('Level.isActor', () => {
    it('should return food as other actor', () => {
      let snake = level.actors.filter(actor => actor.type === 'snake')[0];
      let food = level.actors.filter(actor => actor.type === 'food')[0];
      let oldSnakePosition = { x: snake.pos.x, y: snake.pos.y};
      let foodPosition = {x: food.pos.x, y: food.pos.y};

      snake.pos.x = foodPosition.x;
      snake.pos.y = foodPosition.y;

      expect(level.isActor(snake)).toBe(food);

      snake.pos.x += 0.5;
      expect(level.isActor(snake)).toBe(food);

      snake.pos.y += 0.5;
      expect(level.isActor(snake)).toBe(food);

      snake.pos.x = oldSnakePosition.x;
      snake.pos.y = oldSnakePosition.y;
    });
  });

  describe('Level.snakeTouched', () => {
    it('should make level status equal to lost when wall is touched', () => {
      level.snakeTouched('wall');

      expect(level.status).toEqual('lost');
    })
  });
});
