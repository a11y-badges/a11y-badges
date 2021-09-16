#!/bin/sh

LOGIN=$1;

rm -rf ./dist/ &&
./node_modules/eslint/bin/eslint.js . || exit 1 ;
mkdir -p ./dist/site/ &&
mkdir -p ./dist/app/badge/ &&
mkdir -p ./dist/app/logos/ &&
cp -r ./site/ ./dist/site/ &&
cp package.json package-lock.json server.js ./dist/app/ &&
cp -r ./badge/ ./dist/app/badge/ &&
cp -r ./logos/ ./dist/app/logos/

rsync -crv -e ssh --delete --rsync-path="/usr/local/bin/sudo /usr/local/bin/rsync" ./dist/site/ "$LOGIN@a11ybadges.com:/usr/local/www/a11ybadges.com/html"

rsync -crv -e ssh --delete --exclude 'node_modules' --rsync-path="/usr/local/bin/sudo /usr/local/bin/rsync" ./dist/app/ "$LOGIN@a11ybadges.com:/usr/local/a11ybadges"

ssh "$LOGIN@a11ybadges.com" "export PATH=/usr/home/$LOGIN/.nvm/versions/node/v14.17.6/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin:/usr/home/$LOGIN/bin && cd /usr/local/a11ybadges && /usr/local/bin/sudo /usr/home/$LOGIN/.nvm/versions/node/v14.17.6/bin/npm ci && /usr/local/bin/sudo pm2 reload -u www server"
