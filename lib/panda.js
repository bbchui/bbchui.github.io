class Panda {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda.png');
    this.dy = -5;
    this.dx = 0;
    // this.width = 35;
    // this.height = 20;
  }

  initiate() {
    this.panda.x = 420;
    this.panda.y = 541;
    this.panda.regX = 10;
    this.panda.regY = 17;
    this.stage.addChild(this.panda);
    // this.panda.x += 0;
    // this.panda.y += 0;
  }

  bounce(bamboo) {
    this.panda.x += this.dx;
    this.panda.y += this.dy;
    let disX = Math.abs(this.panda.x - bamboo.bamboo.x);
    let disY = Math.abs(this.panda.y - bamboo.bamboo.y);
    if (this.panda.x + this.dx < 8 || this.panda.x + this.dx > 870) {
      this.dx = -this.dx;
    }
    if (this.panda.y + this.dy < 8) {
      this.dy = -this.dy;
    }
    else if (this.panda.y + this.dy > 542) {
      if (this.panda.x > bamboo.bamboo.x && this.panda.x < bamboo.bamboo.x + 28 || (disX < 20 && disY < 10)) {
        this.dy = -this.dy;
        this.dx -= 2;
      } else if (this.panda.x > bamboo.bamboo.x + 29 && this.panda.x < bamboo.bamboo.x + 56) {
        this.dy = -this.dy;
        this.dx -= 1;
      } else if (this.panda.x > bamboo.bamboo.x + 57 && this.panda.x < bamboo.bamboo.x + 84) {
        this.dy = -this.dy;
      } else if (this.panda.x > bamboo.bamboo.x + 85 && this.panda.x < bamboo.bamboo.x + 112) {
        this.dy = -this.dy;
        this.dx += 1;
      } else if (this.panda.x > bamboo.bamboo.x + 113 && this.panda.x < bamboo.bamboo.x + 140 || (disX > 108 && disX < 143 && disY < 10)) {
        this.dy = -this.dy;
        this.dx += 2;
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
