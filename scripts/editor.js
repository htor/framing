import { 
    toBase64, 
    fromBase64, 
    getQueryParam,
    setQueryParam, 
    setFavicon, 
    toggleFullScreen 
} from './tools'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

const input = document.querySelector('code')
const output = document.querySelector('output')
const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')
let editor, code, prevCode, isFull = false

const init = () => {
    editor = CodeMirror(input, {
        mode: { name: 'javascript', globalVars: true },
        theme: 'default',
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 
            'Cmd-Enter': read, 
            'Ctrl-Enter': read, 
            'Tab': cm => {
                let spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                cm.replaceSelection(spaces)
            },
            'Alt-H': hide,
            'Alt-F': () => {
                toggleFullScreen(isFull)
                isFull = !isFull
            },
            'Alt-B': blend
        }
    })

    let id = getQueryParam('id')
    if (id) {
        let decoded = fromBase64(id)
        code = decoded
        editor.setValue(code)
    } else {
        editor.setValue('')
    }

    if (getQueryParam('hide') === 'true')
        hide()

    setFavicon()
}

const read = cm => {
    let cursor = cm.getCursor()
    let from, to
    if (cm.somethingSelected()) {
        from = editor.getCursor('start')
        to = editor.getCursor('end')
        code = cm.getRange(from, to)
    } else {
        code = cm.getValue()
    }
    setQueryParam('id', toBase64(code))
    setFavicon()
}

const evaluate = () => {
    let result
    try {   
        result = eval(code)
        prevCode = code
    } catch (error) {
        result = error.message
        eval(prevCode)
    } finally {
        result = String(result).replace(/^undefined$/, '')
        output.innerHTML = result
    }
}

const focus = () => 
    editor.focus()

const hide = () => {
    input.classList.toggle('hidden') 
    output.classList.toggle('hidden') 
    editor.focus()
}

const blend = () => {
    input.classList.toggle('blended') 
    output.classList.toggle('blended') 
}

const resize = () => {
    canvas.width = window.w = window.innerWidth
    canvas.height = window.h = window.innerHeight
    canvas.style.background = 'white'
}

export { 
    init, 
    focus, 
    evaluate, 
    resize,
    graphics 
}
