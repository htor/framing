title('dual gradient')
clear()
s=20
for(x=0;x<w;x+=s) {
  a=map(x,0,w,255,0)
  aa=map(x,0,w,0,255)
  fstyle(`rgb(${a},${a},${a})`)
  frect(x,0,s,h)
  fstyle(`rgb(${aa},${aa},${aa})`)
  frect(x,h/2,s,h)
}
