// endless xor-ing pattern

title('XOR scorrier')

let s1 = 5,
  s2 = 5
function draw() {
  let t = ms() * 0.001
  for (let x = 0; x < w; x += s1, s1 += 0.0001, s2 += 0.00001) {
    for (let y = 0; y < h; y += s2) {
      frect(x ^ (y & t), y, 10, 10)
    }
  }
}
