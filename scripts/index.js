import * as fixes from './fixes'
import { graphics } from './graphics'
import { random, compose } from './tools'
import * as editor from './editor'

window.ctx = graphics
window.w = graphics.canvas.height
window.h = graphics.canvas.width
window.startDate = new Date()
window.frameRate = 120
window.frameReset = true
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
window.bground = (arg) => graphics.canvas.style.background = arg
window.font = (arg) => graphics.font = arg
window.lwidth = (arg) => graphics.lineWidth = arg
window.lcap = (arg) => graphics.lineCap = arg
window.ftext = (...args) => graphics.fillText(...args)
window.stext = (...args) => graphics.strokeText(...args)
window.push = () => graphics.save()
window.pop = () => graphics.restore()
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.tslate = (...args) => graphics.translate(...args)
window.scale = (...args) => graphics.scale(...args)
window.treset = () => graphics.setTransform(1, 0, 0, 1, 0, 0)
window.second = () => new Date().getSeconds()
window.millis = () => (new Date()) - startDate
window.fps = (arg) => window.frameRate = arg
window.freset = (arg) => window.frameReset = arg
window.rand = random
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.min = Math.min
window.max = Math.max
window.map = (e,t,n,r,i) => r+(i-r)*((e-t)/(n-t))
window.rgba = (...colors) => `rgba(${[...colors].map(c => c.toFixed(0))})`

window.onclick = editor.focus
window.onresize = graphics.resize
window.onload = compose(graphics.resize, editor.init, editor.focus)
window.onpopstate = editor.init
window.requestAnimationFrame(function loop() {
    if (frameReset)
        graphics.clearRect(0, 0, w, h) 
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / frameRate, loop)
})
