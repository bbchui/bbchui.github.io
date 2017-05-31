class Panda {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda.png');
    this.dy = -5;
    this.dx = -5;
  }

  initiate() {
    // this.panda.scaleX = 0.25;
    // this.panda.scaleY = 0.25;

    this.panda.x = 420;
    this.panda.y = 520;
    this.stage.addChild(this.panda);
    this.panda.x += 1;
    this.panda.y += 1;
  }

  bounce() {
    this.panda.x += this.dx;
    this.panda.y += this.dy;
    if (this.panda.y + this.dy < 0) {
      this.dy = -this.dy;
    }
    if (this.panda.y + this.dy > 572) {
      this.dy = -this.dy;
    }
    if (this.panda.x + this.dx < 0) {
      this.dx = -this.dx;
    }
    if (this.panda.x + this.dx > 870) {
      this.dx = -this.dx;
    }
  }
}

export default Panda;
