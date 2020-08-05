title('htor TUBE')

let s = 20
fstyle('white')

function draw () {
  bground('black')
  push()
  tslate(0, h/2)
  
  let freq1 = map(sin(ms()*0.0001),-1,1,50,200)
  let freq2 = map(cos(ms()*0.0001),-1,1,50,200)
  let freq3 = map(freq1 + freq2,100,400,50,200)
  
  drawHtor(freq1, 222)
  drawHtor(freq2, 222)
  drawHtor(freq3, 222)
  pop()
}

function drawHtor (freq, amp, sym) {
  for (let i = 0; i < w; i+=s) {
    let j = sin(i/freq) * amp
    ftext('H·T·O·R', i,j)
  }
}



