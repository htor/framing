import { graphics } from './graphics'
import { print } from './tools'

const input = document.querySelector('code')
const output = document.querySelector('output')
const execution = { code: '', result: null }

const focus = () => input.focus()

const register = event => {
    if ((event.metaKey || event.ctrlKey) &&
        event.key === 'Enter') {
        execution.code = input.innerText
    } else if (event.key === 'Tab') {
        event.preventDefault()
        input.innerText= `${input.innerText}    `
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

export { focus, register, evaluate }
