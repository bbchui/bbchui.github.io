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
  }

  start() {
    this.play();
    // this.panda.initiate();
    // this.bamboo.initiate();
    // this.blocks.initiate();
    //want to render before starting game
    // document.addEventListener("keydown", this.play, false)
  }

  play(e) {
    // if (e.keyCode === 32) {
      this.panda.initiate();
      this.bamboo.initiate();
      this.createBlocks(400, 100, 50, 20)
      this.ticker.framerate = 60;
      // if statement here to start game?
      this.ticker.addEventListener("tick", () => {
        // console.log(this.panda.panda.x, this.panda.panda.y, this.blocks[0].posX, this.blocks[0].posY);
        this.bamboo.playerAction();
        // this.panda.blockBounce(this.blocks[0])
        this.blocks.forEach((block, idx) => {
          this.panda.blockBounce(block);
          if (block.health <= 0) {
            console.log(block.health);
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
    // }
    console.log(this.blocks);
  }

  gameover() {

  }

  createBlocks(posX, posY, width, height) {
    let block = new Block(this, 1, posX, posY);
    block.initiate(posX, posY, width, height);
    // let x = posX;
    // for (var col = 0; col < 5; col++) {
    //   let block;
    //   for (var row = 0; row < 15; row++) {
    //     block[col][row] = new Block(this, 1)
    //     block.initiate(posX, posY, width, height);
    //     //change initiate to addChild later for power ups?
    //     posX += 51;
    //   }
    //   posX = x;
    //   posY += 21;
    // }
  }

}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
