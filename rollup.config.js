import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import path from 'path';
const pkg = require('./package.json');

export default {
  input: path.resolve(__dirname, './src/index.js'),
  output: [
    {
      file: pkg.main,
      name: 'awaitToDecorater',
      format: 'umd',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [commonjs(), resolve(), sourceMaps()]
};
