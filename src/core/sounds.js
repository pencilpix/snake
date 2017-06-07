/* eslint no-console: 0 */
import { loadMedia } from './utils';

/**
 * Sound class that create audio element depending on a url and event to trigger
 */
export class Sound {
  /**
   * @param  {String}  url       path to the media file
   * @param  {String}  eventName custom event name to attach the element to it
   * @param  {Boolean} autoPlay  optional
   * @param  {Boolean} loop      optional
   */
  constructor(url, eventName, autoPlay, loop) {
    this.element = document.createElement('audio');
    this.url = url;
    this.isLoaded = false;
    this.isReady = false;
    this.event = eventName;
    this.loop = loop || false;
    this.load();
  }


  /**
   * load the media element and attach events to it
   * play/pause and custom event to trigger playing.
   */
  load() {
    loadMedia(this.url).then((response) => {
      this.element.src = URL.createObjectURL(response);
      this.element.load();
      this.isLoaded = true;
    }).catch((error) => {
      console.log(error, ' please refresh the game');
    });

    this.element.addEventListener('canplay', () => {
      this.isReady = true;
    });

    this.element.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.element.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    this.element.addEventListener('ended', () => {
      if (this.loop) {
        this.stop();
        this.play();
      }
    })

    addEventListener(this.event, () => {
      this.play();
    });
  }


  /**
   * start playing sound and reset it,
   * if it was playing
   */
  play() {
    if (!this.isReady) setTimeout(this.play.bind(this), 200);

    if (this.isPlaying) this.stop();

    this.element.play();
  }


  /**
   * stop this sound if its playing
   */
  stop() {
    this.element.pause();
    this.element.currentTime = 0;
  }


  /**
   * pause this sound.
   */
   pause() {
    this.element.pause();
   }
}

