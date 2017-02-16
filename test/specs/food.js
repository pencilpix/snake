import { Food } from '../../src/assets/js/es5/modules/food';
import { Vector } from '../../src/assets/js/es5/modules/vector';
import { Level } from '../../src/assets/js/es5/modules/level';
import * as utils from '../../src/assets/js/es5/modules/utils';

describe('Food class', () => {
  let food, vector, level;
  beforeAll(() => {
    vector = new Vector(2, 3);
    food = new Food(vector);
    level = new Level(utils.SIMPLE_PLAN);
  });

  it('should have pos property of x = 2 and y = 3', () => {
    expect(food.pos).toBeDefined();
    expect(food.pos.x).toEqual(2, 'x is not equal to 2');
    expect(food.pos.y).toEqual(3, 'y is not equal to 3');
  });

  it('should update food position because of wall', () => {
    let counter = 0;
    food.updateFoodPos(level, () => {
      if (!counter){
        counter++;
        return 0;
      } else{
        return 6;
      }
    });
    expect(food.pos.x).not.toEqual(0);
    expect(food.pos.y).not.toEqual(0);
  });

  it('should update food position because of body', () => {
    let snake = level.actors.filter(actor => actor.type === 'snake')[0];
    let direction = {up: false, right: false, down: false, left: true};
    let counter = 0;
    let body;
    snake.increaseParts(snake.pos, direction);
    snake.move(level, direction);
    body = snake.parts[snake.parts.length - 1];


    food.updateFoodPos(level, () => {
      if (counter == 0){
        counter++;
        return body.x;
      } else if (counter == 1) {
        counter ++;
        return body.y;
      } else {
        return 1;
      }
    });
    expect(food.pos.x).not.toEqual(body.x);
    expect(food.pos.y).not.toEqual(body.y);
  });
});
