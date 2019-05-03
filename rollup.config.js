import html from 'rollup-plugin-fill-html';
import htmlEntry from 'rollup-plugin-html-entry';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

export default {
  input: 'src/index.html',
  output: {
    file: 'dist/asteroids.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    resolve(),
    typescript(),
    terser(),
    htmlEntry({
      output: '.tmp',
    }),
    html({
      template: '.tmp/src/index.html',
      filename: 'index.html',
    }),
    url({
      limit: 0,
      include: ['**/*.mp3']
    })
  ]
};
