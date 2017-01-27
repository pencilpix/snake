/**
 * a plan that describe the grid of the level
 * @type {Array}
 */
export const SIMPLE_PLAN = [
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
];



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


export const ARROWS_CODES = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
};
