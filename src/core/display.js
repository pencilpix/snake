import * as utils from './utils';


/**
 * displays the game on canvas element depending on level
 * and scale at given container
 * @param  {HTMLElement} container  element to contain the game
 * @param  {Object<Level>} level    current level instance
 * @param  {Number} scale           positive number to scale the game for better view
 * @return {Object<Display>}        instance of Display that control Game instance view.
 */
export class Display {
  constructor(container, level, scale) {
    this.wrap     = utils.createElement(container, 'canvas', 'game');
    this.scale    = scale || 10;
    this.level    = level;
    this.topSpace = 6 * this.scale; //INFO_UNIT.titleH * this.scale + this.scale;
    this.sprite   = { img: null, width: 0, height: 0, scale: 0 };
    this.bgColor  = '#bdb';
    this.hiScore  = localStorage.getItem('sts') || 0;

    this.init();
  }



  /**
   * initialize the width and background color of the canvas parent
   */
  init() {
    this.wrap.width = this.level.width * this.scale;
    this.wrap.height = this.level.height * this.scale + this.topSpace;
    this.wrap.parentNode.style.backgroundColor = this.bgColor;
  }


  /**
   * draw the background 'walls' of the board
   */
  drawBackground() {
    let ctx = this.wrap.getContext('2d');

    for(let i = 0; i < this.level.height; i++) {
      for(let k = 0; k < this.level.width; k++) {
        let wall = this.level.grid[i][k];
        if(wall) {
          ctx.fillStyle = '#212121';
          ctx.fillRect(k * this.scale, i * this.scale + this.topSpace, this.scale, this.scale);
        }
      }
    }
  }


  /**
   * draw the current move of the game elements 'food/snake/snake body'
   * and the current information 'score/lives/level/highscore'
   * @param  {Number} score   Positive number that describe the current score
   * @param  {Number} lives   Positive number that describe the current lives 1 to 3
   * @param  {Number} level   Positive number that describe the currrent level number
   */
  drawFrame(score, lives, level) {
    let ctx;
    // skiping frames for more/less speed
    // hacky way to slow down the movement
    // of each element that produce an issue of *LongFrame* on timeline
    // need to be replaced with another solution.
    if(
       (this.level.score < 20 && this.level.frames % 8 !== 0) || 
       (this.level.score >= 20 && this.level.score < 40 && this.level.frames % 6 !== 0) ||
       (this.level.score >= 40 && this.level.frames % 4 !== 0)
      ) {
      return true;
    }

    // clear canvas and then redraw background
    this.clear();
    this.drawBackground();

    ctx = this.wrap.getContext('2d');

    // draw actors food/snake/body
    this.level.actors.forEach(actor => {
      let posX = actor.pos.x * this.scale;
      let posY = actor.pos.y * this.scale + this.topSpace;
      let actorWidth = actor.size.x * this.scale * .9;
      let actorHeight = actor.size.y * this.scale * .9;

      if(actor.type === 'food') {
        ctx.beginPath();
        ctx.arc(posX + actorWidth / 2, posY + actorHeight / 2, actorWidth / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      if(actor.type === 'snake') {
        actor.parts.forEach((part, i) => {
          let partX = part.x * this.scale + actor.size.x * this.scale * .05;
          let partY = part.y * this.scale + this.topSpace + actor.size.y * this.scale * .05;

          ctx.fillRect(partX, partY, actorWidth, actorHeight);
        });
      }

    });

    // drawing current information of the game.
    this.drawInfo(ctx, (this.level.score +  score).toString(), lives, level);

    return true;
  }


  /**
   * clearing the drawings on the canvas
   */
  clear() {
    let ctx = this.wrap.getContext('2d');
    ctx.clearRect(0, 0,this.wrap.width, this.wrap.height);
  }



  /**
   * draw given information at the top of the canvas
   * @param  {CanvasRenderingContext2D} ctx   current canvas context
   * @param  {Number} score Positive number of current score
   * @param  {Number} lives Positive number of current lives
   * @param  {Number} level Positive number of the current level
   */
  drawInfo(ctx, score, lives, level) {
    let colWidth = this.wrap.width / 3;
    let topSpace = this.topSpace;
    let img = this.sprite.img;
    let hiScore = this.hiScore;

    score = (score < 10) ? '0' + score : score;
    hiScore = (hiScore < 10) ? '0' + hiScore : hiScore;
    level = (level < 10) ? '0' + level : level;


    ctx.font = this.scale * 4 + 'px pixelated, serif';
    ctx.textAlign = 'center';
    ctx.fillText('The Snake', this.wrap.width / 2, this.scale * 3);

    ctx.font = this.scale * 2 + 'px pixelated, serif';
    ctx.fillText('simple HTML & JS game', this.wrap.width / 2, this.scale * 4.5);


    ctx.font = this.scale + 'px pixelated, serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = this.bgColor;
    ctx.fillText('HI-SCORE: ' + hiScore, this.wrap.width - this.scale, topSpace + this.scale * 8 / 10);

    ctx.textAlign = 'center';
    ctx.fillText('SCORE: ' + score, colWidth * 2, topSpace + this.scale * 8 / 10);
    ctx.fillText('Level: ' + level, colWidth, topSpace + this.scale * 8 / 10);


    ctx.textAlign = 'left';
    ctx.fillText('Lives: ' + lives, this.scale, topSpace + this.scale * 8 / 10);
  }




  /**
   * reset the level if needed
   * @param  {Object<Level>} level    new level instance
   */
  resetLevel(level) {
    this.level = level;
  }



  /**
   * display message at the middle of the canvas
   * @param  {String} message string to display
   */
  message(message) {
    let ctx = this.wrap.getContext('2d'),
        lines = message.split(/\n/g),
        height = (lines.length + 2) * this.scale,
        width = 15 * this.scale,
        x = this.wrap.width / 2,
        y = this.wrap.height /2;

    ctx.fillStyle = '#212121';
    ctx.textAlign = 'center';
    ctx.clearRect(x - width / 2, y - this.scale * 2, width, height)
    ctx.fillRect(x - width / 2, y - this.scale * 2, width, height)

    ctx.fillStyle = this.bgColor;
    ctx.font = this.scale + 'px pixelated';

    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * this.scale)
    });
  }
}
