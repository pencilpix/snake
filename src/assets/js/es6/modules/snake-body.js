import { Vector } from './vector';
/**
 * snake body instances of rest of snake parts and its coordinates
 * @param {Objects}  pos  Vector of x,y coordinates
 */
export class Body {
  constructor(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    this.type = 'body';
  }
}
