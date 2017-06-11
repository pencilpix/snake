/* eslint no-console: 0 */
import { Level } from './level';
import { Display } from './display';
import { Sound } from './sounds';
import { ARROWS_CODES, CODES_AR, EVENTS } from './utils';


/**
 * construct a game instance
 */
export class Game {
  /**
   * @param  {Array} plans  collection of plans
   * @param  {HTMLElement} container element to contain the display of the game
   * @param  {Number} scale Positive number to scale the game up for better view
   * @param  {HTMLElement} btn start button.
   */
  constructor(plans, container, scale, btn) {
    this.plans = plans;
    this.currentLevel = 0;
    this.sounds = this.createSounds();
    this.level = new Level(this.plans[this.currentLevel], this.sounds);
    this.container = container;
    this.btn = btn;
    this.scale = scale || 10;
    this.direction = {up: false, right: false, down: false, left: true};
    this.display = new Display(this.container, this.level, this.scale);
    this.rendered = true;
    this.paused = false;
    this.score = 0;
    this.lives = 3;
    this.delay = 200;

    this.load();
  }


  /**
   * track keys that controls the game
   * depending on keydown event
   */
  trackKeys() {
    let _this = this;
    /**
     * keydown event handler that detect the keycode and set direction for that
     *
     * @param { KeyboardEvent } event keydown event to detect the key code
     */
    function handler(event) {
      if (event.keyCode === 32) {
        _this.paused = !_this.paused;
        if (_this.sounds.start.isPlaying) {
          _this.sounds.start.pause();
        } else {
          _this.sounds.start.play();
        }
        _this.sounds.pause.play();
      }

      // track only keys that control the game
      if (CODES_AR.indexOf(event.keyCode) === -1) return;

      for (let code in ARROWS_CODES) {
        if (ARROWS_CODES.hasOwnProperty(code)) {
          _this.direction[code] = event.keyCode === ARROWS_CODES[code];
        }
      }
    }

    addEventListener('keydown', handler);
  }


  /**
   * tracking touch and update direction depending on touch position
   */
  trackTouch() {
    let startPositionX = null;
    let startPositionY = null;

    addEventListener('dblclick', () => {
      this.paused = !this.paused;
    });

    addEventListener('touchstart', (event) => {
      let touch = event.changedTouches[0];

      startPositionX = touch.pageX;
      startPositionY = touch.pageY;
    });

    addEventListener('touchend', (event) => {
      let touch = event.changedTouches[0];
      let positionX = touch.pageX - startPositionX;
      let positionY = touch.pageY - startPositionY;
      let direction = null;

      if (Math.abs(positionX) > Math.abs(positionY)) {
        direction = (positionX < 0) ? 'left' : 'right';
      } else {
        direction = (positionY < 0) ? 'up' : 'down';
      }

      if (!direction) {
        return;
      }

      for (let dir in this.direction) {
        if (this.direction.hasOwnProperty(dir)) {
          this.direction[dir] = (dir === direction) ? true : false;
        }
      }
    });
  }


