import { Level }  from '../../src/assets/js/es5/modules/level';
import { Food }   from '../../src/assets/js/es5/modules/food';
import { Body }   from '../../src/assets/js/es5/modules/snake-body';
import { Snake }  from '../../src/assets/js/es5/modules/snake';
import { Vector }  from '../../src/assets/js/es5/modules/vector';
import * as utils from '../../src/assets/js/es5/modules/utils';

describe('Level class', () => {
  let level;

  beforeAll(() => {
    level = new Level(utils.SIMPLE_PLAN);
  });

  it('should have height equal to plan array length', () => {
    expect(level.height).toEqual(utils.SIMPLE_PLAN.length);
  });

  it('should have width equal to plan item length', () => {
    expect(level.width).toEqual(utils.SIMPLE_PLAN[0].length);
  });

  it('should have grid property Array(nxm) as plan(nxm)', () => {
    expect(Array.isArray(level.grid)).toBe(true);
    expect(level.grid.length).toEqual(utils.SIMPLE_PLAN.length);
    expect(level.grid[0].length).toEqual(utils.SIMPLE_PLAN[0].length);
  });

  it('should make grid property of wall or null', () => {
    let otherActors = level.grid.reduce((pre, cur) => {
      let ar = cur.filter(item => item !== null && item !== 'wall');
      if(ar.length) pre.push(ar[0]);
      return pre;
    }, []);

    expect(otherActors.length).toEqual(0);
  });

  it('should have actors property as array of Snake, Body or Food classes', () => {
    let food = level.actors.filter(item => item instanceof Food);
    let body = level.actors.filter(item => item instanceof Body);
    let snake = level.actors.filter(item => item instanceof Snake);
    let other = level.actors.filter(item => !item instanceof Food && !item instanceof Snake && !item instanceof Body);

    expect(Array.isArray(level.actors)).toBe(true, 'level.actors is not array');
    expect(food.length).toEqual(1, 'food in simple plan is one');
    expect(snake.length).toEqual(1, 'snake in simple plan is one');
    expect(body.length).toEqual(0, 'there is no body parts yet');
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
            bottom: false,
            right: false
          };

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
      let fakePos = new Vector(utils.SIMPLE_PLAN.length - 1, 1);
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

    it('should return body as other actor', () => {
      let snake = level.actors.filter(actor => actor.type === 'snake')[0];
      let oldSnakePosition = { x: snake.pos.x, y: snake.pos.y};
      level.actors.push(new Body(new Vector(oldSnakePosition.x + 0.5, oldSnakePosition.y + 0.5)))
      let body = level.actors.filter(actor => actor.type === 'body')[0];

      expect(level.isActor(snake)).toBe(body);
    });
  });


  describe('Level.increaseSnakeLength', () => {
    it('should add Body instance to the level.actors', () => {
      let bodies, newBodies;
      bodies = level.actors.filter(actor => actor.type === 'body');

      level.increaseSnakeLength();

      newBodies = level.actors.filter(actor => actor.type === 'body');

      expect(newBodies.length).toEqual(bodies.length + 1);
      expect(newBodies[newBodies.length - 1].pos.x).toEqual(bodies[bodies.length - 1].pos.x);
      expect(newBodies[newBodies.length - 1].pos.y).toEqual(bodies[bodies.length - 1].pos.y);

    });
  });

  describe('Level.updateBody', () => {
    it('should update position of all body instances, there are two bodies from prev specs', () => {
      let bodies = level.actors.filter(actor => actor.type === 'body');
      // let bodies = level.bodies;
      bodies[1].pos = new Vector(bodies[0].pos.x + 1, bodies[0].pos.y + 1);

      let firstBodyPos = bodies[0].pos;
      let secondBodyPos = bodies[1].pos;

      level.updateBody(new Vector(2, 2));
      let firstBodyPosAfter = bodies[0].pos;
      let secondBodyPosAfter = bodies[1].pos;

      expect(secondBodyPosAfter).toEqual(firstBodyPos);
      expect(firstBodyPosAfter).toEqual(new Vector(2, 2));
      // console.log(level.actors.filter(actor => actor.type === 'body').length);
      // expect(true).toBe(true);
    });
  });
});
