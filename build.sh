#!/bin/sh

eslint . &&
rm -rf ./dist/ &&
mkdir -p ./dist/site/ &&
mkdir -p ./dist/app/badge/ &&
mkdir -p ./dist/app/logos/ &&
cp -r ./site/ ./dist/site/ &&
cp package.json package-lock.json server.js ./dist/app/ &&
cp -r ./badge/ ./dist/app/badge/ &&
cp -r ./logos/ ./dist/app/logos/
