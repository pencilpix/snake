import { Vector } from './vector';
/**
 * food of the snake and its position x, y coordinates
 * @param {Object}  Vector instance of x,y coordinates 
 */
export class Food {
  constructor(pos) {
    this.pos = pos;
    this.type = 'food';
    this.size = new Vector(1, 1);
  }


  updateFoodPos(level, randomFunc) {
    let newPos = new Vector(randomFunc(2, level.width - 1), randomFunc(2, level.height - 1));
    let obstacle = level.isObstacle(newPos, this.size);
    let otherActor = level.isActor(this);

    // if(!obstacle && !otherActor)
      this.pos = newPos;
    // else
    //   this.updateFoodPos(level, randomFunc);
  }
}
