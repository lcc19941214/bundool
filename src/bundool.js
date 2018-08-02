const fs = require('fs');
const path = require('path');
const mainCodePath = path.resolve(__dirname, './template.js');
const mainCode = fs.readFileSync(mainCodePath, 'utf-8');

function bundool (graph) {
  let modules = '';

  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`;
  });
  const output = `
    (function(modules) {
      ${mainCode}
    })({${modules}})
  `;
  return output;
}

module.exports = bundool;
