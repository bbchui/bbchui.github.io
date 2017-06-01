import Bamboo from './bamboo.js';
import Panda from './panda.js';
import Block from './blocks.js';

class Pandakoid {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new Bamboo(this);
    this.panda = new Panda(this);
    this.panda2 = new Panda(this);
    this.panda3 = new Panda(this);
    this.blocks = [];
    this.ticker = createjs.Ticker;
    this.isOver = false;
    this.play = this.play.bind(this);
    this.createBlocks = this.createBlocks.bind(this);
    this.isPlaying = false;
    this.score = 0;
    this.powerUp = false;
  }

  start() {
    this.panda.initiate();
    this.bamboo.initiate();
    this.createBlocks(30, 100, 60, 20, this.powerUp)
    setTimeout(() => this.stage.update(), 500);
    document.addEventListener("keydown", (e) => {
      if (this.isPlaying) {
        return
      } else {
        this.isPlaying = true;
        this.play(e);
      }
    })
  }


  play(e) {
    if (e.keyCode === 32) {
      this.ticker.framerate = 120;
      // if statement here to start game?
      this.ticker.addEventListener("tick", () => {
        this.bamboo.playerAction();
        this.blocks.forEach((block, idx) => {
          this.panda.blockBounce(block);
          this.panda2.blockBounce(block);
          this.panda3.blockBounce(block);
          if (block.health <= 0) {
            if (block.health <= 0 && block.powerUp === true) {
              this.panda2.powerInitiate();
              this.panda3.powerInitiate();
            }
            this.blocks.splice(idx, 1)
          }
        })
        this.panda.bounce(this.bamboo, 0);
        this.panda2.bounce(this.bamboo, 1);
        this.panda3.bounce(this.bamboo, -1);
        this.stage.update();
        if (this.panda.panda.y > 575) {
          this.panda.hitBottom();
          this.ticker.removeAllEventListeners();
        }
      });
    }
  }

  createBlocks(posX, posY, width, height, powerUp) {
    let health = 5
    let x = posX;
    let count = 0
    for (var col = 0; col < 5; col++) {
      let block = new Block(this, 1, posX, posY);
      for (var row = 0; row < 14; row++) {
        this.blocks[count] = new Block(this, health, posX, posY, powerUp)
        this.blocks[count].initiate(posX, posY, width, height);
        posX += 60;
        count += 1
      }
      posX = x;
      posY += 20;
      health -= 1;
    }
    // this.blocks[68].powerUp = true;
    // this.blocks[67].powerUp = true;
    // this.blocks[69].powerUp = true;
  }

  gameover() {

  }

}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
