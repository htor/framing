import { graphics } from './graphics'
import { print } from './tools'

const focus = () => {
    let textarea = document.querySelector('textarea')
    textarea.focus()
}

const resize = event => {
    let textarea = document.querySelector('textarea')
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

const evaluate = event => {
    let textarea = document.querySelector('textarea')
    let output = document.querySelector('output')
    let lines = textarea.value.split('\n')
    if (event.key === 'Enter' && event.metaKey) {
        let code = lines.filter(line => !line.startsWith('//')).join('\n')
        let result
        try {   
            result = eval(code)
        } catch (error) {
            result = error.message
        } finally {
            print(result)
            output.innerHTML = JSON.stringify(result, null, 4);
        }
    } else if (event.key === 'Tab') {
        event.preventDefault()
        textarea.value = `${textarea.value}    `
    }
}

export { focus, resize, evaluate }
