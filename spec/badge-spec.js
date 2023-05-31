import { getBadge } from '../badge/generator.js';
import b64Logos from './badge-refs/base64-logos.js';
import looksSame from 'looks-same';

const dataImagePrefix = 'data:image/svg+xml;base64,';

describe('the badges', () => {

  it('renders badges correctly', async() => {

    let b, samesame;

    b = getBadge({ logo: 'ibm' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/ibm.svg')).equal;
    expect(samesame).withContext('simple icon badge is correct').toBeTrue();

    b = getBadge({ logo: 'check-square', text: 'a11y badges', badgeColor: 'green' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/a11y-badges.svg')).equal;
    expect(samesame).withContext('feather icon badge is correct').toBeTrue();

    b = getBadge({ logo: 'github', logoColor: 'skyblue' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/github.svg')).equal;
    expect(samesame).withContext('html color badge is correct').toBeTrue();

    b = getBadge({ text: 'Liverpool FC is the best football club in the world!', badgeColor: 'C8102E' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/liverpool-fc.svg')).equal;
    expect(samesame).withContext('hex color badge is correct').toBeTrue();

    b = getBadge({ badgeColor: 'rgb(0,255,0)' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/rgb.svg')).equal;
    expect(samesame).withContext('rgb color badge is correct').toBeTrue();

    b = getBadge({ badgeColor: 'rgba(127,212,190,0.46)' });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/rgba.svg')).equal;
    expect(samesame).withContext('rgba color badge is correct').toBeTrue();

    b = getBadge({ logo: dataImagePrefix + b64Logos.afterburner });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/afterburner.svg')).equal;
    expect(samesame).withContext('afterburner badge is correct').toBeTrue();

    b = getBadge({ logo: dataImagePrefix + b64Logos.openjsf });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/openjsf.svg')).equal;
    expect(samesame).withContext('openjsf badge is correct').toBeTrue();

    b = getBadge({ logo: dataImagePrefix + b64Logos.tc39 });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/tc39.svg')).equal;
    expect(samesame).withContext('tc39 badge is correct').toBeTrue();

    b = getBadge({ logo: dataImagePrefix + b64Logos.whatwg });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/whatwg.svg')).equal;
    expect(samesame).withContext('whatwg badge is correct').toBeTrue();

    b = getBadge({
      badgeColor: 'darkgreen',
      logo: dataImagePrefix + b64Logos.afterburner,
      logoColor: 'lightblue',
      text: 'afterburner js',
      textColor: 'lightgrey',
    });
    samesame = (await looksSame(Buffer.from(b), './spec/badge-refs/all-the-fields.svg')).equal;
    expect(samesame).withContext('all fields badge is correct').toBeTrue();

  });

});
