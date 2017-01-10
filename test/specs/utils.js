import { addVector } from '../../src/assets/js/es5/modules/utils';

describe('addVector', () => {
  it('should be defined', () => {
    let v = addVector({x: 3, y: 4}, {x: 2, y:1});
    expect(v.x).toEqual(5);
    expect(v.y).toEqual(5);
  });
});