const path = require('path');

// @see https://github.com/lorenwest/node-config/wiki/Configuration-Files
module.exports = {
  publicDir: path.join(process.cwd(), 'public')
};
