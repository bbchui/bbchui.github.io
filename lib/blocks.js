class Block {
  constructor(game, health, posX, posY, powerUp) {
    this.game = game;
    this.stage = game.stage;
    this.block = new createjs.Shape();
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.powerUp = powerUp;
  }

  initiate(posX, posY, width, height) {
    if (this.health === 5) {
      this.block.graphics.beginStroke("#000").beginFill("#668E39").drawRect(posX, posY, width, height);
    } else if (this.health === 4) {
      this.block.graphics.beginStroke("#000").beginFill("#96B566").drawRect(posX, posY, width, height);
    } else if (this.health === 3) {
      this.block.graphics.beginStroke("#000").beginFill("#BCE27F").drawRect(posX, posY, width, height);
    } else if (this.health === 2) {
      this.block.graphics.beginStroke("#000").beginFill("#C3C3C3").drawRect(posX, posY, width, height);
    } else if (this.health === 1) {
      this.block.graphics.beginStroke("#000").beginFill("#F6FF97").drawRect(posX, posY, width, height);
    }
    this.block.regX = 30;
    this.block.regY = 10;
    this.game.blocks.push(this);
    this.stage.addChild(this.block);
  }



}

export default Block;
