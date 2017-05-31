import Bamboo from './bamboo.js';
import Panda from './panda.js';

class Pandakoid {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new Bamboo(this);
    this.panda = new Panda(this);
    this.ticker = createjs.Ticker;

  }

  start() {
    this.play()
  }

  play() {
    this.panda.initiate();
    this.bamboo.initiate();
    this.ticker.framerate = 60;
    this.ticker.addEventListener("tick", () => {
      this.bamboo.playerAction();
      this.panda.tick();
      this.stage.update();
    })

  }
}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
