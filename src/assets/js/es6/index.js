import { Game } from './modules/game';
import { PLANS } from './modules/levelPlans';

window.game = new Game(PLANS, document.body, 20);

document.addEventListener('DOMContentLoaded', () => {
  game.start();
});