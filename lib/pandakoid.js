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
    this.start = this.start.bind(this);
  }

  start(e) {
    // document.removeEventListener("keydown", () => {});
    this.panda.initiate();
    this.bamboo.initiate();
    this.createBlocks(60, 100, 60, 20);
    setTimeout(() => this.stage.update(), 500);
    document.addEventListener("keydown", (e) => {
      this.play(e);
    })
  }


  play(e) {
    if (e.keyCode === 13 && !this.isPlaying) {
      this.isPlaying = true;
      document.getElementById("welcome").style.visibility = "hidden";
      document.getElementById("gameover").style.visibility = "hidden";
      document.getElementById("canvas").style.opacity = 1;
      document.getElementById("score").textContent = `Score: ${this.score}`;
      // console.log(this.score);
      this.ticker.framerate = 120;
      this.ticker.addEventListener("tick", () => {
        this.bamboo.playerAction();
        this.blocks.forEach((block, idx) => {
          this.pandas.forEach(panda => {
            panda.blockBounce(block);
          });
          if (block.health <= 0) {
            if (block.health <= 0 && block.powerUp === 1) {
              this.score += 100;
              let panda1 = new Panda(this);
              let panda2 = new Panda(this);
              setTimeout(panda1.powerInitiate(block, 0.2), 500)
              setTimeout(panda2.powerInitiate(block, -0.2), 1000)
            }
            if (block.health <= 0 && block.powerUp === 2) {
              this.score += 100;
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
          if (this.pandas[i].panda.y > 585) {
            this.stage.removeChild(this.pandas[i].panda);
            this.pandas.splice(i, 1)
          }
        }

        if (this.blocks.length === 0 || this.blocks.every(block => block.powerUp === 2)) {
          this.isPlaying = false;
          this.ticker.removeAllEventListeners();
          this.blocks = [];
          this.score = 0;
          this.panda.dx = 0;
          this.stage.removeAllChildren();
          document.getElementById("win").style.visibility = "visible";
          document.getElementById("canvas").style.opacity = 0.5;
          this.start();
        }

        if (this.pandas.length === 0) {
          this.isPlaying = false;
          this.ticker.removeAllEventListeners();
          this.blocks = [];
          this.score = 0;
          this.panda.dx = 0;
          this.stage.removeAllChildren();
          // document.addEventListener("keydown", () => {
          document.getElementById("gameover").style.visibility = "visible";
          document.getElementById("canvas").style.opacity = 0.5;

            this.start();
          // })
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
    this.blocks[62].powerUp = 2;
    this.blocks[62].health = 1;
    this.blocks[44].health = 1;
    this.blocks[44].powerUp = 1;
    this.blocks[53].health = 1;
    this.blocks[53].powerUp = 1;
    this.blocks[15].health = 1;
    this.blocks[15].powerUp = 1;
    this.blocks[26].health = 1;
    this.blocks[26].powerUp = 1;
    this.blocks[56].health = 1;
    this.blocks[56].powerUp = 2;
    this.blocks[69].health = 1;
    this.blocks[69].powerUp = 2;
    this.blocks[32].health = 1;
    this.blocks[32].powerUp = 2;
    this.blocks[37].health = 1;
    this.blocks[37].powerUp = 2;


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
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});
