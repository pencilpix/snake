/**
 * construct a position to a given x, y coordinates value
 */
export class Vector {
  /**
   * @param  {Number} x position of x axis
   * @param  {Number} y Position of y axis
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
   * adding a vector to this vector instance and return a new one
   * @param  {Object<Vector>} vec position to be added
   * @return {Object<Vector>}     new position.
   */
  plus(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }
}
