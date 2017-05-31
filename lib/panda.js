class Panda {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda.png');
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

  tick(event) {
    this.panda.x += 1;
    this.panda.y += 1;
  }
}

export default Panda;
