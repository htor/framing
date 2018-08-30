import { graphics } from './graphics'
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
        theme: 'default',
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
            },
            'Alt-B': blend
        }
    })

    let scratchId = getQueryParam('id')
    if (scratchId) {
        let decoded = fromBase64(scratchId)
        code = decoded
        editor.setValue(code)
    } else {
        editor.setValue('')
    }

    if (getQueryParam('hide') === 'true')
        hide()

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

const blend = () => {
    input.classList.toggle('blended') 
    output.classList.toggle('blended') 
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
