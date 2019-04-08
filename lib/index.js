import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import OpenSimplex from 'open-simplex-noise'
import seedrandom from 'seedrandom'
import {
  remember,
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
let isBlended
let isHidden

const setup = () => {
  editor = editor || CodeMirror(input, {
    mode: { name: 'javascript', globalVars: true },
    lineWrapping: true,
    extraKeys: {
      'Cmd-Enter': save,
      'Ctrl-Enter': save,
      'Tab': (cm) => cm.replaceSelection('  '),
      'Alt-H': hide,
      'Alt-F': full
    }
  })
  editor.setValue(code = decodeURIComponent(atob(getQueryParam('id') || '')))
  isHidden = getQueryParam('hide') === 'true'
  editor.focus()
}

const full = () => {
  isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullscreen = !isFullscreen
}

const save = (cm) => {
  code = cm.getValue()
  setQueryParam('id', btoa(encodeURIComponent(code)))
  setFavicon()
}

const hide = () => {
  input.classList.toggle('hidden', isHidden)
  output.classList.toggle('hidden', isHidden)
  setQueryParam('hide', isHidden)
  isHidden = !isHidden
}

const resize = () => {
  canvas.width = window.w = window.innerWidth
  canvas.height = window.h = window.innerHeight
}

const focus = () => editor.focus()

window.ctx = ctx
window.w = ctx.canvas.height
window.h = ctx.canvas.width
window.mx = window.my = 0
window.startDate = new Date()
window.frameRate = 120
window.begin = () => ctx.beginPath()
window.close = () => ctx.closePath()
window.stroke = () => ctx.stroke()
window.fill = () => ctx.fill()
window.line = (...args) => ctx.lineTo(...args)
window.move = (...args) => ctx.moveTo(...args)
window.rect = (...args) => ctx.rect(...args)
window.srect = (...args) => ctx.strokeRect(...args)
window.frect = (...args) => ctx.fillRect(...args)
window.sstyle = (arg) => ctx.strokeStyle = arg
window.fstyle = (arg) => ctx.fillStyle = arg
window.font = (arg) => ctx.font = arg
window.lwidth = (arg) => ctx.lineWidth = arg
window.lcap = (arg) => ctx.lineCap = arg
window.ftext = (...args) => ctx.fillText(...args)
window.stext = (...args) => ctx.strokeText(...args)
window.push = () => ctx.save()
window.pop = () => ctx.restore()
window.rotate = (degs) => ctx.rotate(degs * Math.PI / 180)
window.tslate = (...args) => ctx.translate(...args)
window.scale = (...args) => ctx.scale(...args)
window.treset = () => ctx.setTransform(1, 0, 0, 1, 0, 0)
window.clear = (arg) => arg === false ? arg : ctx.clearRect(0, 0, w, h)
window.bground = (arg) => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
window.ms = () => (new Date()) - startDate
window.fps = (arg) => arg === undefined ? window.frameRate : window.frameRate = arg
window.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
window.rseed = (seed) => seed !== window.seed && seedrandom((window.seed = seed), { global: true })
window.noise = (x, y) => simplex.noise2D(x, y)
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.min = Math.min
window.max = Math.max
window.PI = Math.PI
window.TWO_PI = Math.PI * 2
window.map = (e,t,n,r,i) => r+(i-r)*((e-t)/(n-t))
window.rgba = (...colors) => `rgba(${[...colors].map(c => c.toFixed(0))})`
window.comp = (arg) => ctx.globalCompositeOperation = arg
window.doffset = (arg) => ctx.lineDashOffset = arg
window.ldash = (arg) => ctx.setLineDash(arg)
window.ljoin = (arg) => ctx.lineJoin = arg
window.shblur = (arg) => ctx.shadowBlur = arg
window.shcolor = (arg) => ctx.shadowColor = arg
window.shoffx = (arg) => ctx.shadowOffsetX = arg
window.shoffy = (arg) => ctx.shadowOffsetY = arg
window.ellips = (x, y, w, h, r) => ctx.ellipse(x, y, w, h, r ? r * window.PI / 180 : 0, 0 , window.TWO_PI)
window.sellips = (...args) => { begin(); ellips(...args); stroke() }
window.fellips = (...args) => { begin(); ellips(...args); fill() }
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
window.gimg = ((src, cb) => {
  let cache = {}
  return (src, cb) => {
    let img = cache[src]
    if (img) return cb(img)
    img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = () => cb(cache[src] = img)
  }
})()
window.drimg = (...args) => ctx.drawImage(...args)

window.onmousemove = ({ clientX, clientY }) => {
  window.mx = clientX
  window.my = clientY
}
window.onclick = focus
window.onresize = resize
window.onpopstate = setup

document.exitFullscreen = vendorPrefix('exitFullscreen', document) || vendorPrefix('cancelFullScreen', document)
document.documentElement.requestFullscreen = vendorPrefix('requestFullscreen', document.documentElement) || vendorPrefix('requestFullScreen', document.documentElement)

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
  setTimeout(requestAnimationFrame, 1000 / fps(), loop)
})
