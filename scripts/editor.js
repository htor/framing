import { graphics } from './graphics'
import { toBase64, fromBase64, setQueryParam } from './tools'

const input = document.querySelector('code')
const output = document.querySelector('output')
let code = '', prevCode = '';

const focus = () => input.focus()

const init = () => {
    let searchParams = new URLSearchParams(window.location.search)
    let base64Code = searchParams.get('id')
    if (base64Code) {
        code = input.innerText = fromBase64(base64Code)
        evaluate()
        setFavicon()
    }
}

const register = event => {
    if ((event.metaKey || event.ctrlKey) &&
        event.key === 'Enter') {
        code = input.innerText
        setQueryParam('id', toBase64(code))
        setFavicon()
    } else if (event.key === 'Tab') {
        event.preventDefault()
        input.innerText= `${input.innerText}    `
    }
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
        output.innerHTML = result
    }
}

const setFavicon = () => {
    setTimeout(() => {
        let favicon = document.querySelector('[rel=icon]');
        let iconCanvas = document.createElement('canvas')
        let iconGraphics = iconCanvas.getContext('2d')
        let length = Math.min(graphics.canvas.width, graphics.canvas.height)
        iconCanvas.width = iconCanvas.height = length
        iconGraphics.drawImage(graphics.canvas, 0, 0, length, length, 
            0, 0, length, length)
        favicon.href = iconCanvas.toDataURL();
    }, 1000)
}

export { init, focus, register, evaluate }
