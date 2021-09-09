const contrast = require('get-contrast');
const simpleIcons = require('simple-icons');
const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { optimize } = require('svgo');

module.exports = {
  getBadge,
  writeAllSimpleIconSVGsToDisk,
  writeTestBadge,
};

// eslint-disable-next-line no-unused-vars
const afterburnerLogo = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgaWQ9InN2ZyIgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB2aWV3Qm94PSIwIDAgOTM5LjAwMDAwMCAxMjgwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE1LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxNwo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwxMjgwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKc3Ryb2tlPSJub25lIj4KPHBhdGggZmlsbD0id2hpdGUiIGQ9Ik00NjMyIDEyNzUzIGMtMzE0IC0zMTUgLTUzMCAtMTM2NiAtNTgzIC0yODM4IGwtMTEgLTMxMCAtMzIgLTMwCmMtMTcgLTE2IC0xMzMgLTExNiAtMjU2IC0yMjIgLTEyNCAtMTA1IC0yNTYgLTIyMCAtMjk0IC0yNTUgbC02OCAtNjMgLTkgLTEwMApjLTUgLTU1IC0yMSAtMjE1IC0zNSAtMzU1IC0xNCAtMTQwIC01MiAtNTMxIC04NCAtODY5IC0zOSAtNDAxIC02NCAtNjE5IC03MgotNjI5IC03IC04IC00MDQgLTM2MiAtODgzIC03ODYgLTQ3OCAtNDI0IC05OTEgLTg3OCAtMTE0MCAtMTAwOSAtMTQ4IC0xMzIKLTQwNSAtMzU5IC01NzAgLTUwNiAtMTY0IC0xNDYgLTM1MyAtMzE0IC00MjAgLTM3MiAtNjYgLTU4IC0xMzEgLTExOCAtMTQ1Ci0xMzMgbC0yNSAtMjggLTMgLTM3MSAtMyAtMzcxIDU4IC01OSBjMzIgLTMyIDExOSAtMTExIDE5MyAtMTc1IDc0IC02NSAxNjkKLTE0OSAyMTAgLTE4OCA3NiAtNzMgMTkxIC0xNTQgMjE4IC0xNTQgMTYgMCAxODk2IC02MjcgMTkyNSAtNjQyIDE0IC03IDE3Ci0yMiAxNyAtODEgbDAgLTcyIC0xMzIgLTEyOCBjLTczIC03MSAtMTk4IC0xODUgLTI3OCAtMjUzIC04MCAtNjggLTE2MSAtMTM5Ci0xODEgLTE1NyAtMjAgLTE3IC04MSAtNzAgLTEzNSAtMTE3IC01NCAtNDcgLTEzOCAtMTIzIC0xODYgLTE3MCBsLTg4IC04NSAtNQotMjIwIGMtMiAtMTIxIC03IC0zMDggLTEwIC00MTUgLTcgLTIyMSAtMyAtMjM4IDU1IC0yNTIgMzEgLTggMzMyIC0xMDQgNjM1Ci0yMDMgNTUgLTE4IDExNiAtMzYgMTM1IC00MCAxOSAtNCA0OSAtMTUgNjUgLTIzIDE3IC05IDM1IC0xNiA0MCAtMTcgMjUgLTMKNzQgLTE4IDExNyAtMzcgbDQ3IC0yMSA0MyAyNyBjMTE0IDcxIDE3MiAxMjAgNDU3IDM4NiA5MSA4NiAyMjcgMjA5IDMwMiAyNzUKNzQgNjYgMTg5IDE2OCAyNTYgMjI3IGwxMjAgMTA2IDggMjY5IGM0IDE0NyAxMCAyODQgMTQgMzA1IGw2IDM2IDE0NyAtODQgYzgyCi00NiAxNTIgLTg0IDE1NyAtODQgNSAwIDg3IDM4IDE4MiA4NSA5NSA0NyAxNzcgODUgMTgxIDg1IDQgMCA4IC0xNTMgOCAtMzQxCmwwIC0zNDEgNTggLTYwIDU4IC02MCA1NyA2MSA1NyA2MCAwIDM0MCBjMCAyMjMgMyAzNDEgMTAgMzQxIDYgMCA4NyAtMzggMTgwCi04NSA5MyAtNDcgMTc1IC04NSAxODIgLTg1IDcgMCA3OCAzOCAxNTggODQgODAgNDYgMTQ4IDgxIDE1MiA3OCA0IC00IDEyCi0xNDIgMTggLTMwNyA5IC0yNjIgMTMgLTMwMiAyOCAtMzE2IDkgLTkgMjIwIC0xOTQgNDY4IC00MTAgMjQ4IC0yMTcgNDk1Ci00MzIgNTQ4IC00NzkgNTQgLTQ3IDEwNSAtODggMTE0IC05MiAxMSAtNSAyMTkgNTggNTY3IDE3MSBsNTUwIDE3OSAtMyAxNTQKYy0xNSA2NDYgLTE4IDY5NiAtNDAgNzE1IC0xMiAxMCAtMjM1IDIxNCAtNDk3IDQ1MyBsLTQ3NiA0MzUgMyA4MCAzIDgwIDM5NQoxMzQgYzIxNyA3MyA2NzEgMjI2IDEwMDkgMzM4IGw2MTMgMjA2IDI5OSAyNjQgMjk5IDI2NSAwIDM3OSAwIDM3OSAtMjcgMjkKYy0xNiAxNiAtMzI1IDI5MSAtNjg4IDYxMiAtMzYzIDMyMSAtNzc5IDY4OSAtOTI1IDgxOSAtMTQ2IDEyOSAtNTU1IDQ5MSAtOTA4CjgwNCAtMzU1IDMxNSAtNjQ1IDU3OSAtNjQ3IDU5MCAtMyAxMiAtMjggMjYwIC01NSA1NTEgLTI4IDI5MiAtNjQgNjY1IC04MAo4MzAgLTE3IDE2NSAtMzUgMzUwIC00MSA0MTAgLTcgNzMgLTE3IDEyMCAtMjkgMTM5IC0yMSAzNCAtMTI5IDEzMSAtNDA1IDM2NQotMTExIDkzIC0yMDcgMTgyIC0yMTQgMTk3IC0xMyAzMCAtMjAgMTM5IC00MSA2NjIgLTYgMTUxIC0xNSAzMDggLTIwIDM1MCAtNQo0MyAtMTQgMTI5IC0yMCAxOTIgLTI5IDMwMiAtNTUgNDk5IC0xMDEgNzcwIC01MyAzMTUgLTgwIDQyOCAtMTU4IDY3MSAtNTgKMTc3IC0xMTAgMjkwIC0xODIgMzk1IC01MSA3MyAtMTM5IDE2NCAtMTU5IDE2NCAtNiAwIC0zMiAtMjEgLTU4IC00N3oiLz4KPC9nPgo8L3N2Zz4K';
const defaultBadgeColor = '#757575';

