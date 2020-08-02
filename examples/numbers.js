// raining numbers

let x; let y; let s = 14; t = ms()
fps(50)
font(`${s}px monospace`)
fstyle('orange')
fps(60)

function draw () {
  t = ms()
  for (x = 0; x < w; x += s) {
    for (y = 0; y < h; y += s) {
      ftext((x & y - (t % x)), x, y)
    }
  }
  log(x)
}
