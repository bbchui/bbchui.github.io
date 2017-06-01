/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bamboo = __webpack_require__(1);

var _bamboo2 = _interopRequireDefault(_bamboo);

var _panda = __webpack_require__(2);

var _panda2 = _interopRequireDefault(_panda);

var _blocks = __webpack_require__(3);

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pandakoid = function () {
  function Pandakoid() {
    _classCallCheck(this, Pandakoid);

    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new _bamboo2.default(this);
    this.panda = new _panda2.default(this);
    this.panda2 = new _panda2.default(this);
    this.panda3 = new _panda2.default(this);
    this.blocks = [];
    this.ticker = createjs.Ticker;
    this.isOver = false;
    this.play = this.play.bind(this);
    this.createBlocks = this.createBlocks.bind(this);
    this.isPlaying = false;
    this.score = 0;
    this.powerUp = false;
  }

  _createClass(Pandakoid, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.panda.initiate();
      this.bamboo.initiate();
      this.createBlocks(30, 100, 60, 20, this.powerUp);
      setTimeout(function () {
        return _this.stage.update();
      }, 500);
      document.addEventListener("keydown", function (e) {
        if (_this.isPlaying) {
          return;
        } else {
          _this.isPlaying = true;
          _this.play(e);
        }
      });
    }
  }, {
    key: 'play',
    value: function play(e) {
      var _this2 = this;

      if (e.keyCode === 32) {
        this.ticker.framerate = 120;
        // if statement here to start game?
        this.ticker.addEventListener("tick", function () {
          _this2.bamboo.playerAction();
          _this2.blocks.forEach(function (block, idx) {
            _this2.panda.blockBounce(block);
            _this2.panda2.blockBounce(block);
            _this2.panda3.blockBounce(block);
            if (block.health <= 0) {
              if (block.health <= 0 && block.powerUp === true) {
                _this2.panda2.powerInitiate();
                _this2.panda3.powerInitiate();
              }
              _this2.blocks.splice(idx, 1);
            }
          });
          _this2.panda.bounce(_this2.bamboo, 0);
          _this2.panda2.bounce(_this2.bamboo, 1);
          _this2.panda3.bounce(_this2.bamboo, -1);
          _this2.stage.update();
          if (_this2.panda.panda.y > 575) {
            _this2.panda.hitBottom();
            _this2.ticker.removeAllEventListeners();
          }
        });
      }
    }
  }, {
    key: 'createBlocks',
    value: function createBlocks(posX, posY, width, height, powerUp) {
      var health = 5;
      var x = posX;
      var count = 0;
      for (var col = 0; col < 5; col++) {
        var block = new _blocks2.default(this, 1, posX, posY);
        for (var row = 0; row < 14; row++) {
          this.blocks[count] = new _blocks2.default(this, health, posX, posY, powerUp);
          this.blocks[count].initiate(posX, posY, width, height);
          posX += 60;
          count += 1;
        }
        posX = x;
        posY += 20;
        health -= 1;
      }
      // this.blocks[68].powerUp = true;
      // this.blocks[67].powerUp = true;
      // this.blocks[69].powerUp = true;
    }
  }, {
    key: 'gameover',
    value: function gameover() {}
  }]);

  return Pandakoid;
}();

var pandakoid = new Pandakoid();
pandakoid.start();
window.pandakoid = pandakoid;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bamboo = function () {
  function Bamboo(game) {
    _classCallCheck(this, Bamboo);

    this.game = game;
    this.stage = game.stage;
    this.bamboo = new createjs.Bitmap('./assets/images/bamboo.png');
    // this.ticker = createjs.Ticker;
    this.keys = {};
    document.onkeydown = this.keydown.bind(this);
    document.onkeyup = this.keyup.bind(this);
  }

  _createClass(Bamboo, [{
    key: 'initiate',
    value: function initiate() {
      this.bamboo.scaleX = 0.50;
      this.bamboo.scaleY = 0.75;
      // this.bamboo.regX = 20;
      // this.bamboo.regY = 5;
      this.bamboo.x = 355;
      this.bamboo.y = 550;
      this.stage.addChild(this.bamboo);
      // this.ticker.framerate = 60;
      // this.ticker.addEventListener("tick", () => {
      //   this.playerAction();
      //   this.stage.update();
      // });
    }
  }, {
    key: 'keydown',
    value: function keydown(event) {
      this.keys[event.keyCode] = true;
    }
  }, {
    key: 'keyup',
    value: function keyup(event) {
      delete this.keys[event.keyCode];
    }
  }, {
    key: 'playerAction',
    value: function playerAction() {
      if (this.keys[37] && this.bamboo.x > 5) this.bamboo.x -= 9;
      if (this.keys[39] && this.bamboo.x < 750) this.bamboo.x += 9;
    }
  }]);

  return Bamboo;
}();

