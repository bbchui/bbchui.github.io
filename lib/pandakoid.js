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
    this.score = 0;
    this.pandas = [];
  }

  start() {
    this.panda.initiate();
    this.bamboo.initiate();
    this.createBlocks(60, 100, 60, 20)
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
          this.pandas.forEach(panda => {
            panda.blockBounce(block);
          });
          if (block.health <= 0) {
            if (block.health <= 0 && block.powerUp === 1) {
              let panda1 = new Panda(this);
              let panda2 = new Panda(this);
              setTimeout(panda1.powerInitiate(block, 0.2), 500)
              setTimeout(panda2.powerInitiate(block, -0.2), 1000)
            }
            if (block.health <= 0 && block.powerUp === 2) {
              let barrier = new Block(this, 1, 0, 565);
              barrier.barrier();
            }

            this.blocks.splice(idx, 1)
          }
        })
        this.pandas.forEach((panda, idx) => {
          panda.bounce(this.bamboo)
        })
        this.stage.update();
        for (var i = 0; i < this.pandas.length; i++) {
          if (this.pandas[i].panda.y > 600) {
            this.stage.removeChild(this.pandas[i].panda);
            this.pandas.splice(i, 1)
          }
        }
        if (this.pandas.length === 0) {
          this.ticker.removeAllEventListeners();
        }
      });
    }
  }

  createBlocks(posX, posY, width, height) {
    let health = 5
    let x = posX;
    let count = 0
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 14; row++) {
        this.blocks[count] = new Block(this, health, posX, posY, 0)
        posX += 60;
        count += 1
      }
      posX = x;
      posY += 20;
      health -= 1;
    }

    let block1 = this.blocks[Math.floor(Math.random() * this.blocks.length)];
    let block2 =this.blocks[Math.floor(Math.random() * this.blocks.length)];
    let block3 =this.blocks[Math.floor(Math.random() * this.blocks.length)];
    let block4 =this.blocks[Math.floor(Math.random() * this.blocks.length)];
    block1.powerUp = 1;
    block1.health = 1;
    block2.powerUp = 1;
    block2.health = 1;
    block3.powerUp = 2;
    block3.health = 1;
    block4.powerUp = 2;
    block4.health = 1;
    this.blocks[62].powerUp = 2
    // this.blocks[48].powerUp = true


    this.blocks.forEach(block => {
      block.initiate(block.posX, block.posY, 60, 20, block.powerUp);
    })
  }

  gameover() {

  }

}

let pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;
