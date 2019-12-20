// breathing gradient

function draw () {
  let t = abs(sin(ms() * 0.0002) * 255)
  let g = rgrad(w / 2, h / 2, w / 4, w / 2, h / 2, 0)
  let c = rgba(255, t ^ 255, t, 1)
  g.stop(0, 'black')
  .stop(0.4, c)
  .stop(1, 'cyan')
  fstyle(g)
  frect(0, 0, w, h)
}
