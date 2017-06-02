class Bamboo {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.bamboo = new createjs.Bitmap('./assets/images/bamboo.png');
    this.keys = {};
    document.onkeydown = this.keydown.bind(this);
    document.onkeyup = this.keyup.bind(this);
  }

  initiate() {
    this.bamboo.scaleX = 0.50;
    this.bamboo.scaleY = 0.75;
    this.bamboo.x = 351.5;
    this.bamboo.y = 550;
    this.stage.addChild(this.bamboo);
  }

  keydown(event) {
     this.keys[event.keyCode] = true;
  }

  keyup(event) {
     delete this.keys[event.keyCode];
  }

  playerAction() {
    if (this.keys[37] && this.bamboo.x > 9) this.bamboo.x -= 9;
    if (this.keys[39] && this.bamboo.x < 740) this.bamboo.x += 9;
  }
}

export default Bamboo;