// writeTestBadge('white', afterburnerLogo, 'darkred', 'afterburner', 'darkred');
// writeTestBadge('white', 'ibm', 'lightgreen', 'WOOT', 'purple');

function writeTestBadge(badgeColor, logo, logoColor, text, textColor) {

  const svgDir = './svgs';

  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir);
  }

  fs.writeFileSync(`${svgDir}/testBadge.svg`, getBadge(badgeColor, logo, logoColor, text, textColor));

}

function getBadge(badgeColor, logo, logoColor, text, textColor) {

  let useBadgeColor = badgeColor;
  let useLogo = logo;
  let useLogoPath = '';
  let useText = text;

  const useLogoColor = logoColor;
  const useTextColor = textColor;

  if (useLogo && !useLogo.startsWith('data:image')) {

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

function writeAllSimpleIconSVGsToDisk() {

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

function renderSVG(badgeColor, logo, path, logoColor, text = '', textColor) {

  const window = createSVGWindow();
  const { document } = window;
  registerWindow(window, document);

  const fontSize = 16;
  const textOffset = 4;
  const logoWidth = 32;
  const badgeHeight = 32;
  const sidePadding = 11;
  const logoColorFill = getFillColor(badgeColor, logoColor);
  const textColorFill = getFillColor(badgeColor, textColor);
  const normalizationTarget = 27;
  const letterSpacing = 13.5;

  let logoTextMargin = sidePadding;

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
    .fill(logoColorFill);

  let logoElement;

  if (typeof logo === 'string') {

    if (logo.startsWith('<svg')) {

      // fragile, but should avoid the need for full-on xml parsing...
      const svgText = `<svg fill="${logoColorFill}" ${logo.slice(5)}`;

      const base64Logo = Buffer.from(svgText, 'utf-8').toString('base64');
      logoElement = gLogo.image(`data:image/svg+xml;base64,${base64Logo}`);

    }
    else {

      const logoParts = logo.split(',');
      const decodedLogo = Buffer.from(logoParts[1], 'base64').toString('utf-8');
      const fillReplacedLogo = decodedLogo.replace(/fill="[^"]*"/g, `fill="${logoColorFill}"`);
      logoElement = gLogo.image(`${logoParts[0]},${Buffer.from(fillReplacedLogo, 'utf-8').toString('base64')}`);

    }

    // const utf8SVG = Buffer.from(svgText, 'utf-8').toString();
    // const logoElement = gLogo.image(`data:image/svg+xml;utf8,${utf8SVG}`);
    // const logoElement = gLogo.path(path);

    logoElement
      .height(logoWidth + dimensionalAdjustment)
      .width(logoWidth + dimensionalAdjustment)
      .move(sidePadding, -dimensionalAdjustment / 2);

  }

  const renderedLogoWidth = logoElement ? logoElement.rbox().width : 0;
  const textWidth = text ? text.length * letterSpacing : 0;

  if (renderedLogoWidth === 0) {
    logoTextMargin = 0;
  }

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

  const badgeWidth = sidePadding + renderedLogoWidth + logoTextMargin + textWidth + sidePadding;

  canvas.width(badgeWidth).height(badgeHeight);

  gbackground
    .rect(badgeWidth, badgeHeight)
    .fill(badgeColor);

  const optimizedSVG = optimize(canvas.svg());

  return optimizedSVG.data;

}
