import { Level } from './level';
import { Display } from './display';
import { ARROWS_CODES } from './utils';

/**
 * game
 */
export class Game {
  constructor(plans, container, scale) {
    this.plans        = plans;
    this.currentLevel = 0;
    this.level        = new Level(this.plans[this.currentLevel]);
    this.container    = container;
    this.maxScore     = this.level.grid.filter(cell => cell === null).length;
    this.score        = 0;
    this.scale        = scale || 10;
    this.directions   = {up: false, right: false, down: false, left: true};
    this.display      = new Display(this.container, this.level, this.scale);
    this.rendered     = true;
    this.puased       = false;

  }



  trackKeys () {
    function handler(event) {
      if(event.keyCode === 32) {
        this.paused = !this.paused;
      }

      for(let code in ARROWS_CODES) {
        this.directions[code] = event.keyCode === ARROWS_CODES[code];
      }
    }

    addEventListener('keydown', handler.bind(this));
  }


  startLevel() {
    if(this.level.status === null) {
      this.render();
    } else if(this.level.status === 'win') {
      console.log('wow you win .. !!!');
      if(this.currentLevel + 1 < this.plans.length) {
        this.currentLevel += 1;
        this.level = new Level(this.plans[this.currentLevel]);
        this.render();
      } else {
        console.log('congratulation !! you have completed all levels ..');
      }
    }
  }


  render() {
    function frameFunc() {
      if (this.level.status !== null || this.level.status === 'win') {
        this.startLevel();
      } else {
        if(this.rendered && !this.paused) {
          this.rendered = false;
          this.display.drawFrame();
          this.level.animate(this.directions);
          this.rendered = true;
        }

        requestAnimationFrame(frameFunc.bind(this))
      }
    }

    requestAnimationFrame(frameFunc.bind(this));
  }


  start() {
    this.trackKeys();
    this.startLevel();
  }
}
