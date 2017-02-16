import { Level } from './level';
import { Display } from './display';
import { Sound } from './sounds';
import { ARROWS_CODES, CODES_AR, EVENTS } from './utils';


/**
 * construct a game instance
 * @param  {Array} plans     collection of plans
 * @param  {HTMLElement} container element to contain the display of the game
 * @param  {Number} scale     Positive number to scale the game up for better view
 */
export class Game {
  constructor(plans, container, scale) {
    this.plans        = plans;
    this.currentLevel = 0;
    this.sounds       = this.createSounds();
    this.level        = new Level(this.plans[this.currentLevel], this.sounds);
    this.container    = container;
    this.scale        = scale || 10;
    this.direction    = {up: false, right: false, down: false, left: true};
    this.display      = new Display(this.container, this.level, this.scale);
    this.rendered     = true;
    this.paused       = false;
    this.score        = 0;
    this.lives        = 3;
    this.delay        = 200;

  }



  /**
   * track keys that controls the game
   * depending on keydown event
   */
  trackKeys () {
    function handler(event) {
      if(event.keyCode === 32) {
        this.paused = !this.paused;
        this.sounds.pause.play();
      }

      // track only keys that control the game
      if(CODES_AR.indexOf(event.keyCode) === -1) return;

      for(let code in ARROWS_CODES) {
        this.direction[code] = event.keyCode === ARROWS_CODES[code];
      }
    }

    addEventListener('keydown', handler.bind(this));
  }


  /**
   * starting the level and render the game
   */
  startLevel() {
    if(this.level.status === null) {
      this.render();
    } else if(this.level.status === 'win') {

      if(this.currentLevel + 1 < this.plans.length) {
        if(this.delay > 199){
          this.stopSounds();
          this.sounds.newLevel.play();
        }

        this.delay --;
        this.display.message('wow you win ... !\nstarting new level after\n' + Math.floor(this.delay / 50));

        if(this.delay < 1){
          this.score += this.level.score;
          this.setLevel(this.currentLevel + 1);
          this.delay = 200;
        }

      } else {
        console.log('congratulation !! you have completed all levels ..');
        this.paused = true;
        if(this.currentLevel > 0){
          this.stopSounds();
          this.sounds.completed.play();
        }

        this.setLevel(0);
        this.display.message('Congratulation... !\nyou completed all levels!\n To play again press \n "space"');
      }
    } else if(this.level.status === 'lost' && this.lives > 1) {
      this.delay --;
      this.display.message('sorry you are lost ... !\nTry Again\n ' + Math.floor(this.delay / 50));

      if(this.delay < 1) {
        this.lives --;
        this.setLevel(this.currentLevel);
        this.delay = 200;
      }
    } else {
      console.log('game over, refresh for new game');
      if(this.level.score > 0){
        this.score += this.level.score;
        let hiScore = localStorage.getItem('sts');
        if(hiScore < this.score) {
          localStorage.setItem('sts', this.score);
          this.display.hiScore = this.score;
        }
      }
      this.sounds.lost.play();
      this.paused = true;

      // this.delay --;
      this.display.message('Game Over... !\nPress the key of \n "space"');

      this.score = 0;
      this.setLevel(0);
      this.lives = 3;
    }
  }


  /**
   * rendering the game if not paused and fully rendered from
   * the previous step
   */
  render() {
    function frameFunc() {
      if (this.level.status !== null) {
        this.startLevel();
      } else {
        if(!this.paused) {
          this.rendered = false;
          this.rendered = this.level.animate(this.direction);
          if(this.rendered){
            this.display.drawFrame(this.score, this.lives, this.currentLevel + 1);
          }
        }
      }
      requestAnimationFrame(frameFunc.bind(this))
    }

    requestAnimationFrame(frameFunc.bind(this));
  }



  /**
   * begins the game
   */
  start() {
    this.trackKeys();
    this.startLevel();
  }



  /**
   * create sounds instance depending on each event name
   * @return {Array<Sound>} collection of Sound instances
   */
  createSounds() {
    let sounds = {};
    let soundsKeys = Object.keys(EVENTS);

    soundsKeys.forEach(key => {
      if( key === 'start')
        sounds[key] = new Sound('/assets/sounds/' + key + '.mp3', EVENTS[key], false, true);
      else
        sounds[key] = new Sound('/assets/sounds/' + key + '.mp3', EVENTS[key]);
    });

    return sounds;
  }



  /**
   * stoping all sounds
   */
  stopSounds() {
    for (let sound in this.sounds) {
      this.sounds[sound].stop();
    }
  }



  /**
   * pauses all sounds
   */
  pauseSounds() {
    for (let sound in this.sounds) {
      this.sounds[sound].pause();
    }
  }



  /**
   * reset the direction and set didecated level
   * @param {Number} n Positive number that describe the index of the level
   */
  setLevel(n) {
    this.direction = {up: false, right: false, down: false, left: true};
    this.currentLevel = n;
    this.level = new Level(this.plans[n], this.sounds);
    this.display.resetLevel(this.level);
  }
}
