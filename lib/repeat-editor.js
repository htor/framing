import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import OpenSimplex from 'open-simplex-noise'
import seedrandom from 'seedrandom'
import { getQueryParam, setQueryParam, setFavicon, vendorPrefix } from './utils'
import './index.css'

export { init, code, seedrandom, OpenSimplex }

const input = document.querySelector('code')
const output = document.querySelector('output')
const canvas = document.querySelector('canvas')
let editor, isFullscreen, isHidden, code = {}

function setup () {
  editor = editor || CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    extraKeys: {
      'Cmd-Enter': save,
      'Ctrl-Enter': save,
      'Tab': (cm) => cm.replaceSelection('    '),
      'Alt-H': hide,
      'Alt-F': full
    }
  })
  isHidden = getQueryParam('hide') === 'true'
  let id = getQueryParam('id')
  editor.setValue(id ? decodeURIComponent(atob(id)) : ' ')
  save(editor)
  editor.focus()
}

function full () {
  isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullscreen = !isFullscreen
}

function save (cm) {
  code.curr = cm.getValue()
  setQueryParam('id', btoa(encodeURIComponent(code.curr)))
  setFavicon()
}

function hide () {
  input.classList.toggle('hidden', isHidden)
  output.classList.toggle('hidden', isHidden)
  setQueryParam('hide', isHidden)
  isHidden = !isHidden
}

function resize () {
  canvas.width = window.w = window.innerWidth
  canvas.height = window.h = window.innerHeight
}

function focus () {
  editor.focus()
}

function init () {
  window.onclick = focus
  window.onresize = resize
  window.onpopstate = setup
  window.onmousemove = ({ clientX, clientY }) => {
    const mx = clientX
    const my = clientY
  }
  document.exitFullscreen = vendorPrefix('exitFullscreen', document)
    || vendorPrefix('cancelFullScreen', document)
  document.documentElement.requestFullscreen = vendorPrefix('requestFullscreen', document.documentElement)
    || vendorPrefix('requestFullScreen', document.documentElement)

  setup()
  hide()
  resize()
  setFavicon()
  focus()
}
