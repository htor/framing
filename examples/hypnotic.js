// generate hypnotic pattern
let psize = 13, achan = 255, tfactor = 0.000028
for (var x=0;x<w;x+= psize) {
  for (var y = 0; y < h; y += psize) {
    achan = 255 & (x * (y - x)) * millis() * tfactor
    achan = map(achan, 0, 255, 0, 1)
    fstyle(`rgba(0, 0, 0, ${achan})`)
    frect(x, y, psize, psize)
  }
}
