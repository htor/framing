title('computer v—i—s—i—on')
fps(12)
clearf(true)

let video = capture({ video: true })
let width = 500
let height = 500

function draw(frame) {
  let bp = (bx = by = 0)
  let dp = 255
  let dx = (dy = 0)

  dimageoff(video, 0, 0, width, height)
  let vidata = gidataoff(0, 0, width, height)
  let pixels = vidata.data
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let p = pixels[(y * width + x) * 4]
      if (p > bp) {
        bp = p
        bx = x
        by = y
      } else if (p < dp) {
        dp = p
        dx = x
        dy = y
      }
    }
  }
  pidata(vidata, 200, 100)

  push()
  sstyle('white')
  tslate(200, 100)
  srect(dx - 15, dy - 15, 30, 30)
  stext(`darkest`, dx + 25, dy)
  stext(`${dp},${dx},${dy}`, dx + 25, dy + 15)

  srect(bx - 15, by - 15, 30, 30)
  stext(`brightest`, bx + 25, by)
  stext(`${bp},${bx},${by}`, bx + 25, by + 15)
  pop()
}
