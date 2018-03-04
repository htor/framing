const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')

const resize = event => {
    graphics.canvas.width = window.w = window.innerWidth
    graphics.canvas.height = window.h = window.innerHeight
    return event
}

graphics.resize = resize

export { graphics }
