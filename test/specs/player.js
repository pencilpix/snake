
import { Player } from '../../src/assets/js/es5/modules/player';
import { Vector, level, direction } from '../../src/assets/js/es5/modules/environment';
import * as Utils from '../../src/assets/js/es5/modules/utils';
describe('Player', () => {
  let player, vector, demoLevel;
  let oldRandom;

  beforeEach(() => {
    demoLevel = level.join(',');
    demoLevel = demoLevel.split(',');
    player = new Player(demoLevel);

    oldRandom = Math.random;
  });

  afterEach(() => {
    Math.random = oldRandom
  });

  describe('player', () => {
    it('should return length > 0 and one point at least', () => {
      let arrayOfPlayerPoints = Object.keys(player.points);

      expect(player.length).toBeGreaterThan(0);
      expect(arrayOfPlayerPoints.length).not.toBeLessThan(1);
    });

    it('should return length = 2', () => {
      player.points['1'] = {x: 1, y: 2};
      expect(player.length).toEqual(2);
    });

    it('should have score 0', () => {
      expect(player.score).toEqual(0);
    });

    it('should have default speed 1', () => {
      expect(player.speed).toEqual(1);
    });

    it('should have 3 lives by Default', () => {
      expect(player.lives).toEqual(3);
    });
  });

  describe('Player.move', () => {
    it('should be defined', () => {
      expect(player.move).toBeDefined();
    });

    it('should be "-" at the position of the player in level', () => {
      let curX = Math.floor(level.length/2);
      let curY = Math.floor(level[0].length / 2);
      expect(player.level[curX][curY]).toBe('-');
    });

    it('should move "-" at -1 on x axis', () => {
      let curX = player.points[0].x;
      let curY = player.points[0].y;

      player.move(direction.n);
      expect(player.level[curX - 1][curY]).toBe('-');
      expect(player.level[curX][curY]).toBe(' ');
      expect(player.points[0].x).toBe(curX - 1);
      expect(player.points[0].y).toBe(curY);
    });

    it('should add "-" then move at -1 on x axis', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let curX = player.points[0].x;
      let curY = player.points[0].y;

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      expect(player.level[curX - 1][curY]).toBe('-');
    });

    it('should not neither add new point nor update position', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakePoints = [ {x: player.points[0].x, y: player.points[0].y}  ];

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);
      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.n));


      newPos = Utils.addVector(player.points[0], direction.w);

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.w);
      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.w));

      player.move(direction.e);

      expect(player.length).toBe(3);
      fakePoints.forEach((point, i) => {
        expect(player.points[i]).toEqual(point);
      });
    });

    it('should update previous "-" position', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let curX = player.points[0].x;
      let curY = player.points[0].y;

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      expect(player.level[curX][curY]).toBe('-');
    });

    it('should make update player length to 2', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let curX = player.points[0].x;

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      expect(player.length).toBe(2);
    });

    it('should update the rest of player points after adding new "-"', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakePoints = [ {x: player.points[0].x, y: player.points[0].y}  ];

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);
      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.n));


      newPos = Utils.addVector(player.points[0], direction.w);

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.w);
      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.w));

      expect(player.length).toBe(3);
      fakePoints.forEach((point, i) => {
        expect(player.points[i]).toEqual(point);
      });
    });

    it('should not add new point but should update position of old points', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakePoints = [ {x: player.points[0].x, y: player.points[0].y}  ];

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);
      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.n));

      newPos = Utils.addVector(player.points[0], direction.w);

      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.w);

      fakePoints.unshift(Utils.addVector(fakePoints[0], direction.w));
      newPos = Utils.addVector(player.points[0], direction.n);

      player.move(direction.n);

      fakePoints.reverse().forEach((point, i, ar) => {
        if(i < ar.length - 1){
          point.x = ar[i + 1].x;
          point.y = ar[i + 1].y;
        }
      });

      fakePoints.reverse();
      fakePoints[0] = Utils.addVector(fakePoints[0], direction.n);

      expect(player.length).toBe(3);
      fakePoints.forEach((point, i) => {
        expect(player.points[i]).toEqual(point);
      });
    });


    it('should dispatch snake.died event and decrease lives to 2', (done) => {
      let firstPos = {x: player.points[0].x, y: player.points[0].y};
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakeVal = 0;
      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      newPos = Utils.addVector(player.points[0], direction.w);
      player.level = Utils.replacePos(player.level, newPos, 'x');

      document.addEventListener('snake.died', () => {
        fakeVal = 1;
      });

      player.move(direction.w);

      setTimeout(() => {
        expect(fakeVal).toEqual(1, 'this fake value changed when document trigger died event');
        expect(player.lives).toEqual(2, 'should decrease lives');
        expect(player.length).toEqual(1, 'should reset the length of snake');
        done();
      }, 300);
    });

    it('should dispatch snake.over event and decrease lives to 0', (done) => {
      let firstPos = {x: player.points[0].x, y: player.points[0].y};
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakeVal = 0;
      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      newPos = Utils.addVector(player.points[0], direction.w);
      player.level = Utils.replacePos(player.level, newPos, 'x');
      player.move(direction.w);

      newPos = Utils.addVector(player.points[0], direction.w);
      player.level = Utils.replacePos(player.level, newPos, 'x');
      player.move(direction.w);

      newPos = Utils.addVector(player.points[0], direction.w);
      player.level = Utils.replacePos(player.level, newPos, 'x');

      document.addEventListener('snake.over', () => {
        fakeVal = 1;
      });

      player.move(direction.w);

      setTimeout(() => {
        expect(fakeVal).toEqual(1, 'this fake value changed when document trigger died event');
        expect(player.lives).toEqual(0, 'should decrease lives');
        expect(player.length).toEqual(1, 'should reset the length of snake');
        expect(player.move(direction.w)).toBe(false, 'should not move to left');
        expect(player.move(direction.e)).toBe(false, 'should not move to right');
        expect(player.move(direction.n)).toBe(false, 'should not move to top');
        expect(player.move(direction.s)).toBe(false, 'should not move to bottom');
        done();
      }, 300);
    });

    it('should dispatch snake.feed event and update the score by 10', (done) => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      let fakeValue = 0;

      player.level = Utils.replacePos(player.level, newPos, '=');
      document.addEventListener('snake.feed', (event) => {
        fakeValue = 1;
      });

      player.move(direction.n);

      setTimeout(() => {
        expect(fakeValue).toBe(1, 'fake value should be changed after coin');
        expect(player.score).toBe(10, 'score should be 10');
        expect(player.speed).toBe(1.05, 'speed should be increased to 1.05');
        done();
      }, 50);
    });
  });

  describe('Player.isFood', () => {
    it('should return true', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, '=');

      expect(player.isFood(newPos)).toBe(true);
    });

    it('should return false', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, 'x');

      expect(player.isFood(newPos)).toBe(false);
    });
  });

  describe('Player.isObstacle', () => {
    it('should return true', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, 'x');

      expect(player.isObstacle(newPos)).toBe(true);
    });

    it('should return false', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, '=');

      expect(player.isObstacle(newPos)).toBe(false);
    });
  });

  describe('Player.isOpDir', () => {
    it('should return true', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      newPos = Utils.addVector(player.points[0], direction.s);

      expect(player.isOpDir(newPos)).toBe(true);
    });

    it('should return false', () => {
      let newPos = Utils.addVector(player.points[0], direction.n);
      player.level = Utils.replacePos(player.level, newPos, '=');
      player.move(direction.n);

      newPos = Utils.addVector(player.points[0], direction.w);

      expect(player.isOpDir(newPos)).toBe(false);
    });
  });
});
