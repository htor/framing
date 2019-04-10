// raining numbers
clear()
let x,y,s=12,t=ms()
font(`${s}px monospace`)
fstyle('black')
fps(11)
for(x=0;x<w;x+=s){
  for(y=0;y<h;y+=s){
    ftext((x&y-(t%x)),x,y)
  }
}
