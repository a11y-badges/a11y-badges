const { getBadge } = require('../badge/generator');
const fs = require('fs');
const b64Logos = require('./badge-refs/base64-logos');

const dataImagePrefix = 'data:image/svg+xml;base64,';

describe('the badges', () => {

  it('renders badges correctly', () => {

    const b1 = getBadge({ logo: 'ibm' });
    expect(b1).withContext('simple icon badge is correct').toBe(fs.readFileSync('./spec/badge-refs/ibm.svg', 'utf8'));

    const b2 = getBadge({ logo: 'check-square', text: 'a11y badges', badgeColor: 'green' });
    expect(b2).withContext('feather icon badge is correct').toBe(fs.readFileSync('./spec/badge-refs/a11y-badges.svg', 'utf8'));

    const b3 = getBadge({ logo: 'github', logoColor: 'skyblue' });
    expect(b3).withContext('html color badge is correct').toBe(fs.readFileSync('./spec/badge-refs/github.svg', 'utf8'));

    const b4 = getBadge({ text: 'Liverpool FC is the best football club in the world!', badgeColor: 'C8102E' });
    expect(b4).withContext('hex color badge is correct').toBe(fs.readFileSync('./spec/badge-refs/liverpool-fc.svg', 'utf8'));

    const b5 = getBadge({ badgeColor: 'rgb(0,255,0)' });
    expect(b5).withContext('rgb color badge is correct').toBe(fs.readFileSync('./spec/badge-refs/rgb.svg', 'utf8'));

    const b6 = getBadge({ badgeColor: 'rgba(127,212,190,0.46)' });
    expect(b6).withContext('rgba color badge is correct').toBe(fs.readFileSync('./spec/badge-refs/rgba.svg', 'utf8'));

    const b7 = getBadge({ logo: dataImagePrefix + b64Logos.afterburner });
    expect(b7).withContext('afterburner badge is correct').toBe(fs.readFileSync('./spec/badge-refs/afterburner.svg', 'utf8'));

    const b8 = getBadge({ logo: dataImagePrefix + b64Logos.openjsf });
    expect(b8).withContext('openjsf badge is correct').toBe(fs.readFileSync('./spec/badge-refs/openjsf.svg', 'utf8'));

    const b9 = getBadge({ logo: dataImagePrefix + b64Logos.tc39 });
    expect(b9).withContext('tc39 badge is correct').toBe(fs.readFileSync('./spec/badge-refs/tc39.svg', 'utf8'));

    const b10 = getBadge({ logo: dataImagePrefix + b64Logos.whatwg });
    expect(b10).withContext('whatwg badge is correct').toBe(fs.readFileSync('./spec/badge-refs/whatwg.svg', 'utf8'));

    const b11 = getBadge({
      badgeColor: 'darkgreen',
      logo: dataImagePrefix + b64Logos.afterburner,
      logoColor: 'lightblue',
      text: 'afterburner js',
      textColor: 'lightgrey',
    });
    expect(b11).withContext('all fields badge is correct').toBe(fs.readFileSync('./spec/badge-refs/all-the-fields.svg', 'utf8'));

  });

});
