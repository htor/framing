// spinning boxes made
// using transforms

title('spinning boxes')

function draw () {
  push()
  fstyle('gold')
  tslate(w / 2, h / 2)
  rotate(-ms() / 20)
  frect(-150, -150, 300, 300)
  pop()

  push()
  fstyle('tomato')
  tslate(w / 2, h / 2)
  rotate(ms() / 20)
  frect(-50, -50, 100, 100)
  pop()
}
