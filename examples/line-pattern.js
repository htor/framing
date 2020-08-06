title('line pattern')

let x; let y; let x2; let y2; let s = 12
lwidth(0.5)
begin()
for (x = 0; x < w; x += s) {
  for (y = 0; y < h; y += s) {
    x2 = min(y & x, y)
    y2 = y | x >> y
    move(x, y)
    line(x2, y2)
  }
}
stroke()
