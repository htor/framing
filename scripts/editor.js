import { graphics } from './graphics'
import { toBase64, fromBase64, setQueryParam, setFavicon, 
    toggleFullScreen } from './tools'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

const input = document.querySelector('code')
const output = document.querySelector('output')
let editor, code, prevCode, isFull = false

const tab = (cm) => {
    let spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
    cm.replaceSelection(spaces)
}

const update = (cm) => {
    code = cm.getValue()
    setQueryParam('id', toBase64(code))
    setFavicon(graphics.canvas)
}

const init = () => {
    editor = CodeMirror(input, {
        mode: { name: 'javascript', globalVars: true },
        theme: 'pastel-on-dark',
        lineWrapping: true,
        viewportMargin: Infinity,
        extraKeys: { 
            'Cmd-Enter': update, 
            'Ctrl-Enter': update, 
            'Tab': tab,
            'Alt-H': hide,
            'Alt-F': () => {
                toggleFullScreen(isFull)
                isFull = !isFull
            }
        }
    })
    let searchParams = new URLSearchParams(window.location.search)
    let base64Code = searchParams.get('id')
    if (base64Code) {
        let decoded = fromBase64(base64Code)
        code = decoded
        editor.setValue(code)
    } else {
        editor.setValue('')
    }
    evaluate()
    setFavicon(graphics.canvas)
}

const focus = () => 
    editor.focus()

const hide = () => {
    input.classList.toggle('hidden') 
    output.classList.toggle('hidden') 
    editor.focus()
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

export { init, focus, evaluate }
