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
