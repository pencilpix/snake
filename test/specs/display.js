import { Display } from '../../src/assets/js/es5/modules/display';
import { Level } from '../../src/assets/js/es5/modules/level';
import * as utils from '../../src/assets/js/es5/modules/utils';

describe('Display', () => {
  let display, level, container, scale;
  beforeAll(() => {
    container = document.body;
    scale = 10
    level = new Level(utils.SIMPLE_PLAN);
    display = new Display(container, level, scale);
  });

  it('should add div#game container', () => {
    let gameContainer = document.getElementById('game');
    expect(gameContainer).not.toEqual(null);
  });

  it('should add table.game-background', () => {
    let gameBackground = document.querySelector('table.game-background');
    expect(gameBackground).not.toEqual(null);
  });

  it('should make table width = level.width * scale and height = level.height * scale', () => {
    let gameBackground = document.querySelector('table.game-background');
    expect(gameBackground.offsetWidth).toEqual(level.width * scale);
    expect(gameBackground.offsetHeight).toEqual(level.height * scale);
  });

  it('should crete number of tr = level.height and number of td = level.width * level.height', () => {
    let rows = document.querySelectorAll('.game-background tr');
    let cells = document.querySelectorAll('.game-background td');
    expect(rows.length).toEqual(level.height);
    expect(cells.length).toEqual(level.width * level.height);
  });

  it('should have a number of walls', () => {
    let domWalls = document.querySelectorAll('.game-background td.game-wall').length;
    let gridWalls = level.grid.reduce((pre, cur) => {
        let ar = cur.filter(item => item == 'wall');
        if(ar.length)
          return pre.concat(ar);
        else
          return pre;
      }, []).length;

    expect(domWalls).toEqual(gridWalls);
  });
});
