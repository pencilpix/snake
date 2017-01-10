import { addVector } from '../../src/assets/js/es5/modules/utils';

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