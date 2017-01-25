import { Level }  from '../../src/assets/js/es5/modules/level';
import { Food }   from '../../src/assets/js/es5/modules/food';
import { Body }   from '../../src/assets/js/es5/modules/snake-body';
import { Snake }  from '../../src/assets/js/es5/modules/snake';
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
});
