import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { template } from './template';

const deps = [
  {
    name: 'pixi.js',
    global: 'PIXI',
    path: '/dist/pixi.min.js',
  }, {
    name: '@ash.ts/ash',
    global: 'ASH',
    path: '/dist/ash.min.js',
  },
];

const globals = deps.reduce((glob, dep) => {
  glob[dep.name] = dep.global;
  return glob;
}, {});

const external = Object.keys(globals);

export default {
  external,
  input: 'src/index.ts',
  output: {
    globals,
    file: 'dist/asteroids.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescript(),
    terser({ output: { comments: false } }),
    html({ template: template(deps) }),
    url({ limit: 0, include: ['**/*.mp3', '**/*.ogg'] }),
  ],
};
