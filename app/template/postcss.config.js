const path = require('path');

module.exports = {
  // sourceType: 'module',
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(path.resolve(__dirname, 'tailwind.config.js')),
    require('autoprefixer'),
    require('postcss-preset-env')({ stage: 1 }),
    require('cssnano')({ preset: 'default' }),
  ],
};
