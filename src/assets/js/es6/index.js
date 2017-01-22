import { level, direction } from './modules/environment.js';
import * as Utils from './modules/utils';
import { Player } from './modules/player.js';


let gameContainer = document.getElementById('game');
let randomDir = ['n', 'w', 'e', 's'];
let dir;
let gameOver = false;
let paused = false;
let keyDownTimeout;
let requestAnimId;
let keys = {
  ArrowUp   : 'n', // top -> north
  ArrowLeft : 'w', // left -> west
  ArrowRight: 'e', // right => east
  ArrowDown : 's', // bottom -> south
  // reverse directions
  ArrowUpRev   : 's', // top -> north
  ArrowLeftRev : 'e', // left -> west
  ArrowRightRev: 'w', // right => east
  ArrowDownRev : 'n' // bottom -> south
};

window.player = new Player(level);
let timeout;

function animate() {
  clearTimeout(timeout);

  if(gameOver) {
    return false;
  }



  timeout = setTimeout(() => {
    if(!dir)
      dir = 'w';

    if(!paused){
      player.move(direction[dir]);
      Utils.drawLevel(gameContainer, player, 10);
    }

    window.requestAnimationFrame(animate);
  }, player.snakeSpeed );
}

document.addEventListener('DOMContentLoaded', () => {
  let topScoreDiv = document.getElementById('top_score');

  topScoreDiv.textContent = (player.topScore) ? player.topScore : '0';

  // game events
  document.addEventListener('snake.over', function() {
    gameOver = true;
    alert('game Over :(');
  });

  document.addEventListener('snake.died', (event) => {
    let dieSound = document.getElementById('die');
    dieSound.currentTime = 0;
    dieSound.play();

    document.getElementById('lives').textContent = player.lives;
    // console.log(speed, ' \n ', speed * 100, ' \n ', player.speed*100);
  });

  document.addEventListener('snake.over', (event) => {
    let gameSound = document.getElementById('game_over');
    let score = document.getElementById('cur_score').textContent;
    let topScore = document.getElementById('top_score').textContent;
    // gameSound.currentTime = 0;
    gameSound.play();
    if(player.score > player.topScore) {
      console.log('congratulation top score !!!', player.topScore);
      document.getElementById('top_score').textContent = player.topScore;
    }
    document.getElementById('cur_score').textContent = 0;
    gameOver = true;
  });

  document.addEventListener('snake.feed', (event) => {
    let feedSound = document.getElementById('coin');
    let scoreSpan = document.getElementById('cur_score');
    let speedSpan = document.getElementById('speed');

    feedSound.currentTime = 0;
    feedSound.play();

    scoreSpan.textContent = player.score;
    speedSpan.textContent = Math.floor(player.speed * 100);
    // console.log(player.speed, player.snakeSpeed);
  });

  document.addEventListener('snake.top_score', (event) => {

    document.getElementById('top_score').textContent = player.topScore;
    document.getElementById('lives').textContent = player.lives;
    // dialog.style.display = 'block';
    alert('congratulation ...! \n new top score:' + player.topScore);
  });

  window.requestAnimationFrame(animate);
});

// controls
document.addEventListener('keydown', (event) => {
  let key = event.key;
  let snake = document.querySelector('#snake');

  clearTimeout(keyDownTimeout);

  keyDownTimeout = setTimeout(() => {
    if(keys.hasOwnProperty(key)) {
      if(keys[key + 'Rev'] === dir && player.length > 1) {
        return;
      }

      if(!paused && !gameOver){
        dir = keys[key];
        snake.className = dir;
      }
    }

    if(key === ' ') {
      paused = !paused;
    }
  }, player.snakeSpeed);

  // document.getElementById('top_score').textContent = player.topScore;
  // document.getElementById('lives').textContent = player.lives 

});

