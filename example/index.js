const path = require('path');
const fs = require('fs');
const bundool = require('../src/');

const content = bundool(path.join(__dirname, '../example/entry.js'));
fs.writeFileSync(path.resolve(__dirname, './output.js'), content, 'utf-8');
