const path = require('path');
const config = require('../../jest.config.base');

const cfg = config('react', __dirname);

cfg.setupFilesAfterEnv.unshift(path.resolve(__dirname, './react.setup-after-env.js'));
cfg.transform = {
  '^.+\\.tsx?$': 'babel-jest'
};

module.exports = cfg;
