// netlify serverless function definition (not in use; was only for PoC)

const { getBadge } = require('../badge/generator');

exports.handler = async function(event, /* context */) { // eslint-disable-line require-await

  const { badgeColor, logo, logoColor, text, textColor } = event.queryStringParameters;

  return {
    statusCode: 200,
    headers: { 'content-type': 'image/svg+xml;charset=utf-8' },
    body: getBadge({ badgeColor, logo, logoColor, text, textColor }),
  };

};
