// color pattern

title('color pattern')

let x
let y
let c
let s = 40
for (x = 0; x < w; x += s) {
  for (y = 0; y < h; y += s) {
    c = `rgba(${255 & (x + y)},${255 - y},${255 - x},1)`
    fstyle(c)
    frect(x, y, s, s)
  }
}
c
