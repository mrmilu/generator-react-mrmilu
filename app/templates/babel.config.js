const path = require('path');
const config = require('./packages/project/.babelrc');

config.babelrcRoots = ['.', path.resolve(__dirname, './packages/')];

module.exports = config;
