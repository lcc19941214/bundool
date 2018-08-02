const fs = require('fs');
const babelParser = require('@babel/parser');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

let ID = 0;

function createAsset (filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  // 语法解析
  const ast = babelParser.parse(content, {
    sourceType: 'module'
  });

  // 查找依赖
  const deps = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    }
  });

  // 语法转义
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env']
  });

  return {
    id: ID++,
    filename,
    code,
    deps,
    mapping: {}
  };
}

module.exports = createAsset;
