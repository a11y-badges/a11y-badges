const contrast = require('get-contrast');
const simpleIcons = require('simple-icons');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { optimize } = require('svgo');

const defaultBadgeColor = 'dimgrey';

module.exports = {
  getBadge,
  renderSVG,
};

function getBadge(badgeColor, logo, logoColor, text, textColor) {

  let useBadgeColor = badgeColor;
  let useLogo = logo;
  let useLogoPath = '';
  let useText = text;

  const useLogoColor = logoColor;
  const useTextColor = textColor;

  if (useLogo && !useLogo.startsWith('data:image') && !useLogo.startsWith('<svg')) {

    const icon = simpleIcons.Get(logo);

    useBadgeColor = useBadgeColor || `#${icon.hex}`;
    useLogo = icon.svg;
    useLogoPath = icon.path;
    useText = useText || icon.title;

  }

  useBadgeColor = useBadgeColor || defaultBadgeColor;

  console.debug(`generating badge: ${useText}`);

  return renderSVG(useBadgeColor, useLogo, useLogoPath, useLogoColor, useText, useTextColor);
}

function renderSVG(badgeColor, logo, logoPath, logoColor, text = '', textColor) {

  const window = createSVGWindow();
  const { document } = window;
  registerWindow(window, document);

  const badgeHeight = 32;
  const sidePadding = 11;

  let logoTextMargin = sidePadding;

  const canvas = SVG(document.documentElement);
  // console.debug(`renderedLogoHeight before transform: ${renderedLogoHeight}`);

  const gbackground = canvas.group();

  let logoElement;

  if (typeof logo === 'string') {
    logoElement = addLogo(canvas, logo, logoPath, badgeColor, logoColor, sidePadding);
  }

  const renderedLogoWidth = logoElement ? logoElement.rbox().width : 0;

  if (renderedLogoWidth === 0) {
    logoTextMargin = 0;
  }

  let textWidth = 0;

  if (text) {
    textWidth = addText(canvas, text, textColor, badgeColor, sidePadding, renderedLogoWidth, logoTextMargin);
  }

  const badgeWidth = sidePadding + renderedLogoWidth + logoTextMargin + textWidth + sidePadding;

  canvas.width(badgeWidth).height(badgeHeight);

  gbackground
    .rect(badgeWidth, badgeHeight)
    .fill(badgeColor);

  const optimizedSVG = optimize(canvas.svg());

  return optimizedSVG.data;

}

function addLogo(canvas, logo, logoPath, badgeColor, logoColor, sidePadding) {

  const logoWidth = 32;
  const normalizationTarget = 27;
  const logoColorFill = getFillColor(badgeColor, logoColor);

  let decodedLogo;

  const gLogo = canvas.group();

  const renderedPath = canvas
    .path(logoPath)
    .height(logoWidth)
    .width(logoWidth);

  const renderedPathY = renderedPath.bbox().y;
  const renderedLogoHeight = 32 - Math.max(0, Math.round(renderedPathY));
  const dimensionalAdjustment = -((renderedLogoHeight - normalizationTarget) * 2);

  renderedPath.remove();

  if (logo.startsWith('<svg')) {
    decodedLogo = logo;
  }
  else {
    const logoParts = logo.split(',');
    decodedLogo = Buffer.from(logoParts[1], 'base64').toString('utf-8');
  }

  const fillReplacedLogo = decodedLogo.replace(/fill="[^"]*"/g, `fill="${logoColorFill}"`);
  const logoElement = gLogo.image(`data:image/svg+xml;base64,${Buffer.from(fillReplacedLogo, 'utf-8').toString('base64')}`);

  // const utf8SVG = Buffer.from(svgText, 'utf-8').toString();
  // const logoElement = gLogo.image(`data:image/svg+xml;utf8,${utf8SVG}`);
  // const logoElement = gLogo.path(path);

  logoElement
    .height(logoWidth + dimensionalAdjustment)
    .width(logoWidth + dimensionalAdjustment)
    .move(sidePadding, -dimensionalAdjustment / 2);

  return logoElement;

}

// eslint-disable-next-line max-params
function addText(canvas, text, textColor, badgeColor, sidePadding, renderedLogoWidth, logoTextMargin) {

  const textColorFill = getFillColor(badgeColor, textColor);
  const letterSpacing = 13.5;
  const fontSize = 16;
  const textOffset = 4;

  const textWidth = text ? text.length * letterSpacing : 0;

  const gText = canvas.group();

  gText
    .fill(textColorFill)
    .plain(text.toUpperCase())
    .attr('textLength', textWidth)
    .font({
      family: 'Verdana,Geneva,DejaVu Sans,sans-serif',
      size: fontSize,
      anchor: 'start',
      weight: '600'
    })
    .move(sidePadding + renderedLogoWidth + logoTextMargin, textOffset);

  return textWidth;

}

function getFillColor(badgeColor, fillColor) {

  if (fillColor) {
    try {
      if (fillColor && contrast.isAccessible(badgeColor, fillColor)) {
        return fillColor;
      }

      console.debug(`color '${fillColor}' does not have enough contrast for badge color: ${badgeColor}`);

    }
    catch (error) {
      console.debug(`invalid color: ${fillColor}`);
    // got a bad color
    }

  }

  let fill = '#000';

  if (contrast.isAccessible(badgeColor, fill)) {
    return fill;
  }

  fill = '#fff';

  return fill;

}
