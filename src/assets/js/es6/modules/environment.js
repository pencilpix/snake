/**
 * basic level simulation
 * @type {Array}
 */
// export var level = [
//   'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//   'x                                                      x',
//   'x                                                      x',
//   'x   x                                              x   x',
//   'x  xx                                              xx  x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x                                                      x',
//   'x  xx                                              xx  x',
//   'x   x                                              x   x',
//   'x                                                      x',
//   'x                                                      x',
//   'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
// ];
export var level = [
  'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'x                         x',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
];


/**
 * environment elements
 * @type {Object}
 */
export var elements = {
  wall: 'x',
  food: '=',
  player: '-'
};



/**
 * the step direction north, south, west or east
 * @type {Object}
 */
export var direction = {
  n: { x: -1, y: 0 },
  w: { x: 0, y: -1 },
  e: { x: 0, y: 1 },
  s: { x: 1, y: 0}
};


export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
