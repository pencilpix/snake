import * as utils from './utils';

/**
 * create and display the game elements into DOM
 * @param {HTMLElement}  container  wrapper of the game
 * @param {Object}       level      Level instance which acts as game env
 * @param {Number}       scale      positive number to scale the view
 */
export class Display {
  constructor(container, level, scale) {
    this.wrap = utils.createElement(container, 'div', 'game');
    this.scale = scale;
    this.actorsLayer = null;
    this.level = level;

    this.drawBackground();
    this.drawFrame();
  }


  /**
   * draw background as a table of level width * level height celss
   */
  drawBackground() {
    let table = utils.createElement(this.wrap, 'table', null, 'game-background', {
      width: this.level.width * this.scale + 'px',
      height: this.level.height * this.scale + 'px'
    });

    for(let i = 0; i < this.level.height; i++) {
      let row = utils.createElement(table, 'tr');

      for(let k = 0; k < this.level.width; k++) {
        let type = this.level.grid[i][k]
        utils.createElement(row, 'td', null, (type) ? 'game-' + type : null);
      }
    }
  }


  /**
   * clear player layer before re-draw
   * @return {[type]} [description]
   */
  drawFrame() {
    if(this.actorsLayer !== null) {
      this.wrap.removeChild(this.actorsLayer);
    }

    this.actorsLayer = this.drawActors();
  }


  /**
   * draw actors snake, snakebody and food
   */
  drawActors() {
    let wrap = utils.createElement(this.wrap, 'div', null, 'game-actors');

    this.level.actors.forEach(actor => {
      // if(actor.type !== 'food' && actor.type !== 'snake') {
      //   return;
      // }
      utils.createElement(wrap, 'div', null, 'game-actors__' + actor.type, {
        top: actor.pos.y * this.scale - this.scale / 2 + 'px',
        left: actor.pos.x * this.scale- this.scale / 2 + 'px',
        width: actor.size.x * this.scale + 'px',
        height: actor.size.y * this.scale + 'px'
      });
    });

    // this.level.bodies.forEach(actor => {
    //   utils.createElement(wrap, 'div', null, 'game-actors__' + actor.type, {
    //     top: actor.pos.y * this.scale + 'px',
    //     left: actor.pos.x * this.scale + 'px',
    //     width: actor.size.x * this.scale + 'px',
    //     height: actor.size.y * this.scale + 'px'
    //   });
    // });
    return wrap;
  }


  /**
   * clear the game wrapper for restarting the game
   */
  clear() {
    this.wrap.parentNode.removeChild(this.wrap);
  }
}