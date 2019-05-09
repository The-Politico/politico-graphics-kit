import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  comments: false,
  plugins: [
    '@babel/proposal-class-properties',
  ],
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.mjs',
    format: 'es',
  },
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.peerDependencies),
  ],
  plugins: [
    json(),
    alias({
      resolve: ['.jsx', '.js'],
    }),
    babel(babelOpts),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
      modulesOnly: true,
    }),
  ],
};
