import Bamboo from './bamboo.js'

class Pandakoid {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new Bamboo(this);
  }

  start() {
    this.bamboo.initiate();
  }
}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
