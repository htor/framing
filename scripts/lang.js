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
let frameCount = 0
let clearFrame = true
let shouldLoop = true
let frameTimer = null

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
window.move = (...args) => ctx.moveTo(...args)
window.line = (...args) => ctx.lineTo(...args)
window.cubicc = (...args) => ctx.bezierCurveTo(...args)
window.quadc = (...args) => ctx.quadraticCurveTo(...args)
window.close = () => ctx.closePath()
window.stroke = () => ctx.stroke()
window.fill = () => ctx.fill()
window.rect = (...args) => ctx.rect(...args)
window.srect = (...args) => ctx.strokeRect(...args)
window.frect = (...args) => ctx.fillRect(...args)
window.point = (x, y) => frect(x, y, 2, 2)
window.arc = (...args) => ctx.arc(...args)
window.arcc = (...args) => ctx.arcTo(...args)
window.triang = (x1, y1, x2, y2, x3, y3) => { begin(); line(x1, y1); line(x2, y2); line(x3, y3); close() }
window.striang = (...args) => { triang(...args); stroke() }
window.ftriang = (...args) => { triang(...args); fill() }
window.quad = (x1, y1, x2, y2, x3, y3, x4, y4) => { begin(); line(x1, y1); line(x2, y2); line(x3, y3); line(x4, y4); close() }
window.squad = (...args) => { quad(...args); stroke() }
window.fquad = (...args) => { quad(...args); fill() }
window.ellips = (x, y, w, h, r) => { begin(); ctx.ellipse(x, y, w, h, r ? r * PI / 180 : 0, 0, TWO_PI) }
window.sellips = (...args) => { ellips(...args); stroke() }
window.fellips = (...args) => { ellips(...args); fill() }
window.pinp = (...args) => ctx.isPointInPath(...args)
window.pins = (...args) => ctx.isPointInStroke(...args)

window.push = () => ctx.save()
window.pop = () => ctx.restore()
window.tslate = (...args) => ctx.translate(...args)
window.rotate = (degs) => ctx.rotate(degs * PI / 180)
window.scale = (...args) => ctx.scale(...args)
window.treset = () => ctx.setTransform(1, 0, 0, 1, 0, 0)
window.clear = () => ctx.clearRect(0, 0, w, h)
window.clearf = (arg) => clearFrame = arg
window.bground = (arg) => { push(); fstyle(arg); frect(0, 0, w, h); pop() }
window.ms = () => (new Date()) - startTime
window.fps = (arg) => frameRate = arg
window.title = (title) => document.title = title
window.loop = (arg) => shouldLoop = arg
window.log = (...args) => logMessage(args.join(','))

window.rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
window.map = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * ((value - low1) / (high1 - low1))
window.norm = (value, low, high) => (value - low) / (high - low)
window.rseed = (seed) => seed !== randomSeed && seedrandom((randomSeed = seed), { global: true })
window.noise = (x, y) => simplex.noise2D(x, y)

window.comp = (arg) => ctx.globalCompositeOperation = arg
window.alpha = (arg) => ctx.globalAlpha = arg
window.sstyle = (arg) => ctx.strokeStyle = arg
window.fstyle = (arg) => ctx.fillStyle = arg
window.ftext = (...args) => ctx.fillText(...args)
window.stext = (...args) => ctx.strokeText(...args)
window.font = (arg) => ctx.font = arg
window.lwidth = (arg) => ctx.lineWidth = arg
window.lcap = (arg) => ctx.lineCap = arg
window.doffset = (arg) => ctx.lineDashOffset = arg
window.ldash = (arg) => ctx.setLineDash(arg)
window.ljoin = (arg) => ctx.lineJoin = arg
window.shblur = (arg) => ctx.shadowBlur = arg
window.shcolor = (arg) => ctx.shadowColor = arg
window.shoffx = (arg) => ctx.shadowOffsetX = arg
window.shoffy = (arg) => ctx.shadowOffsetY = arg
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
  const img = new Image(arg)
  img.crossOrigin = 'anonymous'
  img.src = arg
  return img
}
window.dimg = (...args) => ctx.drawImage(...args)

window.onresize = () => {
  window.w = canvas.width = window.innerWidth
  window.h = canvas.height = window.innerHeight
  evalCode(lastCode)

}
window.onmousemove = (event) => {
  window.mx = event.clientX
  window.my = event.clientY
}

function logMessage (message) {
  if (String(message) !== output.textContent) {
    output.textContent = message
  }
}

export function evalCode (code) {
  window.clearTimeout(frameTimer)
  window.setup = window.draw = frameCount = 0
  try {
    logMessage(realEval(code))
    lastCode = code
    window.requestAnimationFrame(function drawFrame () {
      try {
        if (window.draw) {
          if (clearFrame) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
          }
          window.draw(++frameCount)
        }
      } catch (error) {
        logMessage(error.message)
      }
      if (shouldLoop) {
        frameTimer = setTimeout(() => {
          window.requestAnimationFrame(drawFrame)
        }, 1000 / frameRate)
      }
    })
  } catch (error) {
    logMessage(error.message)
  }
}
