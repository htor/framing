import * as fixes from './fixes'
import { random, remember } from './tools'
import * as editor from './editor'
import './index.css'

const graphics = editor.graphics

window.ctx = graphics
window.w = graphics.canvas.height
window.h = graphics.canvas.width
window.mx = window.my = 0
window.startDate = new Date()
window.frameRate = 120
window.begin = () => graphics.beginPath()
window.close = () => graphics.closePath()
window.stroke = () => graphics.stroke()
window.fill = () => graphics.fill()
window.line = (...args) => graphics.lineTo(...args)
window.move = (...args) => graphics.moveTo(...args)
window.rect = (...args) => graphics.rect(...args)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.font = arg => graphics.font = arg
window.sstyle = arg => graphics.strokeStyle = arg
window.fstyle = arg => graphics.fillStyle = arg
window.font = arg => graphics.font = arg
window.lwidth = arg => graphics.lineWidth = arg
window.lcap = arg => graphics.lineCap = arg
window.ftext = (...args) => graphics.fillText(...args)
window.stext = (...args) => graphics.strokeText(...args)
window.push = () => graphics.save()
window.pop = () => graphics.restore()
window.rotate = degs => graphics.rotate(degs * Math.PI / 180)
window.tslate = (...args) => graphics.translate(...args)
window.scale = (...args) => graphics.scale(...args)
window.treset = () => graphics.setTransform(1, 0, 0, 1, 0, 0)
window.clear = arg => arg === false ? arg : graphics.clearRect(0, 0, w, h)
window.bground = arg => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
window.second = () => new Date().getSeconds()
window.millis = window.ms = () => (new Date()) - startDate
window.fps = arg => arg === undefined ? window.frameRate : window.frameRate = arg
window.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.min = Math.min
window.max = Math.max
window.map = (e,t,n,r,i) => r+(i-r)*((e-t)/(n-t))
window.rgba = (...colors) => `rgba(${[...colors].map(c => c.toFixed(0))})`
window.comp = arg => graphics.globalCompositeOperation = arg
window.doffset = arg => graphics.lineDashOffset = arg
window.ldash = arg => graphics.setLineDash(arg)
window.ljoin = arg => graphics.lineJoin = arg
window.shblur = arg => graphics.shadowBlur = arg
window.shcolor = arg => graphics.shadowColor = arg
window.shoffx = arg => graphics.shadowOffsetX = arg
window.shoffy = arg => graphics.shadowOffsetY = arg
window.ellips = (x, y, w, h, r) =>
    graphics.ellipse(x, y, w, h, r ? r * Math.PI / 180 : 0, 0 , 2 * Math.PI)
window.sellips = (...args) => { begin(); ellips(...args); stroke() }
window.fellips = (...args) => { begin(); ellips(...args); fill() }
window.lgrad = (...args) => {
    let g = graphics.createLinearGradient(...args)
    g.stop = (...args) => { g.addColorStop(...args); return g }
    return g
}
window.rgrad = (...args) => {
    let g = graphics.createRadialGradient(...args)
    g.stop = (...args) => { g.addColorStop(...args); return g }
    return g
}
window.onmousemove = event => {
    window.mx = event.clientX
    window.my = event.clientY
}
window.gimg = ((src, cb) => {
    let cache = {}
    return (src, cb) => {
        let img = cache[src]
        if (img) return cb(img)
        img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = src
        img.onload = () => {
            cache[src] = img
            cb(img)
        }
    }
})()
window.drimg = (...args) => graphics.drawImage(...args)
window.codefg = remember(color => {
    let style = document.createElement('style')
    let rule = `
        output,
        .CodeMirror-line span,
        .CodeMirror-cursor {
            color: ${color} !important;
            border-color: ${color} !important;
        }
    `
    document.head.appendChild(style)
    style.sheet.insertRule(rule)
})

window.codebg = remember(color => {
    let style = document.createElement('style')
    let rule = `
        .CodeMirror-selected,
        .CodeMirror-line::selection,
        .CodeMirror-line > span::selection,
        .CodeMirror-line > span > span::selection,
        .CodeMirror-line span,
        output {
            background: ${color} !important;
        }
    `
    document.head.appendChild(style)
    style.sheet.insertRule(rule)
})

window.onresize = editor.resize
window.onpopstate = editor.init
window.onclick = editor.focus

editor.resize()
editor.init()
editor.focus()

requestAnimationFrame(function loop() {
    editor.evaluate()
    setTimeout(requestAnimationFrame, 1000 / fps(), loop)
})

console.log('https://github.com/htor/repeat-editor')
