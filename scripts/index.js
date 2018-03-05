import { graphics } from './graphics'
import { random } from './tools'
import * as editor from './editor'

window.ctx = graphics
window.w = graphics.canvas.height
window.h = graphics.canvas.width
window.startDate = new Date()
window.frameRate = 60
window.begin = () => graphics.beginPath()
window.close = () => graphics.closePath()
window.stroke = () => graphics.stroke()
window.line = (...args) => graphics.lineTo(...args)
window.move = (...args) => graphics.moveTo(...args)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.font = (arg) => graphics.font = arg
window.sstyle = (arg) => graphics.strokeStyle = arg
window.fstyle = (arg) => graphics.fillStyle = arg
window.font = (arg) => graphics.font = arg
window.linew = (arg) => graphics.lineWidth = arg
window.linec = (arg) => graphics.lineCap = arg
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.trans = (...args) => graphics.translate(...args)
window.ftext = (...args) => graphics.fillText(...args)
window.stext = (...args) => graphics.strokeText(...args)
window.second = () => new Date().getSeconds()
window.millis = () => (new Date()) - startDate
window.fps = (arg) => window.frameRate = arg
window.rand = random
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.map = (e,t,n,r,i) => r+(i-r)*((e-t)/(n-t))
window.onclick = editor.focus
window.onload = editor.focus
window.onkeydown = editor.register
window.onresize = graphics.resize
window.requestAnimationFrame(function loop() {
    graphics.resize()
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / frameRate, loop)
})

