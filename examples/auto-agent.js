title('auto agent')

let SOUTH = 0, EAST = 1, NORTH = 2, WEST = 3
let direction = NORTH
let box = {
  x: 500,
  y: 200,
  size: 222
}
let x = y = box.size / 2

fps(40)
clear()
clearf(false)
treset()
tslate(box.x, box.y)
fstyle('black')
frect(0, 0, box.size, box.size)

function point2idx (x, y) {
  return (y * box.size + x) * 4
}

function draw () {
  let idata = gidata(box.x, box.y, box.size, box.size)
  let pixels = idata.data


  if (direction === SOUTH) {
    if (++y === box.size) y = 0
  } else if (direction === EAST) {
    if (++x === box.size) x = 0
  } else if (direction === NORTH) {
    if (y === 0) y = box.size - 1
    else y--
  } else if (direction === WEST) {
    if (x === 0) x = box.size - 1
    else x--
  }

  let pixel = point2idx(x, y)
  if (pixels[pixel] === 255) {
    pixels[pixel] = 0
    pixels[pixel+1] = 0
    pixels[pixel+2] = 0
    pixels[pixel+3] = 255
    if (direction === SOUTH) {
      direction = WEST
    } else {
      direction--
    }
  } else {
    pixels[pixel] = 255
    pixels[pixel+1] = 255
    pixels[pixel+2] = 255
    pixels[pixel+3] = 255
    if (direction === WEST) {
      direction = SOUTH
    } else {
      direction++
    }
  }
  pidata(idata, box.x, box.y)
}
