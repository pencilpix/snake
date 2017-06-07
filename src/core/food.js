import { Vector } from './vector';


/**
 * food of the snake and its position x, y coordinates
 */
export class Food {
  /**
   * @param {Object<Vector>}  pos  instance of x,y coordinates
   */
  constructor(pos) {
    this.pos = pos;
    this.type = 'food';
    this.size = new Vector(1, 1);
  }


  /**
   * updates the food position to a random clear position
   * @param  {Object<Level>} level      current level
   * @param  {Function} randomFunc callback to generate random number
   */
  updateFoodPos(level, randomFunc) {
    let newPosX = randomFunc(2, level.width - 1);
    let newPosY = randomFunc(2, level.height - 1);
    let newPos = new Vector(newPosX, newPosY);
    let obstacle = level.isObstacle(newPos, this.size);
    let otherActor = level.isActor(this);
    let snake = level.actors.filter((actor) => actor.type === 'snake')[0];
    let body = snake.isBody(newPos);

    if (!obstacle && !otherActor && !body) {
      this.pos = newPos;
    } else {
      this.updateFoodPos(level, randomFunc);
    }
  }
}

