import autoprefixer from 'autoprefixer'
import importer from 'postcss-import'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'lib/index.js',
  output: {
    file: 'lib/repeat-editor.min.js',
    format: 'umd',
    name: 'repeat-editor',
    sourcemap: true
  },
  plugins: [
    postcss({
      minimize: { preset: 'default' },
      plugins: [ importer(), autoprefixer({ browsers: '> 0.5%' }) ]
    }),
    resolve({ browser: true }),
    commonjs(),
    buble(),
    uglify(!process.env.ROLLUP_WATCH || { output: { comments: /^!/ } }),
    serve(!process.env.ROLLUP_WATCH || { contentBase: 'lib', port: 8080 })
  ],
  onwarn: (message) => {
    if (/Use of eval/.test(message)) return
    console.error(message.toString())
  }
}
