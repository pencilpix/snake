import { Vector } from './vector';
import * as utils from './utils';

/**
 * Snake is the snake head and its position and size
 * @param {Object} Vector instance of x, y coordinates
 */
export class Snake {
  constructor(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    this.speed = new Vector(0, 0);
    this.step = 0.005;
    this.maxSpeed = 10;
    this.direction = {
      up    : false,
      right : false,
      down: false,
      left  : true
    };
    this.newDirection = null;
    this.type = 'snake';
    this.parts = [];
  }



  /**
   * move Snake head to a direction with value
   * of default step value
   * @param  {Object} level     Level instance that act like environment of game
   * @param  {Object} direction boolean of keys up, right, bottom and left
   */
  move(level, direction) {
    let motion,
        newPos,
        obstacle,
        otherActor,
        body,
        sameDirection;

    if(!this.newDirection)
      this.isSameDirection(direction);

    if(this.newDirection) {

      if(this.newDirection.left || this.newDirection.right) {
        if((this.pos.y % 1) * 10 >= 9 || (this.pos.y % 1) * 10 <= 1){
          this.pos.y = Math.round(this.pos.y)
          direction = this.copyDirection(direction, this.newDirection);
          this.newDirection = null;
          this.direction = this.copyDirection(this.direction, direction);
        } else {
          direction = this.copyDirection(direction, this.direction);
        }
      } else if(this.newDirection.up || this.newDirection.down) {
        if((this.pos.x % 1) * 10 >= 9 || (this.pos.x % 1) * 10 <= 1) {
          this.pos.x = Math.round(this.pos.x)
          direction = this.copyDirection(direction, this.newDirection);
          this.newDirection = null;
          this.direction = this.copyDirection(this.direction, direction);
        } else {
          direction = this.copyDirection(direction, this.direction);
        }
      }
    } else {
      this.direction = this.copyDirection(this.direction, direction);
    }

    this.speed.x = 0;
    this.speed.y = 0;

    if(direction.left) this.speed.x -= this.maxSpeed;
    if(direction.right) this.speed.x += this.maxSpeed;
    if(direction.up) this.speed.y -= this.maxSpeed;
    if(direction.down) this.speed.y += this.maxSpeed;

    if(direction.left || direction.right)
      motion = new Vector(this.speed.x * this.step, 0);
    else if(direction.up || direction.down)
      motion = new Vector(0, this.speed.y * this.step);


    newPos = this.pos.plus(motion, this);
    obstacle = level.isObstacle(newPos, this.size);
    otherActor = level.isActor(this, newPos);


    if(obstacle){
      level.snakeTouched(obstacle);
    } else if(otherActor && otherActor.type === 'body') {
      level.snakeTouched(otherActor.type, otherActor);
      this.pos = newPos;
    } else {

      if(otherActor && otherActor.type === 'food'){
        level.increaseSnakeLength(this);
        otherActor.updateFoodPos(level, utils.getRandom);
        this.step += 0.002;
      }

      if(level.actors.some(actor => actor.type === 'body'))
        level.updateBody(this.pos);

      this.pos = newPos;
    }

  }



  /**
   * checks for new direction before move to new direction
   * @param  {Object}  direction Vector instance x, y coordinates
   * @return {Boolean}           same direction or not
   */
  isSameDirection(direction) {
    let same = true;

    for(let dir in direction) {
      if(this.direction[dir] === direction[dir]) {
        same = true;
      } else {
        // this.newDirection = direction;
        this.newDirection = this.copyDirection(this.newDirection, direction);
        return false;
      }
    }

    return same;
  }

  copyDirection(des, src) {
    if(des === null) {
      des = Object.create(null)
    }

    for(let prop in src) {
      des[prop] = src[prop];
    }
    return des;
  }
}
