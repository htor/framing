import autoprefixer from 'autoprefixer'
import importer from 'postcss-import'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'

export default {
  input: 'scripts/editor.js',
  output: {
    file: 'scripts/editor.min.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    postcss({
      minimize: { preset: 'default' },
      plugins: [ importer(), autoprefixer({ browsers: '> 0.5%' }) ]
    }),
    resolve({ browser: true }),
    commonjs(),
    buble({ transforms: { dangerousForOf: true, asyncAwait: false }}),
    process.env.ROLLUP_WATCH && serve({ contentBase: '.', port: 8080 })
  ],
  onwarn: (message) => {
    if (/Use of eval/.test(message)) return
    console.error(message.toString())
  }
}
