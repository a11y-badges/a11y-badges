// google cloud platform serverless function definition (PoC)
// note that to successfully deploy this function, package.json needs to have this file as the main:  "main": "./gcp/index.js",
// deploy command: gcloud functions deploy badge --runtime nodejs16 --trigger-http --allow-unauthenticated --memory=128MB

import functions from '@google-cloud/functions-framework';
import { getBadge } from '../badge/generator.js';

functions.http('badge', (req, res) => {

  const { badgeColor, logo, logoColor, text, textColor } = req.query;
  const badge = getBadge({ badgeColor, logo, logoColor, text, textColor });

  res
    .set('content-type', 'image/svg+xml;charset=utf-8')
    .status(200)
    .send(badge);

});
