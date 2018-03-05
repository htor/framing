const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')

graphics.resize = () => {
    graphics.canvas.width = window.w = window.innerWidth
    graphics.canvas.height = window.h = window.innerHeight
}

export { graphics }
