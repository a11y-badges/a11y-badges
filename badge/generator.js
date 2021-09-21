/* eslint-disable max-lines */

const contrast = require('get-contrast');
const simpleIcons = require('simple-icons');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { optimize } = require('svgo');
const feather = require('feather-icons');
const txml = require('txml');

const defaultBadgeColor = 'dimgrey';

module.exports = {
  getBadge,
  renderSVG,
};

function getBadge({ badgeColor, label, labelColor, logo, logoColor, text, textColor } = {}) { // eslint-disable-line complexity

  let useBadgeColor, useLogo, icon;
  let useLogoPath = '';
  let useText = text;

  const { badgeColorIsValid, color } = getBadgeColor(badgeColor);

  if (label && !badgeColor) {
    // make sure the left and right sides don't have the same background color
    useBadgeColor = 'green';
  }
  else {
    useBadgeColor = color;
  }

  if (logo) {

    if (logo.startsWith('data:image') || logo.startsWith('<svg')) {
      useLogo = logo;
    }
    else {

      icon = simpleIcons.Get(logo);

      // first look for simple-icon
      if (icon) {
        useBadgeColor = badgeColor && badgeColorIsValid ? useBadgeColor : `#${icon.hex}`;
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

  const svg = renderSVG({ badgeColor: useBadgeColor, label, labelColor, logo: useLogo, logoPath: useLogoPath, logoColor, text: useText, textColor });

  // console.debug(svg);

  return svg;

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

function renderSVG({ badgeColor, label, labelColor, logo, logoColor, logoPath, text = '', textColor }) {

  const window = createSVGWindow();
  const { document } = window;
  registerWindow(window, document);

  const badgeHeight = 32;
  const sidePadding = 11;

  let logoTextMargin = sidePadding;

  let leftWidth = 0;
  let rightWidth = 0;

  let bgLeft, logoBackgroundColor, logoElement;

  const canvas = SVG(document.documentElement);
  // console.debug(`renderedLogoHeight before transform: ${renderedLogoHeight}`);

  const hasLabel = typeof label === 'string';

  if (hasLabel) {
    bgLeft = canvas.group();
  }

  const bgRight = canvas.group();

  if (hasLabel) {
    // logo is going on the label rect and the label background is always the default grey
    logoBackgroundColor = defaultBadgeColor;
  }
  else {
    logoBackgroundColor = badgeColor;
  }

  // if label has value
  // build rect/badge like normal, allow all params except can't change left side badge color
  // can specify labelColor and logoColor, but they are subject to the usual contrast check

  // then, iff text has value
  // build 2nd rect with no logo, following existing logic

  if (typeof logo === 'string') {
    logoElement = addLogo(canvas, logo, logoPath, logoBackgroundColor, logoColor, sidePadding);
  }

  const renderedLogoWidth = logoElement ? logoElement.rbox().width : 0;

  if (renderedLogoWidth === 0) {
    logoTextMargin = 0;
  }

  let leftTextWidth = 0;
  let rightTextWidth = 0;

  if (hasLabel) {

    leftTextWidth = addText(canvas, label, labelColor, defaultBadgeColor, sidePadding, renderedLogoWidth, logoTextMargin);

    leftWidth = sidePadding + renderedLogoWidth + logoTextMargin + leftTextWidth + sidePadding;
    logoTextMargin = leftWidth;

    bgLeft // bg (left side)
      .rect(leftWidth, badgeHeight)
      .fill(defaultBadgeColor);

    // pass 0 for renderedLogoWidth because we already account for it in logoTextMargin
    rightTextWidth = addText(canvas, text, textColor, badgeColor, sidePadding, 0, logoTextMargin);
    rightWidth = sidePadding + rightTextWidth + sidePadding;
  }
  else {
    rightTextWidth = addText(canvas, text, textColor, badgeColor, sidePadding, renderedLogoWidth, logoTextMargin);
    rightWidth = sidePadding + renderedLogoWidth + logoTextMargin + rightTextWidth + sidePadding;
  }

  // const badgeWidth = leftWidth + rightWidth;
  // console.debug(badgeWidth);
  // canvas.width(badgeWidth).height(badgeHeight);

  bgRight.group() // bg (right side)
    .rect(rightWidth, badgeHeight)
    .fill(badgeColor);

  if (hasLabel) {
    bgRight.move(leftWidth);
  }

  return optimize(canvas.svg()).data;

}

function addLogo(canvas, logo, logoPath, badgeColor, logoColor, sidePadding) {

  const logoWidth = 32;
  const normalizationTarget = 27;

  const gLogo = canvas.group();

  const renderedPath = canvas
    .path(logoPath)
    .height(logoWidth)
    .width(logoWidth);

  const renderedPathY = renderedPath.bbox().y;
  const renderedLogoHeight = 32 - Math.max(0, Math.round(renderedPathY));
  const dimensionalAdjustment = -((renderedLogoHeight - normalizationTarget) * 2);

  renderedPath.remove();

  let decodedLogo;

  if (logo.startsWith('<svg')) {
    decodedLogo = logo;
  }
  else {

    const logoParts = logo.split(',');

    try {
      decodedLogo = Buffer.from(logoParts[1], 'base64').toString('utf-8');
    }
    catch (error) {
      return null;
    }

  }

  const modifiedLogo = setLogoColor(badgeColor, logoColor, decodedLogo);

  const logoElement = gLogo.image(`data:image/svg+xml;base64,${Buffer.from(modifiedLogo, 'utf-8').toString('base64')}`);

  logoElement
    .height(logoWidth + dimensionalAdjustment)
    .width(logoWidth + dimensionalAdjustment)
    .move(sidePadding, -dimensionalAdjustment / 2);

  return logoElement;

}

function setLogoColor(badgeColor, logoColor, decodedLogo) {

  const logoColorFill = getFillColor(badgeColor, logoColor);

  const xml = txml.parse(decodedLogo);
  const [svg] = xml;

  let applyColorToRootElement = !svg.attributes.fill || svg.attributes.fill !== 'none';

  if (svg.attributes.fill && svg.attributes.fill === 'none' && svg.attributes.stroke) {
    applyColorToRootElement = false;
    svg.attributes.stroke = logoColorFill;
  }

  if (applyColorToRootElement) {
    svg.attributes.color = logoColorFill;
    svg.attributes.fill = logoColorFill;
  }

  for (const e of svg.children) {

    if (e.attributes.fill) {

      if (e.attributes.stroke && e.attributes.fill === 'none') {
        e.attributes.stroke = logoColorFill;
      }
      else {
        e.attributes.fill = logoColorFill;
      }

    }

  }

  return txml.stringify(xml);

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
