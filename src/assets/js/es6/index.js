import { Game } from './modules/game';
import { PLANS } from './modules/levelPlans';


document.addEventListener('DOMContentLoaded', () => {
  let game = new Game(PLANS, document.querySelector('.game-container'), 48);
  game.start();
});