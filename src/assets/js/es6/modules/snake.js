import { Vector } from './vector';

/**
 * Snake is the snake head and its position and size
 * @param {Object} Vector instance of x, y coordinates
 */
export class Snake {
  constructor(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    this.speed = new Vector(0, 0);
    this.step = 0.05;
    this.maxSpeed = 10;
    this.direction = {
      up    : false,
      right : false,
      bottom: false,
      left  : true
    };
  }

  moveX() {
  }
}
