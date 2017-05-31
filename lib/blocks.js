class Block {
  constructor(game, health, posX, posY) {
    this.game = game;
    this.stage = game.stage;
    this.block = new createjs.Shape();
    this.health = health;
    this.posX = posX;
    this.posY = posY;
  }

  initiate(posX, posY, width, height) {
    this.block.graphics.beginFill("#167C32").drawRect(posX, posY, width, height);
    // this.block.x = posX;
    // this.block.y = posY;
    this.game.blocks.push(this);
    this.stage.addChild(this.block);
  }



}

export default Block;

// var circle = new createjs.Shape();
// circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
// circle.x = 100;
// circle.y = 100;
// stage.addChild(circle);
