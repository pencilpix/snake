/**
 * adding to vectors
 * @param {Object} v1 instance of Vector class
 * @param {Object} v2 instance of Vector Class
 */
export function addVector(v1, v2){
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}


/**
 * replace a char in array of a strings at 
 * dedicated pos with a given value
 * @param  {Array}  ar      array of strings 'level'
 * @param  {Object} pos     x, y cordinates
 * @param  {String} value   given value
 * @return {Array}          level after replacement.
 */
export function replacePos(ar, pos, value) {
  let str = ar[pos.x].split('');
  str[pos.y] = value;
  ar[pos.x] = str.join('');
  return ar;
}



/**
 * collection of snake events
 * @type {Object}
 */
export const EVENT = {
  start_event    : new CustomEvent('snake.start'),
  died_event     : new CustomEvent('snake.died'),
  game_over_event: new CustomEvent('snake.over'),
  feed_event     : new CustomEvent('snake.feed'),
  critical_event : new CustomEvent('snake.critical'),
  top_score_event: new CustomEvent('snake.top_score')
};



function _createElement(container, tagName, id, className, styles) {
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
}


function _clearElementContent(el) {
  while (el.firstChild)
    el.removeChild(el.firstChild);
}


export function drawLevel(container, player, scale) {
  let bg = document.getElementById('bg') || _createElement(container, 'div', 'bg');
  let coins = document.getElementById('coins') || _createElement(container, 'div', 'coins');
  let walls = document.getElementById('coins') || _createElement(container, 'div', 'walls');
  let snake = document.getElementById('snake') || _createElement(container, 'div', 'snake', 'w');

  container.style.width = player.level[0].length * scale + 'px';
  container.style.height = player.level.length * scale + 'px';

  // clear coins and old position
  // of snake parts
  _clearElementContent(snake);
  _clearElementContent(coins);

  // add new positioned snake-parts
  for (let i = 0; i < player.length; i++) {
    let point = player.points[i];
    _createElement(snake, 'span', '', 'snake-part', {
      top: point.x * scale + 'px',
      left: point.y * scale + 'px',
      zIndex: 5 + player.length - i
    });
  }

  // add new coin position
  _createElement(coins, 'span', '', 'coin-part', {top: player.foodPos.x * scale + 'px', left: player.foodPos.y * scale + 'px'});

  if(bg.firstChild){
    return;
  }

  // walls
  player.level.forEach((str, i) => {
    [].forEach.call(str, (chr, k) => {
      if(chr === 'x')
        _createElement(bg, 'span', '', 'wall-part', {top: i * scale + 'px', left: k * scale + 'px'});
    });
  });

}
