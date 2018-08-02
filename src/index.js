const bundool = require('./bundool');
const createGraph = require('./createGraph');

function bundle (filename) {
  const graph = createGraph(filename);
  const content = bundool(graph);
  return content;
}

module.exports = bundle;
