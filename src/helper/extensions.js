const fs = require('fs');
const path = require('path');
const defaultExtensions = ['.js', '.json'];

function checkExtNameLoop (name, extensions = defaultExtensions) {
  let filename = name;
  const tracks = [];
  const extname = path.extname(name);

  if (!extname) {
    const len = extensions.length;
    for (let idx = 0; idx < len; idx++) {
      const ext = extensions[idx];
      filename = `${name}${ext}`;
      try {
        fs.accessSync(filename);
        break;
      } catch (error) {
        if (error.code === 'ENOENT') {
          tracks.push(filename);

          if (idx === len - 1) {
            filename = undefined;
          }
          continue;
        }
      }
    }
  }

  return {
    filename,
    tracks
  };
}

module.exports = { checkExtNameLoop };
