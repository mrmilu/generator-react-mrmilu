import esbuild from 'rollup-plugin-esbuild';
import autoExternal from 'rollup-plugin-auto-external';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import builtinModules from 'builtin-modules';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const extensions = ['.js', '.ts', '.mjs', '.node'];
const resolveOptions = {
  mainFields: ['collection:main', 'jsnext:main', 'es2020', 'es2018', 'es2017', 'es2015', 'module', 'main'],
  preferBuiltins: false,
  extensions,
  modulesOnly: false,
  browser: false
};
const plugins = {
  json: json(),
  external: autoExternal({
    builtins: false,
    peerDependencies: true,
    dependencies: true
  }),
  globals: globals(),
  builtins: builtins(),
  resolve: nodeResolve(resolveOptions),
  typescript: esbuild({
    minify: isProd,
    // target: ['es2015', 'chrome50', 'edge19', 'firefox53'],
    sourceMap: !isProd,
    loaders: {
      '.ts': 'ts',
      '.json': 'json'
    }
  }),
  commonjs: commonjs()
};

function getConfig() {
  const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * ${pkg.repository.url}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

  const output = [
    pkg.main && { file: pkg.main, format: 'cjs', sourcemap: false, banner, exports: 'auto' },
    pkg.module && { file: pkg.module, format: 'esm', sourcemap: false, banner }
  ].filter(Boolean);

  const basicExternal = [...builtinModules, ...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

  return {
    input: 'src/index.ts',
    output,
    treeshake: true,
    plugins: Object.values(plugins),
    external: basicExternal
  };
}

export default getConfig();
