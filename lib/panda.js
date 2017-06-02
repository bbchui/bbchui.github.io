import Block from './blocks.js';

class Panda {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda2.png');
    this.dy = -5;
    this.dx = 0;
  }

  initiate() {
    this.panda.x = 422;
    this.panda.y = 535;
    this.panda.regX = 20;
    this.panda.regY = 20;
    this.stage.addChild(this.panda);
    this.game.pandas.push(this);
  }

  powerInitiate(block, x) {

    this.panda.x = block.posX;
    this.panda.y = block.posY;

    // debugger
    this.dx += x;
    this.dy = -4.5
    this.panda.regX = 20;
    this.panda.regY = 20;
    this.stage.addChild(this.panda);
    this.game.pandas.push(this);
  }

  bounce(bamboo) {
    this.panda.x += this.dx;
    this.panda.y += this.dy;
    this.panda.rotation += 1
    let disX = Math.abs(this.panda.x - bamboo.bamboo.x);
    let disY = Math.abs(this.panda.y - bamboo.bamboo.y);
    //bamboo logic
    if (this.panda.x + this.dx < 20 || this.panda.x + this.dx > 870) {
      this.dx = -this.dx;
    }
    if (this.panda.y + this.dy < 8) {
      this.dy = -this.dy;
    }
    if (this.panda.y + this.dy > 542) {

      if (this.panda.x > bamboo.bamboo.x && this.panda.x < bamboo.bamboo.x + 28 || (disX < 20 && disY < 5)) {
        this.dy = -this.dy;
        if (this.dx - 1 > -5) {
          this.dx -= 1;
        }
      } else if (this.panda.x > bamboo.bamboo.x + 28 && this.panda.x < bamboo.bamboo.x + 56) {
        this.dy = -this.dy;
        if (this.dx - 0.5 > -5) {
          this.dx -= 0.5;
        }
      } else if (this.panda.x > bamboo.bamboo.x + 56 && this.panda.x < bamboo.bamboo.x + 84) {
        this.dy = -this.dy;
      } else if (this.panda.x > bamboo.bamboo.x + 84 && this.panda.x < bamboo.bamboo.x + 112) {
        this.dy = -this.dy;
        if (this.dx + 0.5 < 5) {
          this.dx += 0.5;
        }
      } else if (this.panda.x > bamboo.bamboo.x + 112 && this.panda.x < bamboo.bamboo.x + 160)
        // (disX > 108 && disX < 164 && disY < 5))
        {
        this.dy = -this.dy;
        if (this.dx + 1 < 5) {
          this.dx += 1;
        }
      }
    }
  }

  checkCollision(block) {
    for (let i = 0; i < 12; i++) {
      // let dx = 20 * Math.cos(720 * (Math.PI/360) * (i/12))
      // let dy = 20 * Math.sin(720 * (Math.PI/360) * (i/12))
      let posX;
      let posY;
      this.calculate(block, i, ((block, dx, dy) => {
        let x = Math.abs(this.panda.x + dx - block.posX);
        let y = Math.abs(this.panda.y + dy - block.posY);
        posX = x;
        posY = y;
      }).bind(this))
      if (posX < 25 && posY < 5) {
        return true;
      }
    }
  }

  calculate(block, i, cb) {
    let dx = 20 * Math.cos(720 * (Math.PI/360) * (i/12));
    let dy = 20 * Math.sin(720 * (Math.PI/360) * (i/12));
    cb(block, dx, dy);
  }

  checkBarrier(block) {
    if (block.posX === 0) {
      if (this.panda.y + 20 > block.posY) {
        return true;
      }
    }
  }

  blockBounce(block) {
    // let disX = Math.abs(this.panda.x - block.posX);
    // let disY = Math.abs(this.panda.y - block.posY);
    // if (this.panda.x > block.posX && this.panda.x < block.posX + 50 && this.panda.y > block.posY && this.panda.y < block.posY + 10
    //   ||(disX > 0 && disX < 30 && disY < 10)
    // ) {
    if (this.checkCollision(block) || this.checkBarrier(block)) {
      block.health -= 1;
      this.dy = -this.dy;
      this.game.score += 10;
      document.getElementById("score").textContent = `Score: ${this.game.score}`;
      if (block.health < 5) {
        if (block.health <= 0) {
          this.stage.removeChild(block.block)
        } else if (block.health === 4) {
          block.block.graphics.beginStroke("#000").beginFill("#96B566").drawRect(block.posX, block.posY, 60, 20);
        } else if (block.health === 3) {
          block.block.graphics.beginStroke("#000").beginFill("#BCE27F").drawRect(block.posX, block.posY, 60, 20);
        } else if (block.health === 2) {
          block.block.graphics.beginStroke("#000").beginFill("#C3C3C3").drawRect(block.posX, block.posY, 60, 20);
        } else if (block.health === 1) {
          block.block.graphics.beginStroke("#000").beginFill("#F6FF97").drawRect(block.posX, block.posY, 60, 20);
        }
      }
    }
  }


  hitBottom() {
    this.panda.x = this.panda.x;
    this.panda.y = this.panda.y;
    this.dx = 0;
    this.dy = 0;
    console.log("game over");
  }
}

export default Panda;
