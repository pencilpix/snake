import { Vector } from './vector';
import * as utils from './utils';

/**
 * Snake is the snake head and its position and size
 */
export class Snake {
  /**
   * @param {Object<Vector>} pos instance of x, y coordinates
   */
  constructor(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    this.speed = new Vector(0, 0);
    this.step = 1;
    this.direction = {
      up: false,
      right: false,
      down: false,
      left: true,
    };
    this.newDirection = null;
    this.type = 'snake';
    this.parts = [new Vector(pos.x, pos.y)];
  }


  /**
   * move Snake head to a direction with value
   * of default step value
   * @param  {Object} level     Level instance that act like environment of game
   * @param  {Object} direction boolean of keys up, right, bottom and left
   */
  move(level, direction) {
    let motion;
    let newPos;
    let obstacle;
    let otherActor;
    let body;

    // if opposite direction use the old direction
    if (
        (direction.left && this.direction.right) ||
        (direction.right && this.direction.left) ||
        (direction.up && this.direction.down) ||
        (direction.down && this.direction.up)
       ) {
      direction = utils.copy(this.direction);
    }

    // reset speed to determine the new direction
    this.speed.x = 0;
    this.speed.y = 0;

    if (direction.left) this.speed.x -= this.step;
    if (direction.right) this.speed.x += this.step;
    if (direction.up) this.speed.y -= this.step;
    if (direction.down) this.speed.y += this.step;

    // detection the amount of motion depending on direction
    if (direction.left || direction.right) {
      motion = new Vector(this.speed.x, 0);
    } else if (direction.up || direction.down) {
      motion = new Vector(0, this.speed.y);
    }

    newPos = this.pos.plus(motion, this);
    obstacle = level.isObstacle(newPos, this.size);
    otherActor = level.isActor(this, newPos);
    body = this.isBody(newPos);

    if (obstacle) {
      level.snakeTouched(obstacle);
      level.sounds.hitWall.play();
    } else if (body) {
      level.snakeTouched(body);
      level.sounds.hitBody.play();
    } else if (otherActor && otherActor.type === 'food') {
      this.increaseParts(this.pos, direction);
      level.sounds.fed.play();

      level.score ++;
      level.snakeTouched(otherActor.type);

      otherActor.updateFoodPos(level, utils.getRandom);
    }

    this.updateBody(newPos);
    this.direction = utils.copy(direction);
  }


  /**
   * update snake parts by remove the last part and add it
   * in the front at the new position
   * @param  {Object<Vector>}   pos   new position should snake go to
   */
  updateBody(pos) {
    this.parts.pop();
    this.parts.unshift(pos);
    this.pos = pos;
  }


  /**
   * add new part to the queue at the last position depending
   * on the direction and size
   * @param  {Object<Vector>}   pos       current position of the last part
   * @param  {Object<boolean>}  direction
   */
  increaseParts(pos, direction) {
    let newPos;

    if (direction.up) newPos = pos.plus(new Vector(0, -1));
    if (direction.down) newPos = pos.plus(new Vector(0, -1));
    if (direction.left) newPos = pos.plus(new Vector(1, 0));
    if (direction.right) newPos = pos.plus(new Vector(-1, 0));
    this.parts.push(newPos);
  }


  /**
   * check if the new position contains a body part
   * @param  {Object<Vector>}  pos position of x and y
   * @return {String}              string of body or null
   */
  isBody(pos) {
    let body = null;
    this.parts.forEach((part) => {
      if (pos.x + this.size.x > part.x &&
          pos.x < this.size.x + part.x &&
          pos.y + this.size.y > part.y &&
          pos.y < this.size.y + part.y ) {
        body = 'body';
        return;
      }
    });
    return body;
  }
}

