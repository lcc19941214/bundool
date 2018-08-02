const fs = require('fs');
const util = require('util');

const [readFile, writeFile] = [fs.readFile, fs.writeFile].map(util.promisify);

module.exports = {
  ...fs,
  readFile,
  writeFile
};
