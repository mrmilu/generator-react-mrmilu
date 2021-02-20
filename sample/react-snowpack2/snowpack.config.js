const path = require('path');

const isProd = process.env.NODE_ENV !== 'development';

const pluginSassOptions = {
  compilerOptions: {
    sourceMap: !isProd,
  },
};

if (!isProd) {
  pluginSassOptions.compilerOptions.embedSourceMap = !isProd;
}

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
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
          sourceMaps: true,
        },
      },
    ],
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    treeshake: true,
    minify: isProd,
    bundle: false,
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: ['styled-components'],
    // external: ['react', 'react-dom', 'styled-components'],
    installTypes: true,
    types: true,
    source: 'local',
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // clean: false,
    // metaUrlPath: '__snowpack__',
    sourcemap: true,
  },
};
