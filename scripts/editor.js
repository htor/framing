import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment'
import { getQueryParam, setQueryParam, setFavicon } from './utils'
import * as lang from './lang'
import '../index.css'

const input = document.querySelector('code')
const output = document.querySelector('output')
const canvas = document.querySelector('canvas')
let editor, isFullscreen, isHidden

function start () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  editor = CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      'Cmd-Enter': () => evalCode(editor),
      'Ctrl-Enter': () => evalCode(editor),
      'Tab': () => editor.replaceSelection('  '),
      'Esc': () => editor.setCursor(editor.getCursor()),
      'Cmd-L': () => selectLine(editor),
      'Ctrl-L': () => selectLine(editor),
      'Shift-Cmd-D': () => duplicateLine(editor),
      'Shift-Cmd-K': () => editor.toggleComment(),
      'Alt-H': toggleCode,
      'Alt-F': togglefullscreen
    }
  })
  isHidden = getQueryParam('hide') === 'true'
  const id = getQueryParam('id')
  editor.setValue(id ? decodeURIComponent(atob(id)) : ' ')
  editor.focus()
  toggleCode()
  evalCode(editor)
}

function duplicateLine (editor) {
  const cursor = editor.getCursor()
  const line = editor.getLine(cursor.line)
  editor.replaceRange(`\n${line}`, { line: cursor.line })
}

function selectLine (editor) {
  const cursor = editor.getCursor()
  const from = { line: cursor.line, ch: 0 }
  const to = { line: cursor.line + (editor.somethingSelected() ? 1 : 0) }
  editor.setExtending(true)
  editor.extendSelection(from, to)
  editor.setExtending(false)
}

function togglefullscreen () {
  isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullscreen = !isFullscreen
}

function toggleCode () {
  input.classList.toggle('hidden', isHidden)
  output.classList.toggle('hidden', isHidden)
  setQueryParam('hidden', isHidden)
  isHidden = !isHidden
}

function evalCode (editor) {
  const code = editor.getValue()
  lang.evalCode(code)
  setQueryParam('id', btoa(encodeURIComponent(code)))
  setFavicon()
}

window.onpopstate = start
window.onclick = () => editor.focus()

start()
