class Bamboo {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.bamboo = new createjs.Bitmap('./assets/images/bamboo.png');
    this.ticker = createjs.Ticker;
    this.keys = {};
    document.onkeydown = this.keydown.bind(this);
    document.onkeyup = this.keyup.bind(this);
  }

  initiate() {
    this.bamboo.scaleX = 0.20;
    this.bamboo.scaleY = 0.20;
    this.bamboo.x = 100;
    this.bamboo.y = 140;
    this.stage.addChild(this.bamboo);
    this.ticker.framerate = 60;
    this.ticker.addEventListener("tick", () => {
      this.playerAction();
      this.stage.update();
    });
  }

  keydown(event) {
     this.keys[event.keyCode] = true;
  }

  keyup(event) {
     delete this.keys[event.keyCode];
  }

  playerAction() {
    if (this.keys[37]) this.bamboo.x -= 2;
    if (this.keys[39]) this.bamboo.x += 2;
  }
}

export default Bamboo;
