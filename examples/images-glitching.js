// fetch image and re-draw it

title('image$ glitching')
clearf(false)

const img = gimg('https://i.imgur.com/S7m2aFQ.jpg')

function draw () {
  let t = Math.ceil(abs(sin(ms() * 0.0001)) * 10)
  fps(t)
  let s = [w, w, w / 2, w / 4][rand(0, 4)]
  dimg(img, 0, 0, s, s)
  let d = ctx.getImageData(0, 0, h, h)
  let x = rand(-w, w)
  let y = rand(-h, h)
  ctx.putImageData(d, x, y)
}
