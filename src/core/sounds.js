/**
 * Sound class that create audio element depending on a url and event to trigger
 * @param  {String}  url       path to the media file
 * @param  {String}  eventName custom event name to attach the element to it
 * @param  {Boolean} autoPlay  optional
 * @param  {Boolean} loop      optional
 */
export class Sound {
  constructor(url, eventName, autoPlay, loop) {
    this.element  = document.createElement('audio');
    this.element.src = url;
    this.isLoaded = false;
    this.event    = eventName;
    this.element.loop = loop || false;
    this.load();

    if(autoPlay)
      this.play();
  }



  /**
   * load the media element and attach events to it
   * play/pause and custom event to trigger playing.
   */
  load() {
    this.element.addEventListener('canplay', () => {
      this.isLoaded = true;
    });

    this.element.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.element.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    addEventListener(this.event, () => {
      this.play();
    });
  }



  /**
   * start playing sound and reset it,
   * if it was playing
   */
  play() {
    if(!this.isLoaded)
      setTimeout(this.play.bind(this), 200);

    if(this.isPlaying)
      this.stop();

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
