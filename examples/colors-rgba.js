// color pattern using rgba function
let x,y,c,s=11
for (x=0;x<w;x+=s) {
  for (y=0;y<h;y+=s) {
    fstyle(rgba(255&(max(x,y)),+255&(x^y),+255&~(x*y),1))
    frect(x,y,s,s)
  }
}
