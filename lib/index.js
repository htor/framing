import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import OpenSimplex from 'open-simplex-noise'
import seedrandom from 'seedrandom'
import {
  getQueryParam,
  setQueryParam,
  setFavicon,
  vendorPrefix
} from './utils'
import './index.css'

const simplex = new OpenSimplex()
const input = document.querySelector('code')
const output = document.querySelector('output')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let editor
let code
let prevCode
let isFullscreen
let isHidden
let frameRate = 120
let startTime = new Date()
let randomSeed

function setup () {
  editor = editor || CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    extraKeys: {
      'Cmd-Enter': save,
      'Ctrl-Enter': save,
      'Tab': (cm) => cm.replaceSelection('    '),
      'Alt-H': hide,
      'Alt-F': full
    }
  })
  let id = getQueryParam('id')
  editor.setValue(code = id ? decodeURIComponent(atob(id)) : ' ')
  isHidden = getQueryParam('hide') === 'true'
  editor.focus()
}

function full () {
  isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullscreen = !isFullscreen
}

function save (cm) {
  code = cm.getValue()
  setQueryParam('id', btoa(encodeURIComponent(code)))
  setFavicon()
}

function hide () {
  input.classList.toggle('hidden', isHidden)
  output.classList.toggle('hidden', isHidden)
  setQueryParam('hide', isHidden)
  isHidden = !isHidden
}

function resize () {
  canvas.width = window.w = window.innerWidth
  canvas.height = window.h = window.innerHeight
}

function focus () {
  editor.focus()
}

function start () {
  setup()
  hide()
  resize()
  setFavicon()
  focus()
  requestAnimationFrame(function loop() {
    let result
    try {
      result = eval(code)
      prevCode = code
    } catch (error) {
      result = error.message
      eval(prevCode)
    } finally {
      if (String(result) !== output.textContent)
      output.textContent = result
    }
    setTimeout(requestAnimationFrame, 1000 / frameRate, loop)
  })
}

window.ctx = ctx
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.min = Math.min
window.max = Math.max
window.PI = Math.PI
window.TWO_PI = Math.PI * 2
window.mx = window.my = 0
window.begin = () => ctx.beginPath()
window.close = () => ctx.closePath()
window.stroke = () => ctx.stroke()
window.fill = () => ctx.fill()
window.line = (...args) => ctx.lineTo(...args)
window.move = (...args) => ctx.moveTo(...args)
window.rect = (...args) => ctx.rect(...args)
window.srect = (...args) => ctx.strokeRect(...args)
window.frect = (...args) => ctx.fillRect(...args)
window.point = (x, y) => frect(x, y, 2, 2);
window.sstyle = (arg) => ctx.strokeStyle = arg
window.fstyle = (arg) => ctx.fillStyle = arg
window.font = (arg) => ctx.font = arg
window.lwidth = (arg) => ctx.lineWidth = arg
window.lcap = (arg) => ctx.lineCap = arg
window.ftext = (...args) => ctx.fillText(...args)
window.stext = (...args) => ctx.strokeText(...args)
window.push = () => ctx.save()
window.pop = () => ctx.restore()
window.rotate = (degs) => ctx.rotate(degs * window.PI / 180)
window.tslate = (...args) => ctx.translate(...args)
window.scale = (...args) => ctx.scale(...args)
window.treset = () => ctx.setTransform(1, 0, 0, 1, 0, 0)
window.clear = (arg) => arg === false ? arg : ctx.clearRect(0, 0, w, h)
window.bground = (arg) => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
window.ms = () => (new Date()) - startTime
window.fps = (arg) => frameRate = arg
window.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
window.rseed = (seed) => seed !== randomSeed && seedrandom((randomSeed = seed), { global: true })
window.noise = (x, y) => simplex.noise2D(x, y)
window.norm = (value, low, high)  => (value - low) / (high - low)
window.map = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * ((value - low1) / (high1 - low1))
window.rgba = (...colors) => `rgba(${[...colors].map(c => c.toFixed(0))})`
window.comp = (arg) => ctx.globalCompositeOperation = arg
window.doffset = (arg) => ctx.lineDashOffset = arg
window.ldash = (arg) => ctx.setLineDash(arg)
window.ljoin = (arg) => ctx.lineJoin = arg
window.shblur = (arg) => ctx.shadowBlur = arg
window.shcolor = (arg) => ctx.shadowColor = arg
window.shoffx = (arg) => ctx.shadowOffsetX = arg
window.shoffy = (arg) => ctx.shadowOffsetY = arg
window.triang = (x1,y1,x2,y2,x3,y3) => { begin(); line(x1,y1); line(x2,y2); line(x3,y3); close() }
window.striang = (...args) => { triang(...args); stroke() }
window.ftriang = (...args) => { triang(...args); fill() }
window.quad = (x1,y1,x2,y2,x3,y3,x4,y4) => { begin(); line(x1,y1); line(x2,y2); line(x3,y3); line(x4,y4); close() }
window.squad = (...args) => { quad(...args); stroke() }
window.fquad = (...args) => { quad(...args); fill() }
window.ellips = (x, y, w, h, r) => { begin(); ctx.ellipse(x,y,w,h,r ? r * window.PI / 180 : 0, 0 , window.TWO_PI) }
window.sellips = (...args) => { ellips(...args); stroke() }
window.fellips = (...args) => { ellips(...args); fill() }
window.lgrad = (...args) => {
  let g = ctx.createLinearGradient(...args)
  g.stop = (...args) => { g.addColorStop(...args); return g }
  return g
}
window.rgrad = (...args) => {
  let g = ctx.createRadialGradient(...args)
  g.stop = (...args) => { g.addColorStop(...args); return g }
  return g
}
window.gimg = (() => {
  let cache = {}
  return (src, cb) => {
    let img = cache[src]
    if (img) return cb(img)
    img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = img.onerror = () => cb(cache[src] = img)
    img.src = src
  }
})()

window.drimg = (...args) => { try { ctx.drawImage(...args) } catch (err) {} }

window.onmousemove = ({ clientX, clientY }) => {
  window.mx = clientX
  window.my = clientY
}
window.onclick = focus
window.onresize = resize
window.onpopstate = setup

document.exitFullscreen = vendorPrefix('exitFullscreen', document)
  || vendorPrefix('cancelFullScreen', document)
document.documentElement.requestFullscreen = vendorPrefix('requestFullscreen', document.documentElement)
  || vendorPrefix('requestFullScreen', document.documentElement)

start()