exports.default = Bamboo;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blocks = __webpack_require__(3);

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panda = function () {
  function Panda(game) {
    _classCallCheck(this, Panda);

    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda2.png');
    this.dy = -4;
    this.dx = 0;
  }

  _createClass(Panda, [{
    key: 'initiate',
    value: function initiate() {
      this.panda.x = 425;
      this.panda.y = 535;
      this.panda.regX = 20;
      this.panda.regY = 20;
      this.stage.addChild(this.panda);
    }
  }, {
    key: 'powerInitiate',
    value: function powerInitiate() {
      this.panda.x = this.game.panda.panda.x;
      this.panda.y = this.game.panda.panda.y;
      this.panda.regX = 20;
      this.panda.regY = 20;
      this.stage.addChild(this.panda);
    }
  }, {
    key: 'bounce',
    value: function bounce(bamboo, x) {
      this.panda.x += this.dx + x;
      this.panda.y += this.dy;
      this.panda.rotation += 1;
      var disX = Math.abs(this.panda.x - bamboo.bamboo.x);
      var disY = Math.abs(this.panda.y - bamboo.bamboo.y);
      //bamboo logic
      if (this.panda.x + this.dx < 8 || this.panda.x + this.dx > 870) {
        this.dx = -this.dx;
      }
      if (this.panda.y + this.dy < 8) {
        this.dy = -this.dy;
      }
      if (this.panda.y + this.dy > 542) {
        if (this.panda.x > bamboo.bamboo.x && this.panda.x < bamboo.bamboo.x + 28 || disX < 20 && disY < 5) {
          this.dy = -this.dy;
          this.dx -= 2;
        } else if (this.panda.x > bamboo.bamboo.x + 28 && this.panda.x < bamboo.bamboo.x + 56) {
          this.dy = -this.dy;
          this.dx -= 1;
        } else if (this.panda.x > bamboo.bamboo.x + 56 && this.panda.x < bamboo.bamboo.x + 84) {
          this.dy = -this.dy;
        } else if (this.panda.x > bamboo.bamboo.x + 84 && this.panda.x < bamboo.bamboo.x + 112) {
          this.dy = -this.dy;
          this.dx += 1;
        } else if (this.panda.x > bamboo.bamboo.x + 112 && this.panda.x < bamboo.bamboo.x + 140 || disX > 108 && disX < 168 && disY < 5) {
          this.dy = -this.dy;
          this.dx += 2;
        }
      }
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(block) {
      var _this = this;

      for (var i = 0; i < 12; i++) {
        // let dx = 20 * Math.cos(720 * (Math.PI/360) * (i/12))
        // let dy = 20 * Math.sin(720 * (Math.PI/360) * (i/12))
        var posX = void 0;
        var posY = void 0;
        this.calculate(block, i, function (block, dx, dy) {
          var x = Math.abs(_this.panda.x + dx - block.posX);
          var y = Math.abs(_this.panda.y + dy - block.posY);
          posX = x;
          posY = y;
        }.bind(this));
        if (posX < 25 && posY < 10) {
          return true;
        }
      }
    }
  }, {
    key: 'calculate',
    value: function calculate(block, i, cb) {
      var dx = 20 * Math.cos(720 * (Math.PI / 360) * (i / 12));
      var dy = 20 * Math.sin(720 * (Math.PI / 360) * (i / 12));
      cb(block, dx, dy);
    }
  }, {
    key: 'blockBounce',
    value: function blockBounce(block) {
      // let disX = Math.abs(this.panda.x - block.posX);
      // let disY = Math.abs(this.panda.y - block.posY);
      // if (this.panda.x > block.posX && this.panda.x < block.posX + 50 && this.panda.y > block.posY && this.panda.y < block.posY + 10
      //   ||(disX > 0 && disX < 30 && disY < 10)
      // ) {
      if (this.checkCollision(block)) {
        debugger;
        block.health -= 1;
        this.dy = -this.dy;
        this.game.score += 10;
        if (block.health < 5) {
          if (block.health <= 0) {
            this.stage.removeChild(block.block);
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
  }, {
    key: 'hitBottom',
    value: function hitBottom() {
      this.panda.x = this.panda.x;
      this.panda.y = this.panda.y;
      this.dx = 0;
      this.dy = 0;
      console.log("game over");
    }
  }]);

  return Panda;
}();

exports.default = Panda;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
  function Block(game, health, posX, posY, powerUp) {
    _classCallCheck(this, Block);

    this.game = game;
    this.stage = game.stage;
    this.block = new createjs.Shape();
    this.health = health;
    this.posX = posX;
    this.posY = posY;
    this.powerUp = powerUp;
  }

  _createClass(Block, [{
    key: "initiate",
    value: function initiate(posX, posY, width, height) {
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
      this.block.regX = 10;
      this.block.regY = 30;
      this.game.blocks.push(this);
      this.stage.addChild(this.block);
    }
  }]);

  return Block;
}();

exports.default = Block;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map