import '../index.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment'
import { getQueryParam, setQueryParam, setFavicon } from './utils'
import * as lang from './lang'

const code = document.querySelector('code')
const output = document.querySelector('output')
const mainCanvas = document.querySelector('canvas')
const offCanvas = document.querySelector('canvas[hidden]')
const help = document.querySelector('aside')

let editor = null
let isHidden = false
let lastCode = ''
const greeting = '// type code here. press <esc> for help'

function setup () {
  mainCanvas.width = offCanvas.width = window.innerWidth
  mainCanvas.height = offCanvas.height = window.innerHeight
  editor = editor || CodeMirror(code, {
    mode: {
      name: 'javascript',
      globalVars: true
    },
    lineWrapping: true,
    scrollbarStyle: 'null',
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      'Cmd-Enter': () => saveCode(editor),
      'Ctrl-Enter': () => saveCode(editor),
      'Tab': () => CodeMirror.commands.indentMore(editor),
      'Shift-Tab': () => CodeMirror.commands.indentLess(editor),
      'Cmd-L': () => selectLine(editor),
      'Ctrl-L': () => selectLine(editor),
      'Cmd-D': () => duplicateLine(editor),
      'Ctrl-D': () => duplicateLine(editor),
      'Cmd-K': () => CodeMirror.commands.toggleComment(editor),
      'Ctrl-K': () => CodeMirror.commands.toggleComment(editor),
      'Ctrl-H': () => {}
    }
  })
  isHidden = getQueryParam('hidden') === 'true'
  const id = getQueryParam('id')
  editor.setValue(id ? decodeURIComponent(atob(id)) : greeting)
  editor.focus()
  code.toggleAttribute('hidden', isHidden)
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
  if (!help.hidden) help.focus()
}

function toggleCode () {
  isHidden = !isHidden
  code.toggleAttribute('hidden', isHidden)
  output.toggleAttribute('hidden', isHidden)
  setQueryParam('hidden', isHidden)
  if (!isHidden) editor.focus()
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
  if (event.key === 'Escape') {
    event.preventDefault()
    toggleHelp()
  } else if (event.key === 'h' && event.ctrlKey) {
    event.preventDefault()
    toggleCode()
  } else if (event.key === 'f' && event.ctrlKey) {
    event.preventDefault()
    toggleFullscreen()
  }
})

loadHelp()
setup()
saveCode(editor)
