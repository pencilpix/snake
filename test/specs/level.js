import { Level }  from '../../src/assets/js/es5/modules/level';
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

});
