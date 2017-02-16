import { Snake } from './snake';
import { Food }  from './food';
import { Vector } from './vector';

/**
 * actors types to be used in determining the game instances
 * @type {Object}
 */
const ACTORS_TYPES = {
  'o': Food,
  's': Snake
};



/**
 * Level: creates a level from a plan that describe
 * current environment of the game
 * @param {Array<String>}  plan     array of strings (nxm);
 * @param {Object}         sounds   different sounds of the game events;
 */
export class Level {
  constructor(plan, sounds) {
    this.width = plan.ar[0].length;
    this.height = plan.ar.length;
    this.actors = [];
    this.grid = this.getGrid(plan.ar);
    this.status = null;
    this.score = 0;
    this.frames = 0;
    this.died = false;
    this.maxScore = plan.score;
    this.sounds = sounds;
  }

  /**
   * start animation depending on direction
   * @param  {Object} direction up, right, bottom and left
   *                            all keys should have boolean false value
   *                            except the dedicated direction
   */
  animate(direction) {

    // depending on frames number
    // generating a long frame and it's a performance issue
    // so look for another way to slow down the animation
    // and make it smooth at the same time, and take into account the grid !!.
    if(this.frames > 1000)
      this.frames = 0;
    else
      this.frames ++;

    if(
       (this.score < 20 && this.frames % 8 !== 0) || 
       (this.score >= 20 && this.score < 40 && this.frames % 6 !== 0) ||
       (this.score >= 40 && this.frames % 4 !== 0)
      ) {
      return true;
    }

    this.actors.forEach(actor => {
      if(actor.type === 'snake') {
        actor.move(this, direction);
      }
    });
    return true;
  }


  /**
   * check for walls inside the game
   * @param  {Object<Vector>}  pos   Vector instance of new x, y coordinates
   * @param  {Object}          size  Vector instance of actor size
   * @return {String}                'wall'
   */
  isObstacle(pos, size) {
    let xStart = Math.floor(pos.x);
    let xEnd   = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd   = Math.ceil(pos.y + size.y);

    for(let i = xStart; i < xEnd; i++) {
      for(let k = yStart; k < yEnd; k++) {
        return this.grid[k][i];
      }
    }
  }



  /**
   * check for actor type food or body parts
   * @param  {Object}  actor instance of Snake
   * @param  {Object<Vector>}  newPos new position to check empty or have another
   *                                  actor.
   * @return {Object}        instance of Body / Food
   */
  isActor(actor, newPos) {
    newPos = (newPos) ? newPos : actor.pos;
    for(let i = 0; i < this.actors.length; i++) {
      let otherActor = this.actors[i];

      if( otherActor !== actor &&
          newPos.x + actor.size.x > otherActor.pos.x &&
          newPos.x < otherActor.pos.x + otherActor.size.x &&
          newPos.y + actor.size.y > otherActor.pos.y &&
          newPos.y < otherActor.pos.y + otherActor.size.y
        ) {
        return otherActor;
      }
    }
  }



  /**
   * get a grid nxm as the plan array length and its string length and save actors
   * to the level instance actors snake/food .. etc
   * @param  {Array<String>} plan array that determine the shape of the level
   * @return {Array<Array>}          array(nxm) as n is the plan string legnth
   *                              and m is the plan length and contains wall or null.
   */
  getGrid(plan) {
    let grid = [];
    plan.forEach((line, i) => {
      let gridLine = [];

      [].forEach.call(line, (ch, k) => {
        let chType = null;
        let Actor = ACTORS_TYPES[ch];

        if(Actor) this.actors.push(new Actor(new Vector(k, i)));
        if(ch === 'x') chType = 'wall';

        gridLine.push(chType);
      });

      grid.push(gridLine);
    });

    return grid;
  }



  /**
   * determine the status of the level depending on the obstacle
   * @param  {String} obstacle type of obstacle wall/body/food
   */
  snakeTouched(obstacle) {
    if(obstacle === 'wall' || obstacle === 'body') {
      this.status = 'lost';
    } else if(obstacle === 'food') {
      if(this.maxScore <= this.score) this.status = 'win';
    }
  }
}
