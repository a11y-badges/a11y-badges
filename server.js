const express = require('express');
const { getBadge } = require('./badge/generator');
const helmet = require('helmet');

const app = express();
const port = 4751;

app.use(helmet());

app.use(express.static('site'));

app.get('/badge', (req, res) => {

  const { badgeColor, logo, logoColor, text, textColor } = req.query;

  res.set('Content-Type', 'image/svg+xml;charset=utf-8');

  res.send(getBadge(badgeColor, logo, logoColor, text, textColor));

});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
