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
const help = document.querySelector('aside')

let editor = null
let isFullscreen = false
let isHidden = false
let lastCode = ''
const greeting = `// Type code here. Press F1 for help`

function setup () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  editor = editor || CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    scrollbarStyle: 'null',
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
      'Alt-I': () => {},
      'Alt-H': () => {}
    }
  })
  isHidden = getQueryParam('hidden') === 'true'
  const id = getQueryParam('id')
  editor.setValue(id ? decodeURIComponent(atob(id)) : greeting)
  editor.focus()
  input.toggleAttribute('hidden', isHidden)
  output.toggleAttribute('hidden', isHidden)
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

function toggleHelp () {
  help.toggleAttribute('hidden')
  toggleCode()
}

function toggleCode () {
  isHidden = !isHidden
  input.toggleAttribute('hidden', isHidden)
  output.toggleAttribute('hidden', isHidden)
  setQueryParam('hidden', isHidden)
}

function toggleFullscreen () {
  if (document.fullscreenElement)  {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

function saveCode (editor, updateUrl = true) {
  const code = editor.getValue()
  lang.evalCode(code)
  if (code !== lastCode && updateUrl) {
    lastCode = code
    setQueryParam('id', btoa(encodeURIComponent(code)))
    setFavicon()
  }
}

async function loadHelp () {
  const response = await fetch('help.md')
  const text = await response.text()
  const lines = text.split('\n')
  const newLines = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('# ')) newLines.push(`<h1>${lines[i].slice(1)}</h1>`)
    else if (lines[i].trim()) newLines.push(`<p>${lines[i]}</p>`)
  }
  help.innerHTML = newLines.join('\n')
}

window.addEventListener('click', () => editor.focus())
window.addEventListener('popstate', (event) => {
  setup()
  saveCode(editor, false)
})
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 112) toggleHelp() // f1
  if (event.keyCode === 113) toggleCode() // f2
  if (event.keyCode === 114) {
    event.preventDefault()
    toggleFullscreen() // f3
  }
  if (event.keyCode === 116) {
    event.preventDefault()
    setQueryParam('id', '') // f5
    window.location.reload()
  }
})

loadHelp()
setup()
saveCode(editor)
