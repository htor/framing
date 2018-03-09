import { graphics } from './graphics'
import { toBase64, fromBase64, setQueryParam, setFavicon } from './tools'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

const input = document.querySelector('code')
const output = document.querySelector('output')
const options = {
    mode: { name: 'javascript', globalVars: true },
    theme: 'pastel-on-dark',
    lineWrapping: true,
    viewportMargin: Infinity,
    extraKeys: {
        'Cmd-Enter': (cm) => {
            code = cm.getValue()
            setQueryParam('id', toBase64(code))
            setFavicon(graphics.canvas)
        },
        'Shift-Cmd-Enter': (cm) => {
            let cursor = cm.getCursor()
            code = cm.getLine(cursor.line)
            setQueryParam('id', toBase64(code))
            setFavicon(graphics.canvas)
        },
        'Tab': (cm) => {
            let spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
            cm.replaceSelection(spaces)
        }
    }
}
const editor = CodeMirror(input, options)
let code = '', prevCode = ''

const init = () => {
    let searchParams = new URLSearchParams(window.location.search)
    let base64Code = searchParams.get('id')
    if (base64Code) {
        let decoded = fromBase64(base64Code)
        code = decoded
        editor.setValue(code)
    } else {
        editor.setValue('// scratch ')
    }
    evaluate()
    setFavicon(graphics.canvas)
}

const focus = () => 
    editor.focus()

const evaluate = () => {
    let result
    try {   
        result = eval(code)
        prevCode = code
    } catch (error) {
        result = error.message
        eval(prevCode)
    } finally {
        output.innerHTML = result
    }
}

export { init, focus, evaluate }
