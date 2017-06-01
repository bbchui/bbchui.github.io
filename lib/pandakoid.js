import Bamboo from './bamboo.js';
import Panda from './panda.js';
import Block from './blocks.js';

class Pandakoid {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new Bamboo(this);
    this.panda = new Panda(this);
    this.blocks = [];
    this.ticker = createjs.Ticker;
    this.isOver = false;
    this.play = this.play.bind(this);
    this.createBlocks = this.createBlocks.bind(this);
    this.isPlaying = false;
  }

  start() {
    // this.play();
    this.panda.initiate();
    this.bamboo.initiate();
    this.createBlocks(50, 100, 50, 20)
    setTimeout(() => this.stage.update(), 500);
    //want to render before starting game
    document.addEventListener("keydown", (e) => {
      if (this.isPlaying) {
        return
      } else {
        this.isPlaying = true;
        this.play(e)
      }
    })
  }


  play(e) {
    if (e.keyCode === 32) {
      // this.panda.initiate();
      // this.bamboo.initiate();
      // this.createBlocks(50, 100, 50, 20)
      this.ticker.framerate = 60;
      // if statement here to start game?
      this.ticker.addEventListener("tick", () => {
        // console.log(this.panda.panda.x, this.panda.panda.y, this.blocks[0].posX, this.blocks[0].posY);
        this.bamboo.playerAction();
        this.blocks.forEach((block, idx) => {
          this.panda.blockBounce(block);
          if (block.health <= 0) {
            // this.stage.removeChild(block);
            this.blocks.splice(idx, 1)
          }
        })
        this.panda.bounce(this.bamboo);
        this.stage.update();
        if (this.panda.panda.y > 575) {
          this.panda.hitBottom();
          this.ticker.removeAllEventListeners();
        }
      });
    }
    console.log(this.blocks);
  }

  gameover() {

  }

  createBlocks(posX, posY, width, height) {
    let x = posX;
    let count = 0
    for (var col = 0; col < 5; col++) {
      let block = new Block(this, 1, posX, posY);
      for (var row = 0; row < 15; row++) {
        this.blocks[count] = new Block(this, 1, posX, posY)
        this.blocks[count].initiate(posX, posY, width, height);
        posX += 51;
        count += 1
      }
      posX = x;
      posY += 21;
    }
  }

}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
