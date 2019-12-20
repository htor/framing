import OpenSimplex from 'open-simplex-noise'
import seedrandom from 'seedrandom'

const startTime = new Date()
const output = document.querySelector('output')
const canvas = document.querySelector('canvas')
const simplex = new OpenSimplex()
const realEval = eval
let lastCode = ''
let randomSeed = 0
let frameRate = 120
let clearFrame = true
let shouldLoop = true
let frameTimer

window.ctx = canvas.getContext('2d')
window.sin = Math.sin
window.cos = Math.cos
window.abs = Math.abs
window.min = Math.min
window.max = Math.max
window.PI = Math.PI
window.TWO_PI = Math.PI * 2
window.w = window.innerWidth
window.h = window.innerHeight
window.mx = 0
window.my = 0
window.begin = () => ctx.beginPath()
window.close = () => ctx.closePath()
window.stroke = () => ctx.stroke()
window.fill = () => ctx.fill()
window.line = (...args) => ctx.lineTo(...args)
window.move = (...args) => ctx.moveTo(...args)
window.rect = (...args) => ctx.rect(...args)
window.srect = (...args) => ctx.strokeRect(...args)
window.frect = (...args) => ctx.fillRect(...args)
window.point = (x, y) => frect(x, y, 2, 2)
window.sstyle = (arg) => ctx.strokeStyle = arg
window.fstyle = (arg) => ctx.fillStyle = arg
window.font = (arg) => ctx.font = arg
window.lwidth = (arg) => ctx.lineWidth = arg
window.lcap = (arg) => ctx.lineCap = arg
window.ftext = (...args) => ctx.fillText(...args)
window.stext = (...args) => ctx.strokeText(...args)
window.push = () => ctx.save()
window.pop = () => ctx.restore()
window.rotate = (degs) => ctx.rotate(degs * PI / 180)
window.tslate = (...args) => ctx.translate(...args)
window.scale = (...args) => ctx.scale(...args)
window.treset = () => ctx.setTransform(1, 0, 0, 1, 0, 0)
window.clear = (arg) => clearFrame = arg
window.bground = (arg) => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
window.ms = () => (new Date()) - startTime
window.fps = (arg) => frameRate = arg
window.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
window.rseed = (seed) => seed !== randomSeed && seedrandom((randomSeed = seed), { global: true })
window.noise = (x, y) => simplex.noise2D(x, y)
window.norm = (value, low, high) => (value - low) / (high - low)
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
window.triang = (x1, y1, x2, y2, x3, y3) => { begin(); line(x1, y1); line(x2, y2); line(x3, y3); close() }
window.striang = (...args) => { triang(...args); stroke() }
window.ftriang = (...args) => { triang(...args); fill() }
window.quad = (x1, y1, x2, y2, x3, y3, x4, y4) => { begin(); line(x1, y1); line(x2, y2); line(x3, y3); line(x4, y4); close() }
window.squad = (...args) => { quad(...args); stroke() }
window.fquad = (...args) => { quad(...args); fill() }
window.ellips = (x, y, w, h, r) => { begin(); ctx.ellipse(x, y, w, h, r ? r * PI / 180 : 0, 0, TWO_PI) }
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
window.gimg = (arg) => {
  return new Promise((resolve, reject) => {
    let img = new Image(arg)
    img.crossOrigin = 'anonymous'
    img.onload = resolve(img)
    img.onerror = reject()
    img.src = arg
  })
}
window.drimg = (...args) => ctx.drawImage(...args)
window.onresize = () => {
  window.w = canvas.width = window.innerWidth
  window.h = canvas.height = window.innerHeight
  evalCode(lastCode)

}
window.onmousemove = (event) => {
  window.mx = event.clientX
  window.my = event.clientY
}
window.loop = (arg) => shouldLoop = arg
window.log = (...args) => logMessage(args.join(','))


function logMessage (message) {
  if (String(message) !== output.textContent) {
    output.textContent = message
  }
}

function drawFrame () {
  if (clearFrame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  try {
    draw()
  } catch (error) {
    logMessage(error.message)
  }
  if (shouldLoop) {
    frameTimer = setTimeout(() => {
      window.requestAnimationFrame(drawFrame)
    }, 1000 / frameRate)
  }
}

export function evalCode (code) {
  window.clearTimeout(frameTimer)
  try {
    logMessage(realEval(code))
    lastCode = code
    window.setup && window.setup()
    window.draw && window.requestAnimationFrame(drawFrame)
  } catch (error) {
    logMessage(error.message)
  }
}
