// animation drawing intersecting
// lines using bit operations
let x,y,x2,y2,t=millis(),s=11
lwidth(0.5)
begin()
for(x=0;x<w;x+=s){
 for(y=0;y<h;y+=s){
   x2 = max(y&x,y)^(t&h)
   y2 = y|x>>y^(t * 0.002)
   move(x, y)
   line(x2,y2)
}}
stroke()
