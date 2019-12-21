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
let editor = null
let isFullscreen = false
let isHidden = false

function start () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  editor = editor || CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      'Cmd-Enter': () => saveCode(editor),
      'Ctrl-Enter': () => saveCode(editor),
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
  editor.setValue(id ? decodeURIComponent(atob(id)) : '')
  editor.focus()
  toggleCode()
  saveCode(editor)
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
  if (isFullscreen)  {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

function toggleCode () {
  input.classList.toggle('hidden', isHidden)
  output.classList.toggle('hidden', isHidden)
  setQueryParam('hidden', isHidden)
  isHidden = !isHidden
}

function saveCode (editor) {
  const code = editor.getValue()
  lang.evalCode(code)
  setQueryParam('id', btoa(encodeURIComponent(code)))
  setFavicon()
}

window.addEventListener('popstate', start)
window.addEventListener('fullscreenchange', () => isFullscreen = !isFullscreen)
window.addEventListener('click', () => editor.focus())
start()