  /**
   * starting the level and render the game
   */
  startLevel() {
    if (this.level.status === null) {
      this.render();
      this.sounds.start.play();
    } else if (this.level.status === 'win') {
      if (this.currentLevel + 1 < this.plans.length) {
        if (this.delay > 199) {
          this.stopSounds();
          if (this.sounds.start.isPlaying) {
            this.sounds.start.stop();
          }

          this.sounds.newLevel.play();
        }

        this.delay --;
        this.display.message('wow you win ... !\nstarting new level after\n' +
                             Math.floor(this.delay / 50));

        if (this.delay < 1) {
          this.score += this.level.score;
          this.setLevel(this.currentLevel + 1);

          if (!this.sounds.start.isPlaying) {
            this.sounds.start.play();
          }

          this.delay = 200;
        }
      } else {
        console.log('congratulation !! you have completed all levels ..');
        this.paused = true;
        if (this.currentLevel > 0) {
          this.stopSounds();
          this.sounds.start.stop();
          this.sounds.completed.play();
        }

        this.setLevel(0);
        this.display.message('Congratulation... !\nyou completed all levels! ' +
                             '\n To play again press \n "space"');
      }
    } else if (this.level.status === 'lost' && this.lives > 1) {
      this.delay --;
      this.display.message('sorry you are lost ... !\nTry Again\n ' +
                           Math.floor(this.delay / 50));

      if (this.sounds.start.isPlaying) {
        this.sounds.start.stop();
      }

      if (this.delay < 1) {
        this.lives --;
        this.setLevel(this.currentLevel);

        if (!this.sounds.start.isPlaying) {
          this.sounds.start.play();
        }

        this.delay = 200;
      }
    } else {
      console.log('game over, refresh for new game');
      if (this.level.score > 0) {
        this.score += this.level.score;
        let hiScore = localStorage.getItem('sts');
        if (hiScore < this.score) {
          localStorage.setItem('sts', this.score);
          this.display.hiScore = this.score;
        }
      }
      this.sounds.start.stop();
      this.sounds.lost.play();
      this.paused = true;

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
    let _this = this;
    /**
     * requestAnimationFrame callback that animate the game
     */
    function frameFunc() {
      if (_this.level.status !== null) {
        _this.startLevel();
      } else {
        if (!_this.paused) {
          _this.rendered = false;
          _this.rendered = _this.level.animate(_this.direction);

          if (_this.rendered) {
            _this.display.drawFrame(_this.score, _this.lives,
                                    _this.currentLevel + 1);
          }
        }
      }
      requestAnimationFrame(frameFunc);
    }

    requestAnimationFrame(frameFunc);
  }


  /**
   * check if game is loading, then attach click event to start
   * the game on dedicated button.
   */
  load() {
    if (this._isSoundsLoaded) {
      this.btn.addEventListener('click', this.start.bind(this));
      document.body.classList.remove('is-game--loading');
      document.body.classList.add('is-game--loaded');
      return;
    } else {
      setTimeout(this.load.bind(this), 1000);
    }
  }

  /**
   * start playing
   */
  start() {
    let forced = null;

    if (this._isTouchDevice) {
      if (!forced) {
        this._forceSounds();
        forced = true;
      }
      this.trackTouch();
    }

    this.trackKeys();
    this.startLevel();
    document.body.classList.remove('is-game--loaded');
    document.body.classList.add('is-game--started');
  }


  /**
   * create sounds instance depending on each event name
   * @return {Array<Sound>} collection of Sound instances
   */
  createSounds() {
    let sounds = {};
    let soundsKeys = Object.keys(EVENTS);

    soundsKeys.forEach((key) => {
      let sound = require('../static/sounds/' + key + '.mp3');
      if ( key === 'start') {
        sounds[key] = new Sound(sound, EVENTS[key], false, true);
      } else {
        sounds[key] = new Sound(sound, EVENTS[key]);
      }
    });

    return sounds;
  }


  /**
   * stoping all sounds
   */
  stopSounds() {
    for (let sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        this.sounds[sound].stop();
      }
    }
  }


  /**
   * pauses all sounds
   */
  pauseSounds() {
    for (let sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound) && sound !== 'start') {
        this.sounds[sound].pause();
      }
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


  /**
   * hacky way to force mobile preload all music and effects files by
   * playing them then stoping imediately.
   */
  _forceSounds() {
    for (let sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        this.sounds[sound].play();
        this.sounds[sound].pause();
      }
    }
  }

  /**
   * get the whether all sounds is completely loaded or not
   *
   * @return { Boolean }
   */
  get _isSoundsLoaded() {
    for (let sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        if (!this.sounds[sound].isLoaded) {
          return false;
        }
      }
    }

    return true;
  }


  /**
   * check if there is touch event or not
   *
   * @return { Boolean }
   */
  get _isTouchDevice() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (err) {
      return false;
    }
  }
}

