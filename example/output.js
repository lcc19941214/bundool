
    (function(modules) {
      const cache = {};

function require (id) {
  if (cache[id]) {
    return cache[id];
  }

  const [fn, mapping] = modules[id];

  function innerRequire (name) {
    return require(mapping[name]);
  }

  const module = (cache[id] = { exports: {} });
  fn(innerRequire, module, module.exports);
  return module.exports;
}

require(0);

    })({0: [
      function (require, module, exports) {
        "use strict";

var _b = require("./b");

var _b2 = _interopRequireDefault(_b);

var _name = require("./name.js");

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_name2.default);
console.log(_b2.default);
(0, _name.say)();
      },
      {"./b":1,"./name.js":2}
    ],1: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  b: 1
};
      },
      {}
    ],2: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = undefined;

var _b = require("./b");

var _b2 = _interopRequireDefault(_b);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'hello';

var say = exports.say = function say() {
  console.log(_b2.default);
  console.log(name);
};

exports.default = name;
      },
      {"./b":1}
    ],})
  