import {
  init as __init,
  code as __code,
  seedrandom,
  OpenSimplex
} from './repeat-editor.min.js'

__init()

let __randomSeed
let __frameRate = 120
let __frameClear = true
let __startTime = new Date()
let __output = document.querySelector('output')
let __canvas = document.querySelector('canvas')
const __simplex = new OpenSimplex()
const ctx = __canvas.getContext('2d')
const sin = Math.sin
const cos = Math.cos
const abs = Math.abs
const min = Math.min
const max = Math.max
const PI = Math.PI
const TWO_PI = Math.PI * 2
const mx = 0, my = 0
const begin = () => ctx.beginPath()
const close = () => ctx.closePath()
const stroke = () => ctx.stroke()
const fill = () => ctx.fill()
const line = (...args) => ctx.lineTo(...args)
const move = (...args) => ctx.moveTo(...args)
const rect = (...args) => ctx.rect(...args)
const srect = (...args) => ctx.strokeRect(...args)
const frect = (...args) => ctx.fillRect(...args)
const point = (x, y) => frect(x, y, 2, 2);
const sstyle = (arg) => ctx.strokeStyle = arg
const fstyle = (arg) => ctx.fillStyle = arg
const font = (arg) => ctx.font = arg
const lwidth = (arg) => ctx.lineWidth = arg
const lcap = (arg) => ctx.lineCap = arg
const ftext = (...args) => ctx.fillText(...args)
const stext = (...args) => ctx.strokeText(...args)
const push = () => ctx.save()
const pop = () => ctx.restore()
const rotate = (degs) => ctx.rotate(degs * PI / 180)
const tslate = (...args) => ctx.translate(...args)
const scale = (...args) => ctx.scale(...args)
const treset = () => ctx.setTransform(1, 0, 0, 1, 0, 0)
const clear = (arg) => __frameClear = arg
const bground = (arg) => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
const ms = () => (new Date()) - __startTime
const fps = (arg) => __frameRate = arg
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const rseed = (seed) => seed !== __randomSeed && seedrandom((__randomSeed = seed), { global: true })
const noise = (x, y) => __simplex.noise2D(x, y)
const norm = (value, low, high)  => (value - low) / (high - low)
const map = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * ((value - low1) / (high1 - low1))
const rgba = (...colors) => `rgba(${[...colors].map(c => c.toFixed(0))})`
const comp = (arg) => ctx.globalCompositeOperation = arg
const doffset = (arg) => ctx.lineDashOffset = arg
const ldash = (arg) => ctx.setLineDash(arg)
const ljoin = (arg) => ctx.lineJoin = arg
const shblur = (arg) => ctx.shadowBlur = arg
const shcolor = (arg) => ctx.shadowColor = arg
const shoffx = (arg) => ctx.shadowOffsetX = arg
const shoffy = (arg) => ctx.shadowOffsetY = arg
const triang = (x1,y1,x2,y2,x3,y3) => { begin(); line(x1,y1); line(x2,y2); line(x3,y3); close() }
const striang = (...args) => { triang(...args); stroke() }
const ftriang = (...args) => { triang(...args); fill() }
const quad = (x1,y1,x2,y2,x3,y3,x4,y4) => { begin(); line(x1,y1); line(x2,y2); line(x3,y3); line(x4,y4); close() }
const squad = (...args) => { quad(...args); stroke() }
const fquad = (...args) => { quad(...args); fill() }
const ellips = (x, y, w, h, r) => { begin(); ctx.ellipse(x,y,w,h,r ? r * PI / 180 : 0, 0 , TWO_PI) }
const sellips = (...args) => { ellips(...args); stroke() }
const fellips = (...args) => { ellips(...args); fill() }
const lgrad = (...args) => {
  let g = ctx.createLinearGradient(...args)
  g.stop = (...args) => { g.addColorStop(...args); return g }
  return g
}
const rgrad = (...args) => {
  let g = ctx.createRadialGradient(...args)
  g.stop = (...args) => { g.addColorStop(...args); return g }
  return g
}
const gimg = (() => {
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

const drimg = (...args) => ctx.drawImage(...args)

let __result
requestAnimationFrame(function __loop() {
  try {
    if (__frameClear) ctx.clearRect(0, 0, w, h)
    __result = eval(__code.curr)
    __code.prev = __code.curr
  } catch (__error) {
    __result = __error.message
    try { eval(__code.prev) } catch (_) {}
  } finally {
    if (String(__result) !== __output.textContent)
    __output.textContent = __result
  }
  setTimeout(requestAnimationFrame, 1000 / __frameRate, __loop)
})
