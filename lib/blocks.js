class Blocks {
  constructor(game) {
    this.game = game;
    this.stage = game.stage;
    this.block = new createjs.Shape();

    this.row = 5;
    this.column = 10;
    // this.block.x = 100;
    // this.block.y = 100;
    // stage.addChild(circle);
  }

  initiate() {
    this.block.graphics.beginFill("DeepSkyBlue").drawRect(100, 100, 40, 20);
    // this.stage.addChild(this.block)
    this.stage.addChild(this.block);
  }
}

export default Blocks;

// var circle = new createjs.Shape();
// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
// circle.x = 100;
// circle.y = 100;
// stage.addChild(circle);
