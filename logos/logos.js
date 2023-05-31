import fs from 'fs';

export const afterburnerLogo = getLogo('afterburner');

function getLogo(name) {
  return fs.readFileSync(`./logos/files/${name}.svg`, { encoding: 'utf-8', flag: 'r' });
}

