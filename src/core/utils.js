/**
 * a plan that describe the grid of the level
 * @type {Object}
 */
export const SIMPLE_PLAN = {
  ar: [
    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'x                         x',
    'x                         x',
    'x                         x',
    'x        o                x',
    'x                         x',
    'x                         x',
    'x                         x',
    'x            s            x',
    'x                         x',
    'x                         x',
    'x                         x',
    'x                         x',
    'x                         x',
    'x                         x',
    'x                         x',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
  ],
  score: 5
};



/**
 * get random number between two numbers
 * @param  {Number} min Positive lower number
 * @param  {Number} max Positive minimum number
 * @return {Number}     positive number in range of min to max and maybe equal lower
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


/**
 * create element in a given container give it
 * id, class and styles and they are optional
 * @param  {HTMLElement} container element that will contain new element
 * @param  {String} tagName        tag name of desired element
 * @param  {String} id             id that will be given to the new element (optional)
 * @param  {String} className      class that will be given to the new element (optional)
 * @param  {Object} styles         styles that will be applied to the element (optional)
 * @return {HTMLElement}           new element
 */
export function createElement(container, tagName, id, className, styles) {
  let el = document.createElement(tagName);
  
  if(id)
    el.id = id;
  if(className)
    el.className = className;
  if(styles){
    let props = Object.keys(styles);
    props.forEach((prop) => {
      el.style[prop] = styles[prop]
    });
  }
  return container.appendChild(el);
};


/**
 * keyBoard arrows names
 * @type {Enum}
 */
export const ARROWS_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
};


/**
 * arrows codes
 * @type {Array}
 */
export const CODES_AR = [37, 38, 39, 40];


/**
 * copy content of object to a new object
 * @param  {Object} obj object to be copy
 * @return {Object}     new copy of the object
 */
export function copy(obj) {
  let newObj = {};

  for(let prop in obj) {
    newObj[prop] = obj[prop];
  }

  return newObj
}



/**
 * event names that will be used
 * to trigger sounds through the game.
 * @type {Object}
 */
export const EVENTS = {
  fed      : 'snake.fed',
  pause    : 'snake.pause',
  start    : 'snake.start',
  lost     : 'snake.lost',
  topScore : 'snake.topscore',
  newLevel : 'snake.newlevel',
  over     : 'snake.gameover',
  completed: 'snake.completed',
  hitWall  : 'snake.hitwall',
  hitBody  : 'snake.hitbody'
}
