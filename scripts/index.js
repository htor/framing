import { graphics } from './graphics'
import { compose, print, random,  } from './tools'
import * as editor from './editor'

window.w = graphics.canvas.height
window.h = graphics.canvas.width
window.startDate = new Date()
window.frameRate = 60
window.stroke = () => graphics.stroke()
window.line = (...args) => graphics.lineTo(...args)
window.move = (...args) => graphics.moveTo(...args)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.font = (arg) => graphics.font = arg
window.sstyle = (arg) => graphics.strokeStyle = arg
window.fstyle = (arg) => graphics.fillStyle = arg
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.trans = (...args) => graphics.translate(...args)
window.second = () => new Date().getSeconds()
window.millis = () => (new Date()) - startDate
window.fps = (arg) => window.frameRate = arg
window.rand = random
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.map = (e,t,n,r,i) => r+(i-r)*((e-t)/(n-t))
window.onresize = graphics.resize
window.onclick = editor.focus
window.onkeydown = editor.register
window.onload = editor.focus

const loop = () => {
    graphics.resize()
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / frameRate, loop)
}

loop()

