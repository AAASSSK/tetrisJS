// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/tetris/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TETRIS_STATE = exports.SET_PLAY_FIELD_Y = exports.SET_PLAY_FIELD_X = exports.N_TYPES = exports.N_DEGREES = exports.GRID = exports.GAME_MODE = exports.COLORS = void 0;
//Tetris block color setting
var COLORS = {
  T0: "white",
  T1: "red",
  T2: "green",
  T3: "yellow",
  T4: "blue",
  T5: "magenta",
  T6: "cyan"
};
exports.COLORS = COLORS;
var TETRIS_STATE = {
  NewBlock: 0,
  Running: 1,
  Finished: 2
};

//curTetris setting (to change this setting, frist need to change tetrisArray.js)
exports.TETRIS_STATE = TETRIS_STATE;
var N_TYPES = 7;
exports.N_TYPES = N_TYPES;
var N_DEGREES = 4;

//playfield setting
exports.N_DEGREES = N_DEGREES;
var SET_PLAY_FIELD_X = 10;
exports.SET_PLAY_FIELD_X = SET_PLAY_FIELD_X;
var SET_PLAY_FIELD_Y = 20;
exports.SET_PLAY_FIELD_Y = SET_PLAY_FIELD_Y;
var GRID = 32;
exports.GRID = GRID;
var GAME_MODE = {
  normalMode: 0,
  recordMode: 1,
  replayMode: 2
};
exports.GAME_MODE = GAME_MODE;
},{}],"src/js/tetris/matrix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Matrix = /*#__PURE__*/function () {
  function Matrix(dy, dx) {
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    _classCallCheck(this, Matrix);
    _defineProperty(this, "_matrix", void 0);
    this._dy = dy;
    this._dx = dx;
    this._arr = arr;
    this._matrix = arr ? this._allocWithArr() : this._alloc();
  }
  _createClass(Matrix, [{
    key: "_alloc",
    value: function _alloc() {
      var matrix = new Array(this._dy);
      for (var i = 0; i < this._dy; i++) {
        matrix[i] = new Array(this._dx).fill(0);
      }
      return matrix;
    }
  }, {
    key: "_allocWithArr",
    value: function _allocWithArr() {
      var matrix = this._alloc();
      for (var y = 0; y < this._dy; y++) for (var x = 0; x < this._dx; x++) {
        matrix[y][x] = this._arr[y * this._dx + x];
      }
      return matrix;
    }
  }, {
    key: "clip",
    value: function clip(top, left, bottom, right) {
      var cy = bottom - top;
      var cx = right - left;
      var temp = new Matrix(cy, cx);
      for (var y = 0; y < cy; y++) {
        for (var x = 0; x < cx; x++) {
          temp.getArray()[y][x] = this._matrix[top + y][left + x];
        }
      }
      return temp;
    }
  }, {
    key: "paste",
    value: function paste(matrix, top, left) {
      for (var y = 0; y < matrix.getDy(); y++) {
        for (var x = 0; x < matrix.getDx(); x++) {
          this._matrix[y + top][x + left] = matrix.getArray()[y][x];
        }
      }
    }
  }, {
    key: "getArray",
    value: function getArray() {
      return this._matrix;
    }
  }, {
    key: "getDy",
    value: function getDy() {
      return this._dy;
    }
  }, {
    key: "getDx",
    value: function getDx() {
      return this._dx;
    }
  }]);
  return Matrix;
}();
exports.Matrix = Matrix;
},{}],"src/js/tetris/helpers/getRandomInt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
},{}],"src/js/tetris/tetrisFunc/generateRandomTetris.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomTetris = void 0;
var _getRandomInt = require("../helpers/getRandomInt.js");
var _config = require("../config.js");
var generateRandomTetris = function generateRandomTetris(tetrisValue) {
  var nameT = "T".concat((0, _getRandomInt.getRandomInt)(0, _config.N_TYPES - 1));
  var nameD = "D0";
  var matrix = tetrisValue.setOfBlockObjects[nameT][nameD];
  var left = tetrisValue.playField.getDx() / 2 - Math.ceil(matrix.getDx() / 2);
  var top = 0;
  var degree = 0;
  return {
    nameT: nameT,
    nameD: nameD,
    matrix: matrix,
    left: left,
    top: top,
    degree: degree
  };
};
exports.generateRandomTetris = generateRandomTetris;
},{"../helpers/getRandomInt.js":"src/js/tetris/helpers/getRandomInt.js","../config.js":"src/js/tetris/config.js"}],"src/js/tetris/tetrisArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOfBlockArrays = void 0;
var setOfBlockArrays = {
  T0: {
    D0: [1, 1, 1, 1, -1],
    D1: [1, 1, 1, 1, -1],
    D2: [1, 1, 1, 1, -1],
    D3: [1, 1, 1, 1, -1]
  },
  T1: {
    D0: [0, 1, 0, 1, 1, 1, 0, 0, 0, -1],
    D1: [0, 1, 0, 0, 1, 1, 0, 1, 0, -1],
    D2: [0, 0, 0, 1, 1, 1, 0, 1, 0, -1],
    D3: [0, 1, 0, 1, 1, 0, 0, 1, 0, -1]
  },
  T2: {
    D0: [1, 0, 0, 1, 1, 1, 0, 0, 0, -1],
    D1: [0, 1, 1, 0, 1, 0, 0, 1, 0, -1],
    D2: [0, 0, 0, 1, 1, 1, 0, 0, 1, -1],
    D3: [0, 1, 0, 0, 1, 0, 1, 1, 0, -1]
  },
  T3: {
    D0: [0, 0, 1, 1, 1, 1, 0, 0, 0, -1],
    D1: [0, 1, 0, 0, 1, 0, 0, 1, 1, -1],
    D2: [0, 0, 0, 1, 1, 1, 1, 0, 0, -1],
    D3: [1, 1, 0, 0, 1, 0, 0, 1, 0, -1]
  },
  T4: {
    D0: [0, 1, 0, 1, 1, 0, 1, 0, 0, -1],
    D1: [1, 1, 0, 0, 1, 1, 0, 0, 0, -1],
    D2: [0, 1, 0, 1, 1, 0, 1, 0, 0, -1],
    D3: [1, 1, 0, 0, 1, 1, 0, 0, 0, -1]
  },
  T5: {
    D0: [0, 1, 0, 0, 1, 1, 0, 0, 1, -1],
    D1: [0, 0, 0, 0, 1, 1, 1, 1, 0, -1],
    D2: [0, 1, 0, 0, 1, 1, 0, 0, 1, -1],
    D3: [0, 0, 0, 0, 1, 1, 1, 1, 0, -1]
  },
  T6: {
    D0: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    D1: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, -1],
    D2: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    D3: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, -1]
  }
};
exports.setOfBlockArrays = setOfBlockArrays;
},{}],"src/js/tetris/helpers/initBlockObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBlockObject = void 0;
var _tetrisArray = require("../tetrisArray.js");
var _config = require("../config.js");
var _matrix = require("../matrix.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var initBlockObject = function initBlockObject() {
  var setOfBlockObjects = {};
  for (var _i = 0, _Object$entries = Object.entries(_tetrisArray.setOfBlockArrays); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      nameT = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    setOfBlockObjects[nameT] = {};
    var array = value.D0;
    var idx = void 0,
      size = void 0;
    for (idx = 0; array[idx] != -1; idx++);
    for (size = 0; size * size < idx; size++);
    // wallDepth = (size > wallDepth ? size : wallDepth);
    for (var d = 0; d < _config.N_DEGREES; d++) {
      var array2 = new Array(size * size + 1);
      var k = void 0;
      for (k = 0; k < size * size; k++) array2[k] = value["D".concat(d)][k] == 0 ? 0 : 1;
      array2[k] = -1;
      setOfBlockObjects[nameT]["D".concat(d)] = new _matrix.Matrix(size, size, array2);
    }
  }
  return setOfBlockObjects;
};
exports.initBlockObject = initBlockObject;
},{"../tetrisArray.js":"src/js/tetris/tetrisArray.js","../config.js":"src/js/tetris/config.js","../matrix.js":"src/js/tetris/matrix.js"}],"src/js/tetris/tetrisFunc/putTetris.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putTetris = void 0;
var _config = require("../config.js");
var putTetris = function putTetris(tetrisValue) {
  var curTetris = tetrisValue.curTetris;
  for (var top = 0; top < curTetris.matrix.getDy(); top++) for (var left = 0; left < curTetris.matrix.getDx(); left++) {
    if (curTetris.matrix.getArray()[top][left]) {
      // game over if piece has any part offscreen
      if (curTetris.top + top === 0) {
        tetrisValue.state = _config.TETRIS_STATE.Finished;
        return;
      }
      tetrisValue.playField.getArray()[curTetris.top + top][curTetris.left + left] = curTetris.nameT;
    }
  }
};
exports.putTetris = putTetris;
},{"../config.js":"src/js/tetris/config.js"}],"src/js/tetris/tetrisView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tetrisView = exports.showGameOver = exports.SynchronizeTetrisValue = void 0;
var _config = require("./config.js");
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rAF;
var SynTetris;
var tetrisView = function tetrisView() {
  var tetrisValue = SynTetris;
  rAF = requestAnimationFrame(tetrisView);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the playfield
  var playField = tetrisValue.playField;
  for (var top = 0; top < playField.getDy(); top++) {
    for (var left = 0; left < playField.getDx(); left++) {
      if (playField.getArray()[top][left]) {
        var name = playField.getArray()[top][left];
        context.fillStyle = _config.COLORS[name];
        //creates a grid effect
        context.fillRect(left * _config.GRID, top * _config.GRID, _config.GRID - 1, _config.GRID - 1);
      }
    }
  }
  var curTetris = tetrisValue.curTetris;
  context.fillStyle = _config.COLORS[curTetris.nameT];
  for (var _top = 0; _top < curTetris.matrix.getDy(); _top++) {
    for (var _left = 0; _left < curTetris.matrix.getDx(); _left++) {
      if (curTetris.matrix.getArray()[_top][_left]) {
        // drawing 1 px smaller than the grid creates a grid effect
        context.fillRect((curTetris.left + _left) * _config.GRID, (curTetris.top + _top) * _config.GRID, _config.GRID - 1, _config.GRID - 1);
      }
    }
  }
};
exports.tetrisView = tetrisView;
var showGameOver = function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;
  duringGame = false;
  document.querySelector(".button--start").classList.remove("button--active");
  context.fillStyle = "black";
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "36px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
};
exports.showGameOver = showGameOver;
var SynchronizeTetrisValue = function SynchronizeTetrisValue(tetrisValue) {
  SynTetris = tetrisValue;
};
exports.SynchronizeTetrisValue = SynchronizeTetrisValue;
},{"./config.js":"src/js/tetris/config.js"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"node_modules/path-browserify/index.js":[function(require,module,exports) {
var process = require("process");
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"process":"node_modules/process/browser.js"}],"src/js/tetris/tetrisFunc/rotateTetris.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undoRotate = exports.rotate = void 0;
var _config = require("../config.js");
// export const rotate = function (tetrisValue) {
//   const tempTetris = cloneDeep(tetrisValue);
//   const curTetris = tempTetris.curTetris;
//   curTetris.degree = (curTetris.degree + (N_DEGREES - 1)) % N_DEGREES;
//   curTetris.nameD = "D" + curTetris.degree;
//   curTetris.matrix =
//     tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
//   console.log(tempTetris);
//   return tempTetris;
// };
var rotate = function rotate(tetrisValue) {
  var curTetris = tetrisValue.curTetris;
  curTetris.degree = (curTetris.degree + (_config.N_DEGREES + 1)) % _config.N_DEGREES;
  curTetris.nameD = "D" + curTetris.degree;
  curTetris.matrix = tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
};
exports.rotate = rotate;
var undoRotate = function undoRotate(tetrisValue) {
  var curTetris = tetrisValue.curTetris;
  curTetris.degree = (curTetris.degree + (_config.N_DEGREES + 3)) % _config.N_DEGREES;
  curTetris.nameD = "D" + curTetris.degree;
  curTetris.matrix = tetrisValue.setOfBlockObjects[curTetris.nameT][curTetris.nameD];
};
exports.undoRotate = undoRotate;
},{"../config.js":"src/js/tetris/config.js"}],"src/js/tetris/tetrisFunc/isValidMove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidMove = void 0;
var isValidMove = function isValidMove(tetrisValue) {
  var receiveTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var receiveLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var curTetris = tetrisValue.curTetris;
  var playField = tetrisValue.playField;
  var row = receiveTop ? receiveTop : curTetris.top;
  var col = receiveLeft ? receiveLeft : curTetris.left;
  for (var top = 0; top < curTetris.matrix.getDy(); top++) {
    for (var left = 0; left < curTetris.matrix.getDx(); left++) {
      if (
      //check curTetris
      curTetris.matrix.getArray()[top][left] && (
      //outside game bound
      col + left < 0 || col + left >= playField.getDx() || row + top >= playField.getDy() ||
      //collide with another piece
      playField.getArray()[row + top][col + left])) {
        return false;
      }
    }
  }
  return true;
};
exports.isValidMove = isValidMove;
},{}],"src/js/tetris/tetrisFunc/keyAccept.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyAccept = void 0;
var _rotateTetris = require("./rotateTetris.js");
var _isValidMove = require("./isValidMove.js");
var keyAccept = function keyAccept(tetrisValue) {
  var curTetris = tetrisValue.curTetris;
  var key = tetrisValue.key;
  if (key === "a" || key === "d") {
    var col = key === "a" ? curTetris.left - 1 : curTetris.left + 1;
    if ((0, _isValidMove.isValidMove)(tetrisValue, undefined, col)) {
      curTetris.left = col;
    }
  }
  if (key === "w") {
    (0, _rotateTetris.rotate)(tetrisValue);
    if (!(0, _isValidMove.isValidMove)(tetrisValue)) {
      (0, _rotateTetris.undoRotate)(tetrisValue);
    }
  }
  if (key === "s") {
    var row = curTetris.top + 1;
    if (!(0, _isValidMove.isValidMove)(tetrisValue, row)) {
      tetrisValue.touchDown = true;
    } else {
      curTetris.top = row;
    }
  }
  if (key === " ") {
    //make new
  }
};
exports.keyAccept = keyAccept;
},{"./rotateTetris.js":"src/js/tetris/tetrisFunc/rotateTetris.js","./isValidMove.js":"src/js/tetris/tetrisFunc/isValidMove.js"}],"src/js/tetris/tetrisFunc/deleteFullLines.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFullLines = void 0;
var _config = require("../config.js");
var _matrix = require("../matrix.js");
var deleteFullLines = function deleteFullLines(tetrisValue) {
  var playField = tetrisValue.playField;
  var tempMatrix = new _matrix.Matrix(1, _config.SET_PLAY_FIELD_X);
  for (var row = playField.getDy() - 1; row >= 0;) {
    if (playField.getArray()[row].every(function (cell) {
      return !!cell;
    })) {
      var clipedField = playField.clip(0, 0, row, this._playfieldSizeX - 1);
      playField.paste(clipedField, 1, 0);
      playField.paste(tempMatrix, 0, 0);
    } else {
      row--;
    }
  }
};
exports.deleteFullLines = deleteFullLines;
},{"../config.js":"src/js/tetris/config.js","../matrix.js":"src/js/tetris/matrix.js"}],"src/js/tetris/tetrisController.js":[function(require,module,exports) {
var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tetris = void 0;
var _config = require("./config.js");
var _matrix = require("./matrix.js");
var _generateRandomTetris = require("./tetrisFunc/generateRandomTetris.js");
var _initBlockObject = require("./helpers/initBlockObject.js");
var _putTetris = require("./tetrisFunc/putTetris.js");
var _tetrisView = require("./tetrisView.js");
var _path = require("path");
var _process = require("process");
var _keyAccept = require("./tetrisFunc/keyAccept.js");
var _deleteFullLines = require("./tetrisFunc/deleteFullLines.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tetris = /*#__PURE__*/function () {
  function Tetris() {
    _classCallCheck(this, Tetris);
    _defineProperty(this, "tetrisValue", {
      key: undefined,
      gameMode: _config.GAME_MODE.normalMode,
      setOfBlockObjects: (0, _initBlockObject.initBlockObject)(),
      state: _config.TETRIS_STATE.NewBlock,
      playField: new _matrix.Matrix(_config.SET_PLAY_FIELD_Y, _config.SET_PLAY_FIELD_X),
      touchDown: false,
      gameOver: false
    });
    this.tetrisValue.curTetris = (0, _generateRandomTetris.generateRandomTetris)(this.tetrisValue);
  }
  _createClass(Tetris, [{
    key: "_waitForKeyPress",
    value: function _waitForKeyPress() {
      return new Promise(function (resolve) {
        function handleKeyPress(e) {
          window.removeEventListener("keydown", handleKeyPress);
          resolve(e.key);
        }
        window.addEventListener("keydown", handleKeyPress);
      });
    }
  }, {
    key: "tetrisMainMethod",
    value: function () {
      var _tetrisMainMethod = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
            case 1:
              if (this.tetrisValue.gameOver) {
                _context.next = 22;
                break;
              }
              if (!(this.tetrisValue.state === _config.TETRIS_STATE.Finished)) {
                _context.next = 5;
                break;
              }
              this.tetrisValue.gameOver = true;
              return _context.abrupt("break", 22);
            case 5:
              if (this.tetrisValue.state === _config.TETRIS_STATE.NewBlock) {
                this.tetrisValue.state = _config.TETRIS_STATE.Running;
                this.tetrisValue.curTetris = (0, _generateRandomTetris.generateRandomTetris)(this.tetrisValue);
                this.tetrisValue.touchDown = false;
              }
              if (!(this.tetrisValue.state === _config.TETRIS_STATE.Running)) {
                _context.next = 20;
                break;
              }
              _context.next = 9;
              return this._waitForKeyPress();
            case 9:
              this.tetrisValue.key = _context.sent;
              (0, _keyAccept.keyAccept)(this.tetrisValue);
              if (!this.tetrisValue.touchDown) {
                _context.next = 20;
                break;
              }
              (0, _putTetris.putTetris)(this.tetrisValue);
              if (!(this.tetrisValue.state === _config.TETRIS_STATE.Finished)) {
                _context.next = 17;
                break;
              }
              return _context.abrupt("continue", 1);
            case 17:
              this.tetrisValue.state = _config.TETRIS_STATE.NewBlock;
              (0, _deleteFullLines.deleteFullLines)(this.tetrisValue);
              return _context.abrupt("continue", 1);
            case 20:
              _context.next = 1;
              break;
            case 22:
              if (this.tetrisValue.gameOver) {
                (0, _tetrisView.showGameOver)();
              }
              _context.next = 28;
              break;
            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 25]]);
      }));
      function tetrisMainMethod() {
        return _tetrisMainMethod.apply(this, arguments);
      }
      return tetrisMainMethod;
    }()
  }, {
    key: "tetrisInit",
    value: function tetrisInit() {
      this.tetrisMainMethod();
      (0, _tetrisView.SynchronizeTetrisValue)(this.tetrisValue);
      (0, _tetrisView.tetrisView)();
    }
  }]);
  return Tetris;
}();
exports.Tetris = Tetris;
},{"./config.js":"src/js/tetris/config.js","./matrix.js":"src/js/tetris/matrix.js","./tetrisFunc/generateRandomTetris.js":"src/js/tetris/tetrisFunc/generateRandomTetris.js","./helpers/initBlockObject.js":"src/js/tetris/helpers/initBlockObject.js","./tetrisFunc/putTetris.js":"src/js/tetris/tetrisFunc/putTetris.js","./tetrisView.js":"src/js/tetris/tetrisView.js","path":"node_modules/path-browserify/index.js","process":"node_modules/process/browser.js","./tetrisFunc/keyAccept.js":"src/js/tetris/tetrisFunc/keyAccept.js","./tetrisFunc/deleteFullLines.js":"src/js/tetris/tetrisFunc/deleteFullLines.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51713" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/tetris/tetrisController.js"], null)
//# sourceMappingURL=/tetrisController.2756b4ab.js.map