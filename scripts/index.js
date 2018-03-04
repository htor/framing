import { graphics } from './graphics'
import { compose, print, random,  } from './tools'
import * as editor from './editor'

window.fps = 60
window.w = window.innerWidth
window.h = window.innerHeight
window.pbegin = () => graphics.beginPath()
window.stroke = () => graphics.stroke()
window.line = (...args) => graphics.lineTo(...args)
window.move = (...args) => graphics.moveTo(...args)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.bg = 'white'
window.sstyle = (arg) => graphics.strokeStyle = arg
window.fstyle = (arg) => graphics.fillStyle = arg
window.move = (...args) => graphics.moveTo(...args)
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.trans = (...args) => graphics.translate(...args)
window.secs = () => new Date().getSeconds()
window.mills = () => new Date().getMilliseconds()
window.rand = random
window.sin = Math.sin
window.cos = Math.cos
window.reset = () => graphics.setTransform(1, 0, 0, 1, 0, 0)

window.onresize = graphics.resize
window.onclick = editor.focus
window.onkeydown = (event) => {
    editor.resize()
    editor.register(event)
}

const loop = () => {
    graphics.fillStyle = window.bg
    graphics.fillRect(0, 0, w, h)
    graphics.font =  '1.4em monospace'
    editor.resize()
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / fps, loop)
}

graphics.resize()
loop()

