class Bamboo {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.bamboo = new createjs.Bitmap('./assets/images/bamboo.png');
    // this.ticker = createjs.Ticker;
    this.keys = {};
    document.onkeydown = this.keydown.bind(this);
    document.onkeyup = this.keyup.bind(this);
  }

  initiate() {
    this.bamboo.scaleX = 0.50;
    this.bamboo.scaleY = 0.75;
    // this.bamboo.regX = 20;
    // this.bamboo.regY = 5;
    this.bamboo.x = 351.5;
    this.bamboo.y = 550;
    this.stage.addChild(this.bamboo);
    // this.ticker.framerate = 60;
    // this.ticker.addEventListener("tick", () => {
    //   this.playerAction();
    //   this.stage.update();
    // });
  }

  keydown(event) {
     this.keys[event.keyCode] = true;
  }

  keyup(event) {
     delete this.keys[event.keyCode];
  }

  playerAction() {
    if (this.keys[37] && this.bamboo.x > 5) this.bamboo.x -= 9;
    if (this.keys[39] && this.bamboo.x < 750) this.bamboo.x += 9;
  }
}

export default Bamboo;
