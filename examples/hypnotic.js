// generate hypnotic pattern

title('hypnotic')

var psize = 22
var achan = 255
var tfactor = 0.000028
fps(56)

function draw() {
  for (var x = 0; x < w; x += psize) {
    for (var y = 0; y < h; y += psize) {
      achan = 255 & (x * (y - x) * ms() * tfactor)
      achan = map(achan, 0, 255, 0, 1)
      fstyle(`rgba(0, 0, 0, ${achan})`)
      frect(x, y, psize, psize)
    }
  }
}
