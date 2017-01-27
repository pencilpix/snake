import { Snake } from './snake';
import { Body }  from './snake-body';
import { Food }  from './food';
import { Vector } from './vector';

const ACTORS_TYPES = {
  'o': Food,
  's': Snake,
  'z': Body
};

/**
 * Level: creates a level from a plan that describe
 * current environment of the game
 * @param {Array<String>}  plan  array of strings (nxm);
 */
export class Level {
  constructor(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];
    this.bodies = [];
    this.status = null;

    plan.forEach((line, i) => {
      let gridLine = [];

      [].forEach.call(line, (ch, k) => {
        let chType = null;
        let Actor = ACTORS_TYPES[ch];

        if(Actor) this.actors.push(new Actor(new Vector(k, i)));

        if(ch === 'x') chType = 'wall';

        gridLine.push(chType);
      });

      this.grid.push(gridLine);
    });
  }

  /**
   * start animation depending on direction
   * @param  {Object} direction up, right, bottom and left
   *                            all keys should have boolean false value
   *                            except the dedicated direction
   */
  animate(direction) {
    this.actors.forEach(actor => {
      if(actor.type === 'snake') {
        actor.move(this, direction);
      }
    })
  }


  /**
   * check for walls inside the game
   * @param  {Object}  pos  Vector instance of new x, y coordinates
   * @param  {Object}  size Vector instance of actor size
   * @return {String}       'wall'
   */
  isObstacle(pos, size) {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for(let i = xStart; i < xEnd; i++) {
      for(let k = yStart; k < yEnd; k++) {
        return this.grid[k][i];
      }
    }
  }



  /**
   * check for actor type food or body parts
   * @param  {Object}  actor instance of Snake
   * @return {Object}        instance of Body / Food
   */
  isActor(actor) {
    for(let i = 0; i < this.actors.length; i++) {
      let otherActor = this.actors[i];

      if( otherActor !== actor &&
          actor.pos.x + actor.size.x > otherActor.pos.x &&
          actor.pos.x < otherActor.pos.x + otherActor.size.x &&
          actor.pos.y + actor.size.y > otherActor.pos.y &&
          actor.pos.y < otherActor.pos.y + otherActor.size.y
        ) {
        return otherActor;
      }
    }
  }



  /**
   * add Body instance to the levels actors
   * that act like snake body parts
   */
  increaseSnakeLength(snake, direction) {
    let bodies = this.actors.filter(actor => actor.type === 'body');
    let lastBodyPosX = (bodies.length) ? bodies[bodies.length - 1].pos.x : snake.pos.x + snake.size.x;
    let lastBodyPosY = (bodies.length) ? bodies[bodies.length - 1].pos.y : snake.pos.y + snake.size.y;

    this.actors.push(new Body(new Vector(lastBodyPosX, lastBodyPosY)));
    this.bodies.push(new Body(new Vector(lastBodyPosX, lastBodyPosY)));
  }



  /**
   * update body instances depending on new postion
   * @param  {Object} pos Vector instance x, y coordinates
   */
  updateBody(pos) {
    let bodies = this.actors.filter(actor => actor.type === 'body');
    bodies.reverse().forEach((body, i, ar) => {
      if(i < ar.length - 1) {
        body.pos = new Vector(ar[i + 1].pos.x, ar[i + 1].pos.y)
      } else {
        body.pos = new Vector(pos.x, pos.y);
      }
    });

  }


  snakeTouched() {
    // console.log('touched', arguments[0], arguments[1]);
  }
}
