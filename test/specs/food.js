import { Food } from '../../src/assets/js/es5/modules/food';
import { Vector } from '../../src/assets/js/es5/modules/vector';

describe('Food class', () => {
  let food, vector;
  beforeAll(() => {
    vector = new Vector(2, 3);
    food = new Food(vector);
  });

  it('should have pos property of x = 2 and y = 3', () => {
    expect(food.pos).toBeDefined();
    expect(food.pos.x).toEqual(2, 'x is not equal to 2');
    expect(food.pos.y).toEqual(3, 'y is not equal to 3');
  });
});
