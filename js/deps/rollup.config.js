// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

const template = {
  output: {
    dir: __dirname + '/builds/',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(),
    cleanup()
  ]
};

export default [
  {
    input: "js/deps/pluralize.js",
    ...template
  },
  {
    input: "js/deps/svg.js",
    ...template
  }
]
