// raining numbers
let x,y,s=11,t=millis()
font(`${s}px monospace`)
for(x=0;x<w;x+=s){
  for(y=0;y<h;y+=s){
    ftext((x&y-(t%x)),x,y)
  }
}
