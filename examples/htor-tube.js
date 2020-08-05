// sinusoidal text forming an htor tube

title('htor TUBE')
fps(40)

let s = 22
fstyle('white')

function drawHtor (freq, amp, sym) {
  for (let i = 0; i < w; i+=s) {
    let j = sin(i/freq) * amp + h/2
    ftext('H·T·O·R', i,j)
  }
}

function draw () {
  bground('black')
  let freq1 = map(sin(ms()*0.0001),-1,1,50,200)
  let freq2 = map(cos(ms()*0.0001),-1,1,50,200)
  let freq3 = map(freq1 + freq2,100,400,50,200)
  drawHtor(freq1, 222)
  drawHtor(freq2, 222)
  drawHtor(freq3, 222)
}
