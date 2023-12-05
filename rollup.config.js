import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/framing.js',
  output: {
    file: 'dist/framing.js',
    format: 'cjs',
  },
  plugins: [
    postcss({minimize: {preset: 'default'}}),
    resolve({browser: true}),
    commonjs(),
    buble({transforms: {asyncAwait: false}}),
    copy({targets: [{src: ['public/*', 'src/index.html'], dest: 'dist'},]}),
    process.env.ROLLUP_WATCH && serve({contentBase: 'dist', port: 8080})
  ],
  onwarn: (message) => {
    if (/Use of eval/.test(message)) return
    console.error(message.toString())
  }
}
