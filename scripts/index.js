import { graphics } from './graphics'
import { compose, print, random,  } from './tools'
import * as editor from './editor'

window.w = window.innerWidth
window.h = window.innerHeight
window.fps = 60
window.sstyle = (arg) => graphics.strokeStyle = arg
window.fstyle = (arg) => graphics.fillStyle = arg
window.stroke = () => graphics.stroke()
window.line = (...args) => graphics.lineTo(...args)
window.move = (...args) => graphics.moveTo(...args)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.move = (...args) => graphics.moveTo(...args)
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.trans = (...args) => graphics.translate(...args)
window.secs = () => new Date().getSeconds()
window.mills = () => new Date().getMilliseconds()
window.rand = random
window.sin = Math.sin
window.cos = Math.cos

window.onresize = graphics.resize
window.onclick = editor.focus
window.onkeydown = editor.register
window.onload = editor.focus

const loop = () => {
    graphics.resize()
    graphics.font =  '1.4em monospace'
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / fps, loop)
}

loop()

