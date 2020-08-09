title('modulating video strm')
fps(12)
clearf(true)
let video = capture({ video: true })
let width = 500
let height = 500

function draw () {
  let r = floor(map(sin(ms()*.001),-1,1,0,255))
  dimageoff(video, 0, 0, width,height)
  let vidata = gidataoff(0,0,width,height)
  let pixels = vidata.data
  for (let i = 0; i < pixels.length; i+=4) {
    let p = pixels[i]
    if (p <= 68) {
      pixels[i] = r /2
      pixels[i+2] = 255 - r
    }
  }
  pidata(vidata,200,100)
}
