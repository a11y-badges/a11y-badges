const contrast = require('get-contrast');
const simpleIcons = require('simple-icons');
const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { optimize } = require('svgo');

for (const slug of Object.keys(simpleIcons)) {

  const icon = simpleIcons.Get(slug);
  // const icon = simpleIcons.Get('ibm');
  // const icon = simpleIcons.Get('openapiinitiative');

  console.debug(`generating: ${slug}`);

  fs.writeFileSync(`./svgs/${icon.slug}.svg`, renderSVG(`#${icon.hex}`, icon.svg, icon.path, icon.title));
  // break;
}

function getFillColor(badgeColor, fillColor) {

  if (fillColor && contrast.isAccessible(badgeColor, fillColor)) {
    return fillColor;
  }

  let fill = '#000';

  if (contrast.isAccessible(badgeColor, fill)) {
    return fill;
  }

  fill = '#fff';

  return fill;

}

function renderSVG(badgeColor, logo, path, text, fillColor) {

  const window = createSVGWindow();
  const { document } = window;
  registerWindow(window, document);

  const fontSize = 16;
  const textOffset = 4;
  const logoWidth = 32;
  const badgeHeight = 32;
  const sidePadding = 11;
  const logoTextMargin = sidePadding * 2;
  const fill = getFillColor(badgeColor, fillColor);
  const normalizationTarget = 27;

  const canvas = SVG(document.documentElement);

  const renderedPath = canvas
    .path(path)
    .height(logoWidth)
    .width(logoWidth);

  const renderedPathY = renderedPath.bbox().y;
  const renderedLogoHeight = 32 - Math.max(0, Math.round(renderedPathY));
  const dimensionalAdjustment = -((renderedLogoHeight - normalizationTarget) * 2);

  // console.debug(`renderedLogoHeight before transform: ${renderedLogoHeight}`);

  const gbackground = canvas.group();
  const gLogo = canvas.group()
    .fill(fill);

  // fragile, but should avoid the need for full-on xml parsing...
  const svgText = `<svg fill="${fill}" ${logo.slice(5)}`;

  const base64Logo = Buffer.from(svgText, 'utf-8').toString('base64');
  const logoElement = gLogo.image(`data:image/svg+xml;base64,${base64Logo}`);

  // const utf8SVG = Buffer.from(svgText, 'utf-8').toString();
  // const logoElement = group.image(`data:image/svg+xml;utf8,${utf8SVG}`);
  // const logoElement = group.path(path);

  logoElement
    .height(logoWidth + dimensionalAdjustment)
    .width(logoWidth + dimensionalAdjustment)
    .move(sidePadding, -dimensionalAdjustment / 2);

  const renderedLogoWidth = logoElement.rbox().width;

  const textWidth = text.length * 12;

  const gText = canvas.group();

  gText
    .fill(fill)
    .plain(text.toUpperCase())
    .attr('textLength', textWidth)
    .font({
      family: 'Verdana,Geneva,DejaVu Sans,sans-serif',
      size: fontSize,
      anchor: 'start',
      weight: '600'
    })
    .move(sidePadding + renderedLogoWidth + logoTextMargin, textOffset);

  const badgeWidth = sidePadding + renderedLogoWidth + logoTextMargin + textWidth + sidePadding;

  canvas.width(badgeWidth).height(badgeHeight);

  gbackground
    .rect(badgeWidth, badgeHeight)
    .fill(badgeColor);

  const optimizedSVG = optimize(canvas.svg());

  return optimizedSVG.data;

}
