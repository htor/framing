// generate alien activity
let psize = 7, achan, tfactor = 10e-7
for (var x=0;x<w;x+= psize) {
  for (var y = 0; y < h; y += psize) {
    achan = 111 & (y * (x - y)) * ms() * tfactor
    achan = map(achan, 0, 11&y, 0, 1)
    fstyle(`rgba(0, 0, 0, ${achan})`)
    frect(x, y, psize, psize)
  }
}
