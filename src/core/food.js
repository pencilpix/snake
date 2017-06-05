import { Vector } from './vector';


/**
 * food of the snake and its position x, y coordinates
 * @param {Object<Vector>}  Vector instance of x,y coordinates 
 */
export class Food {
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
    let newPos     = new Vector(randomFunc(2, level.width - 1), randomFunc(2, level.height - 1)),
        obstacle   = level.isObstacle(newPos, this.size),
        otherActor = level.isActor(this),
        snake      = level.actors.filter(actor => actor.type === 'snake')[0],
        body       = snake.isBody(newPos);

    if(!obstacle && !otherActor && !body)
      this.pos = newPos;
    else
      this.updateFoodPos(level, randomFunc);
  }
}
