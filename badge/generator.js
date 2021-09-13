const contrast = require('get-contrast');
const simpleIcons = require('simple-icons');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { optimize } = require('svgo');
const feather = require('feather-icons');

const defaultBadgeColor = 'dimgrey';

module.exports = {
  getBadge,
  renderSVG,
};

function getBadge(badgeColor, logo, logoColor, text, textColor) {

  let useBadgeColor, useLogo, icon;
  let useLogoPath = '';
  let useText = text;

  const useLogoColor = logoColor;
  const useTextColor = textColor;

  const { badgeColorIsValid, color } = getBadgeColor(badgeColor);

  useBadgeColor = color;

  if (logo) {

    if (logo.startsWith('data:image') || logo.startsWith('<svg')) {
      useLogo = logo;
    }
    else {

      icon = simpleIcons.Get(logo);

      // first look for simple-icon
      if (icon) {
        useBadgeColor = badgeColorIsValid ? useBadgeColor : `#${icon.hex}`;
        useLogo = icon.svg;
        useLogoPath = icon.path;
        useText = useText || icon.title;
      }
      // then look for feather icon
      else {

        icon = feather.icons[logo];

        if (icon) { useLogo = icon.toSvg({ 'stroke-width': 2.5 }); }

      }

    }

  }

  console.debug(`generating badge: ${useText}`);

  return renderSVG(useBadgeColor, useLogo, useLogoPath, useLogoColor, useText, useTextColor);
}

function normalizeColor(color) {

  let rColor = color.trim();

  const reHex = /^#?(?:[0-9a-fA-F]{3}){1,2}$/;

  if (color.match(reHex) && !color.startsWith('#')) {
    rColor = `#${color}`;
  }

  return rColor;

}

function getBadgeColor(badgeColor) {

  let color;

  if (badgeColor) {

    color = normalizeColor(badgeColor);

    try {
      // check if badge color is valid
      contrast.isAccessible(color, defaultBadgeColor);
      return { badgeColorIsValid: true, color };
    }
    catch (error) {
      // Liverpool FC is the best football club in the world! ⚽
    }
  }

  return { badgeColorIsValid: false, color: defaultBadgeColor };

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

  let decodedLogo, fillReplacedLogo;

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

  // duck type the svg
  if (decodedLogo.match(/fill="(?!none)[^"]*"/)) {
    // looks like a custom svg
    fillReplacedLogo = decodedLogo.replace(/fill="[^"]*"/g, `fill="${logoColorFill}"`);
  }
  else if (decodedLogo.match(/fill="none"/)) {
    // looks like a feather icon
    fillReplacedLogo = decodedLogo.replace(/<svg/, `<svg color="${logoColorFill}"`);
  }
  else {
    // looks like a simple icon
    fillReplacedLogo = decodedLogo.replace(/<svg/, `<svg fill="${logoColorFill}"`);
  }

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

  let fill;

  if (fillColor) {

    fill = normalizeColor(fillColor);

    try {

      if (contrast.isAccessible(badgeColor, fill)) {
        return fill;
      }

      // not enough contrast

    }
    catch (error) {
      // invalid color
    }

  }

  fill = '#000';

  if (contrast.isAccessible(badgeColor, fill)) {
    return fill;
  }

  fill = '#fff';

  return fill;

}
