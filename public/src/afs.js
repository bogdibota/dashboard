const fs = require('fs');

module.exports = {
  mkdir: async (folder) => {
    return new Promise((resolve, reject) => fs.mkdir(
      folder,
      {recursive: true},
      (err) => err && err.code !== 'EEXIST' ? reject(err) : resolve(),
    ));
  },
  writeFile: async (file, data) => {
    return new Promise((resolve, reject) => fs.writeFile(
      file,
      data,
      (err) => err ? reject(err) : resolve(),
    ));
  },
};
