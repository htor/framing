// generate 2-dimensional texture with noise function
// this is using simplex underneath (perlin-like)

title('noise')

function draw () {
  let s = 18
  let x = 0; let y = 0; let inc = 0.048
  for (let i = 0; i < w; i += s, x = 0, y += inc) {
    for (let j = 0; j < h; j += s, x += inc) {
      let n = map(noise(x, y), -1, 1, 0, 1)
      fstyle(`rgba(0,0,0,${n})`)
      frect(i, j, s, s)
    }
  }
}
