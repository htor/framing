// color pattern using rgba function
let x,y,c,s=8
for (x=0;x<w;x+=s) {
  for (y=0;y<h;y+=s) {
    c=[255&(max(x,y)),255&(x^y),255&~(x*y),1]
    fstyle(rgba(c))
    frect(x,y,s,s)
  }
}
