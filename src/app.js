import { Game } from './core/game';
import { PLANS } from './core/levelPlans';

let container = document.querySelector('.game-container');

// window.addEventListener('load', () => {
  // game.start();
// });
let game;

window.addEventListener('load', () => {
  game = new Game(PLANS, container, 48);
  game.start();
});

