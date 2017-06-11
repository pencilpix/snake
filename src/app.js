import { Game } from './core/game';
import { PLANS } from './core/levelPlans';


window.addEventListener('load', () => {
  let container = document.querySelector('.game-container');
  let startButton = document.querySelector('#start_game');
  let game = new Game(PLANS, container, 48, startButton);
});

