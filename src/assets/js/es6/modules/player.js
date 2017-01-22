import * as Utils from './utils';

let events = Utils.EVENT;

/**
 * Player is the element moving on
 * the game platform
 * @param {Object} v instance of Vector.
 */
export class Player {

  constructor(level) {
    this.score = 0;
    this.topScore = window.localStorage.getItem('snakeTopScore') || 0;
    this.speed = 1;
    this.lives = 3;

    this.points = { 
      0: {
        x: Math.floor(level.length/2), y: Math.floor(level[0].length/2)
      }
    };

    this.level = Utils.replacePos(level, this.points['0'], '-');
    this.addFood();
  }


  /**
   * getter to get the total number of snake points
   * @return {Number} length of Player.points.
   */
  get length () {
    return (Object.keys(this.points)).length;
  }

  /**
   * get the snake speed.
   * @return {[type]} [description]
   */
  get snakeSpeed () {
    return Math.max(Math.floor(1000 / (this.speed * 5)), 50);
  }


  /**
   * check if the new position holds a coin/food
   * for the snake
   * @param  {Object}  pos x, y cordinates
   * @return {Boolean}     food/not
   */
  isFood(pos) {
    return this.level[pos.x][pos.y] === '=';
  }



  /**
   * check if the new position is an obstacle
   * @param  {Object}  pos x, y cordinates
   * @return {Boolean}     wall/not
   */
  isObstacle(pos) {
    return this.level[pos.x][pos.y] === 'x';
  }



  /**
   * check if the new position is the body
   * of the snake itself
   * @param  {Object}  pos x, y cordinates as properties.
   * @return {Boolean}     snake part or not
   */
  isSnake(pos) {
    for(let i = 2; i < this.length; i++){
      let point = this.points[i];
      if(point.x === pos.x && point.y === pos.y) {
        return true;
      }
    }
  }



  /**
   * check if player trying to go the opposite direction
   * @param  {Object}  pos has x, y cordinates as keys
   * @return {Boolean}     same/opposite direction.
   */
  isOpDir(pos) {
    if(this.length > 1){
      let point = this.points[1];
      return pos.x === point.x && pos.y === point.y;
    }
  }



  /**
   * add string that act like food in the level
   * at the start of game, reset game or even
   * after clear the previous food.
   */
  addFood(point) {
    let randomX = (point) ? point.x : Math.floor(Math.random() * (this.level.length - 2) + 1);
    let randomY = (point) ? point.y : Math.floor(Math.random() * (this.level[0].length - 2) + 1);
    let _isSnake = this.isSnake({x: randomX, y: randomY});
    let _isOpDir = this.isOpDir({x: randomX, y: randomY});
    let _isObstacle = this.isObstacle({x: randomX, y: randomY});
    let _isFirstPoint = randomX === this.points[0].x && randomY === this.points[0].y;
    // let newLevel;


    if(_isSnake || _isOpDir || _isObstacle || _isFirstPoint) {
      this.addFood();
      return;
    }
    this.foodPos = {x: randomX, y: randomY};
    this.level = Utils.replacePos(this.level, this.foodPos, '=');
  }



  /**
   * reset the snake length and the level
   * strings then remove the points from
   * player instance
   */
  resetLevel() {
    let levelLength = this.level.length;
    let strLength = this.level[0].length;
    this.level = this.level.map((str) => {
      return str = str.replace(/\=|\-/g, ' ');
    });

    this.points = { 
      0: {
        x: Math.floor(levelLength/2), y: Math.floor(strLength/2)
      }
    };

    this.level = Utils.replacePos(this.level, this.points['0'], '-');
    this.addFood();
  }




  /**
   * makes the player move one step in dedicated direction from the 
   * four basic directions 'top, left, right, bottom'.
   * @param  {Object} direction object has x, y keys
   * @return {Boolean}          moved or not.
   */
  move(direction) {
    let newPos = Utils.addVector(this.points['0'], direction);
    let _isFood = this.isFood(newPos);
    let _isObstacle = this.isObstacle(newPos);
    let _isSnake = this.isSnake(newPos);
    let _isOpDir = this.isOpDir(newPos);

    if(_isObstacle || _isSnake || this.lives === 0) {
      // game over
      if(this.lives <= 1) {
        this.lives = 0;

        if(this.score > this.topScore) {
          this.topScore = this.score;
          document.dispatchEvent(events.top_score_event);
          window.localStorage.setItem('snakeTopScore', this.topScore);
        }
        // this.topScore = (this.score > this.topScore) ? this.score : this.topScore;
        this.score = 0;
        document.dispatchEvent(events.game_over_event);

      } else {
        // decrease lives
        // snake died
        this.lives--;
        this.resetLevel();
        document.dispatchEvent(events.died_event);
      }
      return false;
    } else if(_isOpDir) {
      // opposite direction
      // so don't move
      return false;
    }

    if(!_isFood && !_isObstacle) {
      // clear last position
      this.level = Utils.replacePos(this.level, this.points[this.length - 1], ' ');
    }

    // add snake part to the level in the new position
    this.level = Utils.replacePos(this.level, newPos, '-');

    // if food add another point to the snake body
    // and player points with last cordinates before update
    if(_isFood) {
      this.points[this.length] = {
        x: this.points[this.length - 1].x,
        y: this.points[this.length - 1].y
      };

      this.score = (Math.floor(this.speed * 10) <= 20) ? this.score + 10 : this.score + 20;
      this.speed = this.speed + 0.1;
      document.dispatchEvent(events.feed_event);
    }

    // previous points
    for(let i = this.length - 1; i > 0; i--) {
      this.points[i].x = this.points[i - 1].x;
      this.points[i].y = this.points[i - 1].y;
      this.level = Utils.replacePos(this.level, this.points[i], '-');
    }

    // update last point position
    this.points[0].x = newPos.x;
    this.points[0].y = newPos.y;

    // if it was a food
    // add new food
    if(_isFood){
      this.addFood();
    }
    return true;

  }
}

