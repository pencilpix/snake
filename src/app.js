import { Game } from './core/game';
import { PLANS } from './core/levelPlans';


window.addEventListener('load', () => {
  let container = document.querySelector('.game-container');
  let game = new Game(PLANS, container, 48);

  game.start();
});

