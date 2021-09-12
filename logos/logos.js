const fs = require('fs');

module.exports = {
  afterburner: getLogo('afterburner'),
};

function getLogo(name) {
  return fs.readFileSync(`./logos/files/${name}.svg`, { encoding: 'utf-8', flag: 'r' });
}

