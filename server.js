import express from 'express';
import { getBadge } from './badge/generator';
import helmet from 'helmet';

const app = express();

app.set('query parser', queryString => {

  if (!queryString) {
    return '';
  }

  const params = {};

  for (const p of queryString.split('&')) {

    const keyValueDelimiterIndex = p.indexOf('=');

    const key = p.substring(0, keyValueDelimiterIndex).toLowerCase();
    const value = p.substring(keyValueDelimiterIndex + 1);

    params[key] = value;

  }

  return params;

});

const port = 4751;

app.use(helmet());

app.use(express.static('site'));

app.get('/badge', (req, res) => {

  // query strings are normalized to lowercase
  const { badgecolor, logo, logocolor, text, textcolor } = req.query;

  res.set('Content-Type', 'image/svg+xml;charset=utf-8');

  let useText;

  if (typeof text === 'string') {
    useText = text.replace(/_/g, ' ');
  }

  res.send(getBadge({ badgeColor: badgecolor, logo, logoColor: logocolor, text: useText, textColor: textcolor }));

});

const server = app.listen(port, () => {
  process.send('ready');
  console.log(`listening on port http://localhost:${port}`);
});

process.on('SIGINT', () => {
  server.close();
});

process.on('SIGTERM', () => {
  server.close();
});
