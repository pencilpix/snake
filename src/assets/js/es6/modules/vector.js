/**
 * vector
 */
export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }
}
