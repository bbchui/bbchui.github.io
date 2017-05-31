import Bamboo from './bamboo.js';
import Panda from './panda.js';

class Pandakoid {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new Bamboo(this);
    this.panda = new Panda(this);
    this.ticker = createjs.Ticker;
    this.isOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
  }

  start() {
    this.panda.initiate();
    this.bamboo.initiate();
    //want to render before starting game
    document.addEventListener("keydown", this.play, false)
  }

  play(e) {
    if (e.keyCode === 32) {
      // this.panda.initiate();
      // this.bamboo.initiate();
      this.ticker.framerate = 60;
      this.ticker.addEventListener("tick", () => {
        this.bamboo.playerAction();
        this.panda.bounce(this.bamboo);
        this.stage.update();
        if (this.panda.panda.y > 575) {
          this.panda.hitBottom();
          this.ticker.removeAllEventListeners();
        }
      })
    }

  }

  gameover() {

  }


}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
