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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pandakoid = function () {
  function Pandakoid() {
    _classCallCheck(this, Pandakoid);

    this.canvas = document.getElementById('canvas');
    this.stage = new createjs.Stage(this.canvas);
    this.bamboo = new _bamboo2.default(this);
    this.panda = new _panda2.default(this);
    this.ticker = createjs.Ticker;
    this.isOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
  }

  _createClass(Pandakoid, [{
    key: 'start',
    value: function start() {
      this.panda.initiate();
      this.bamboo.initiate();
      //want to render before starting game
      document.addEventListener("keydown", this.play, false);
    }
  }, {
    key: 'play',
    value: function play(e) {
      var _this = this;

      if (e.keyCode === 32) {
        // this.panda.initiate();
        // this.bamboo.initiate();
        this.ticker.framerate = 60;
        this.ticker.addEventListener("tick", function () {
          _this.bamboo.playerAction();
          _this.panda.bounce(_this.bamboo);
          _this.stage.update();
          if (_this.panda.panda.y > 575) {
            _this.panda.hitBottom();
            _this.ticker.removeAllEventListeners();
          }
        });
      }
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
      if (this.keys[37] && this.bamboo.x > 5) this.bamboo.x -= 7;
      if (this.keys[39] && this.bamboo.x < 750) this.bamboo.x += 7;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panda = function () {
  function Panda(game) {
    _classCallCheck(this, Panda);

    this.game = game;
    this.stage = game.stage;
    this.panda = new createjs.Bitmap('./assets/images/panda.png');
    this.dy = -10;
    this.dx = 0;
    // this.width = 35;
    // this.height = 20;
  }

  _createClass(Panda, [{
    key: "initiate",
    value: function initiate() {
      this.panda.x = 420;
      this.panda.y = 541;
      this.panda.regX = 10;
      this.panda.regY = 17;
      this.stage.addChild(this.panda);
      // this.panda.x += 0;
      // this.panda.y += 0;
    }
  }, {
    key: "bounce",
    value: function bounce(bamboo) {
      this.panda.x += this.dx;
      this.panda.y += this.dy;
      var disX = Math.abs(this.panda.x - bamboo.bamboo.x);
      var disY = Math.abs(this.panda.y - bamboo.bamboo.y);
      if (this.panda.x + this.dx < 8 || this.panda.x + this.dx > 870) {
        this.dx = -this.dx;
      }
      if (this.panda.y + this.dy < 8) {
        this.dy = -this.dy;
      } else if (this.panda.y + this.dy > 542) {
        if (this.panda.x > bamboo.bamboo.x && this.panda.x < bamboo.bamboo.x + 28 || disX < 20 && disY < 10) {
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
        } else if (this.panda.x > bamboo.bamboo.x + 113 && this.panda.x < bamboo.bamboo.x + 140 || disX > 108 && disX < 143 && disY < 10) {
          this.dy = -this.dy;
          this.dx += 2;
        }
      }
    }
  }, {
    key: "hitBottom",
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map