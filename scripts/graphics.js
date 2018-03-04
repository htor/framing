const canvas = document.querySelector('canvas')
const graphics = canvas.getContext('2d')

const resize = event => {
    graphics.canvas.width = window.width = window.innerWidth
    graphics.canvas.height = window.height = window.innerHeight
    return event
}

const draw = () => {
    graphics.font =  '1.4em monospace'
    graphics.strokeStyle = 'black'
    graphics.fillStyle = 'black'
}

graphics.resize = resize
graphics.draw = draw

export { graphics }
