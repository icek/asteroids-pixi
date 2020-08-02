import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { template } from './template';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/asteroids.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    resolve({ preferBuiltins: false }),
    commonjs(),
    typescript(),
    terser({ output: { comments: false } }),
    html({ template }),
    url({ limit: 0, include: ['**/*.mp3', '**/*.ogg'] }),
  ],
};
