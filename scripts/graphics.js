const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')

const resize = () => {
    graphics.canvas.width = window.w = window.innerWidth
    graphics.canvas.height = window.h = window.innerHeight
    graphics.canvas.style.background = 'white'
}

graphics.resize = resize

export { graphics }
