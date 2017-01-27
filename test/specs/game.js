import { Game } from '../../src/assets/js/es5/modules/game';
import { Level } from '../../src/assets/js/es5/modules/level';
import { PLANS } from '../../src/assets/js/es5/modules/levelPlans';

describe('Game', () => {
  let game, level, container;

  beforeAll(() => {
    game = new Game(PLANS, document.body);
    level = new Level(PLANS[0]);
  });

  it('should have property level of PLANS[0]', () => {
    expect(game.level).toEqual(level);
    expect(game.currentLevel).toEqual(0);
  });

  it('should have container HTMLElement as property', () => {
    expect(game.container).toEqual(document.body);
  });

  it('should have maxScore equal to empty level grid cells', () => {
    let emptyCells = level.grid.filter(item => item === null);

    expect(game.maxScore).toEqual(emptyCells.length);
  });
});
