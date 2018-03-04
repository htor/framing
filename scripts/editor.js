import { graphics } from './graphics'
import { print } from './tools'

const textarea = document.querySelector('textarea')
const output = document.querySelector('output')
const execution = {
    code: '',
    result: null
}

const focus = () => textarea.focus()

const resize = () => {
    let lines = textarea.value.split('\n')
    let lineno = lines.length
    let longestline = lines.reduce((acc, x) =>
        acc.length > x.length ? acc : x
    )
    let metrics = graphics.measureText(longestline + ' ');
    textarea.style.width = `${metrics.width}px`
    textarea.style.height = `auto`
    textarea.style.height = `${textarea.scrollHeight}px`
    return event
}

const register = event => {
    if (event.key === 'Enter' && event.metaKey) {
        execution.code = textarea.value
    } else if (event.key === 'Tab') {
        event.preventDefault()
        textarea.value = `${textarea.value}    `
    }
    return event
}

const evaluate = () => {
    let code = execution.code.split('\n')
        .filter(line => !line.startsWith('//')).join('\n')
    let result
    try {   
        result = eval(code)
    } catch (error) {
        result = error.message
    } finally {
        output.innerHTML = result
    }
}

export { focus, resize, register, evaluate }
