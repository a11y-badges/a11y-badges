const simpleIcons = require('simple-icons');
const fs = require('fs');
const { getBadge, renderSVG } = require('./badge/generator');
const { optimize } = require('svgo');
const { afterburner: afterburnerLogo } = require('./logos/logos'); // eslint-disable-line no-unused-vars

// writeTestBadge(null, afterburnerLogo, null, 'afterburner');
// writeTestBadge(null, 'ibm', null, 'a11y badges');

function writeTestBadge(badgeColor, logo, logoColor, text, textColor) { // eslint-disable-line no-unused-vars

  const svgDir = './svgs';

  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir);
  }

  fs.writeFileSync(`${svgDir}/testBadge.svg`, getBadge(badgeColor, logo, logoColor, text, textColor));

}

function writeAllSimpleIconSVGsToDisk() { // eslint-disable-line no-unused-vars

  const svgDir = './svgs';

  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir);
  }

  for (const slug of Object.keys(simpleIcons)) {

    const icon = simpleIcons.Get(slug);

    console.debug(`generating: ${icon.slug}`);

    fs.writeFileSync(`${svgDir}/${icon.slug}.svg`, renderSVG(`#${icon.hex}`, icon.svg, icon.path, null, icon.title, null));

  }

}

function optimizeSVG(svg, { filename, returnEncoded }) { // eslint-disable-line no-unused-vars

  let optimizedSVG;

  if (svg.startsWith('<svg')) {
    optimizedSVG = optimize(svg);
  }
  else {
    const svgParts = svg.split(',');
    const decoded = Buffer.from(svgParts[1], 'base64').toString('utf-8');
    optimizedSVG = optimize(decoded);
  }

  optimizedSVG = optimizedSVG.data;

  if (filename) {

    const svgDir = './svgs';

    if (!fs.existsSync(svgDir)) {
      fs.mkdirSync(svgDir);
    }

    fs.writeFileSync(`${svgDir}/${filename}.svg`, optimizedSVG);

  }

  // console.log(optimizedSVG);
  // return;

  if (returnEncoded) {
    return Buffer.from(optimizedSVG, 'utf-8').toString('base64');
  }

  return optimizedSVG;
}
