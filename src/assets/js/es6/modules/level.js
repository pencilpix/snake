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

    plan.forEach((line) => {
      let gridLine = [];

      [].forEach.call(line, (ch) => {
        let chType = null;

        if(ch === 'x') {
          chType = 'wall';
        }

        gridLine.push(chType);
      });

      this.grid.push(gridLine);
    });
  }
}