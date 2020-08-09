title('cellular automata')

fps(60)
clearf(false)
clear()

let y = 1
let box = { x: 450, y: 100, width: 500, height: 500 }
let idata = gidata(box.x, box.y, box.width, box.height)
let pixels = idata.data
let rules = [0,1,0,0,1,0,1,1]
// let rules = [1,0,0,0,0,0,0,1]
// let rules = Array(8).fill(0).map(i => rand(0,1) > 0.5 ? 1 : 0)

pixels[point2idx(box.width/2,y-1)+3] = 255

// 1 = white, 0 = black
function rule (left, center, right) {
  if (left && center && right) return rules[0]
  if (left && center && !right) return rules[1]
  if (left && !center && right) return rules[2]
  if (left && !center && !right) return rules[3]
  if (!left && center && right) return rules[4]
  if (!left && center && !right) return rules[5]
  if (!left && !center && right) return rules[6]
  if (!left && !center && !right) return rules[7]
}

function point2idx (x, y) {
  return (y * box.width + x) * 4
}

function draw () {
  for (let x = 1; x < box.width; x++) {
    let left = pixels[point2idx(x-1, y-1)+3]
    let center = pixels[point2idx(x, y-1)+3]
    let right = pixels[point2idx(x+1, y-1)+3]
    if (rule(left,center,right)) {
      pixels[point2idx(x, y)+3] = 255
    }
  }
  if (++y > box.height) return
  pidata(idata, box.x, box.y)
  log(`[${rules.join(',')}]`)
}
