const input = document.querySelector('code')
const output = document.querySelector('output')
let code = '';

const focus = () => input.focus()

const register = event => {
    if ((event.metaKey || event.ctrlKey) &&
        event.key === 'Enter') {
        code = input.innerText
    } else if (event.key === 'Tab') {
        event.preventDefault()
        input.innerText= `${input.innerText}    `
    }
    return event
}

const evaluate = () => {
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
