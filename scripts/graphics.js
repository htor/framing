const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')

const resize = () => {
    graphics.canvas.width = window.w = window.innerWidth
    graphics.canvas.height = window.h = window.innerHeight
}

graphics.resize = resize

export { graphics }
