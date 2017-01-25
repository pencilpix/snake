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
}
