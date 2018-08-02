const path = require('path');
const createAsset = require('./createAsset');
const { checkExtNameLoop } = require('./helper/extensions');

const cache = new Set();

function throwENOENTError (filename, tracks) {
  throw new Error(
    [
      `ENOENT: no such file or directory: ${filename}`,
      '[tracks]: auto complete extensions',
      ...tracks
    ].join('\n')
  );
}

function createGraph (entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    cache.add(asset.filename);
    const dirname = path.dirname(asset.filename);
    asset.deps.forEach(filename => {
      const rawName = path.resolve(dirname, filename);
      const { filename: absoluteFilePath, tracks, isNodeModule } = checkExtNameLoop(rawName);

      if (isNodeModule) return;

      if (absoluteFilePath) {
        let depAsset;
        const hasCache = cache.has(absoluteFilePath);
        depAsset = hasCache
          ? queue.find(v => v.filename === absoluteFilePath)
          : createAsset(absoluteFilePath);
        asset.mapping[filename] = depAsset.id;

        if (!hasCache) {
          queue.push(depAsset);
        }
      } else {
        throwENOENTError(rawName, tracks);
      }
    });
  }

  return queue;
}

module.exports = createGraph;
