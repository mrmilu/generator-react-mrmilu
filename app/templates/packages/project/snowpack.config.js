const path = require('path');
const pkg = require('./package.json');

// Define other environment variables
process.env.SNOWPACK_PUBLIC_PACKAGE_NAME = pkg.name;
process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION = pkg.version;

const isProd = process.env.NODE_ENV !== 'development';

const pluginSassOptions = {
  compilerOptions: {
    sourceMap: !isProd
  }
};

if (!isProd) {
  pluginSassOptions.compilerOptions.embedSourceMap = !isProd;
}

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  exclude: ['**/__tests__/**/*', '**/README.md'],
  plugins: [
    ['@snowpack/plugin-sass', pluginSassOptions],
    [
      '@snowpack/plugin-babel',
      {
        input: ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for Babel to transform
        transformOptions: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
          sourceMaps: true
        }
      }
    ],
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    treeshake: true,
    minify: isProd,
    bundle: false
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: ['styled-components'],
    // external: ['react', 'react-dom', 'styled-components'],
    installTypes: true,
    types: true
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // clean: false,
    sourcemap: true // !isProd
  }
};
