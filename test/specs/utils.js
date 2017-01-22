import { addVector, drawLevel } from '../../src/assets/js/es5/modules/utils';
import { level } from '../../src/assets/js/es5/modules/environment';
import { Player } from '../../src/assets/js/es5/modules/player';

describe('addVector', () => {
  it('should be defined', () => {
    let v = addVector({x: 3, y: 4}, {x: 2, y:1});
    expect(v.x).toEqual(5);
    expect(v.y).toEqual(5);
  });

  it('should return x = 0, y = 0', () => {
    let v = addVector({x: 3, y: 4}, {x: -3, y: -4});
    expect(v.x).toEqual(0);
    expect(v.y).toEqual(0);
  });

  it('should return x = -1, y = -2', () => {
    let v = addVector({x: 3, y: 4}, {x: -4, y: -6});
    expect(v.x).toEqual(-1);
    expect(v.y).toEqual(-2);
  });
});

describe('drawLevel', () => {
  let gameContainer, playerScale, demoLevel, player

  beforeEach(() => {
    demoLevel = level.join(',');
    demoLevel = demoLevel.split(',');
    playerScale = 10;

    gameContainer = document.createElement('div');
    gameContainer.id = 'game';
    document.body.appendChild(gameContainer);
    player = new Player(demoLevel);
  });

  afterEach(() => {
    gameContainer.parentNode.removeChild(gameContainer);
    gameContainer = null;
  });
  it('should be defined', () => {
    expect(typeof drawLevel).toBe('function');
  });

  it('should get the height and width of level', () => {

    drawLevel(gameContainer, player, playerScale);

    let bounding = gameContainer.getBoundingClientRect();
    let expectedWidth = level[0].length * playerScale;
    let expectedHeight = level.length * playerScale;

    expect(bounding.width).not.toBeLessThan(expectedWidth, 'width should be as Level any str length * scale');
    expect(bounding.height).not.toBeLessThan(expectedHeight, 'height should be as level length * scale');
  });

  it('should add background div#bg', () => {
    drawLevel(gameContainer, player, playerScale);

    expect(gameContainer.querySelector('#bg')).not.toBe(null);
  });

  it('should not add background div#bg because it is there', () => {
    let div = document.createElement('div');
    div.id = 'bg';
    gameContainer.appendChild(div);

    drawLevel(gameContainer, player, playerScale);
    expect(gameContainer.querySelectorAll('#bg').length).toBe(1);
  });

});