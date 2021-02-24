const path = require('path');
const pkg = require('./package.json');

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
    // '@snowpack/plugin-react-refresh',
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
    '@snowpack/plugin-dotenv',
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
    types: true,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PACKAGE_NAME: pkg.name,
      PACKAGE_VERSION: pkg.version,
      API_URL: process.env.API_URL
    }
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // clean: false,
    sourcemap: true // !isProd
  }
};
