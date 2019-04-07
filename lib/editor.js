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
    canvas.style.background = 'white'
    editor = CodeMirror(input, {
        mode: { name: 'javascript', globalVars: true },
        theme: 'default',
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 
            'Cmd-Enter': update, 
            'Ctrl-Enter': update, 
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

    if (getQueryParam('blend') === 'false')
        blend()

    if (getQueryParam('hide') === 'true')
        hide()

    setFavicon()
}

const update = cm => {
    code = cm.getValue()
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
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden') 
        output.classList.remove('hidden') 
        setQueryParam('hide', false)
    } else {
        input.classList.add('hidden') 
        output.classList.add('hidden') 
        setQueryParam('hide', true)
    }
    editor.focus()
}

const blend = () => {
    if (input.classList.contains('blended')) {
        input.classList.remove('blended') 
        output.classList.remove('blended') 
        setQueryParam('blend', false)
    } else {
        input.classList.add('blended') 
        output.classList.add('blended') 
        setQueryParam('blend', true)
    }
}

const resize = () => {
    canvas.width = window.w = window.innerWidth
    canvas.height = window.h = window.innerHeight
}

export { 
    init, 
    focus, 
    evaluate, 
    resize,
    graphics 
}
