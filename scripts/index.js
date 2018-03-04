import { graphics } from './graphics'
import { compose, print } from './tools'
import * as editor from './editor'

window.width = window.innerWidth
window.height = window.innerWidth
window.clear = () => graphics.clearRect(0, 0, width, height)
window.srect = (...args) => graphics.strokeRect(...args)
window.frect = (...args) => graphics.fillRect(...args)
window.sstyle = (arg) => graphics.strokeStyle = arg
window.fstyle = (arg) => graphics.fillStyle = arg
window.move = (...args) => graphics.moveTo(...args)
window.rotate = (degs) => graphics.rotate(degs * Math.PI / 180)
window.transl = (...args) => graphics.translate(...args)

window.onresize = graphics.resize
window.onclick = editor.focus
window.onkeydown = compose(editor.resize, editor.evaluate)
window.onkeyup = editor.resize

editor.resize()
graphics.resize()
graphics.draw()
