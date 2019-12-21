# functions

## math
sin(n)
cos(n)
abs(n)
min(n, m)
max(n, m)
rand(min, max)
rseed(seed)
noise(x, y)
norm(value, low, high)
map(value, low1, high1, low2, high2)

## globals
w
h
mx
my
PI
TWO_PI
ctx

## shapes
sstyle(style)
fstyle(style)
begin()
close()
stroke()
fill()
line(x, y)
move(x, y)
point(x, y)
rect(x, y, w, h)
srect(x, y, w, h)
frect(x, y, w, h)
triang(x1, y1, x2, y2, x3, y3)
striang(x1, y1, x2, y2, x3, y3)
ftriang(x1, y1, x2, y2, x3, y3)
quad(x1, y1, x2, y2, x3, y3, x4, y4)
squad(x1, y1, x2, y2, x3, y3, x4, y4)
fquad(x1, y1, x2, y2, x3, y3, x4, y4)
ellips(x, y, w, h, r)
sellips(x, y, w, h, r)
fellips(x, y, w, h, r)
doffset(n)
lwidth(value)
lcap(value)
ldash(arg)
ljoin(arg)
shblur(arg)
shcolor(arg)
shoffx(arg)
shoffy(arg)
lgrad(x0, y0, x1, y1)
rgrad(x0, y0, x1, y1)

## utils
ms()
fps(n)
loop(boolean)
clear(boolean)
log(message)
comp(type)
bground(color)
rgba(r, g, b, a)
gimg(imgSrc)
drimg(img)


## transforms
push()
pop()
rotate(degs)
tslate(x, y)
scale(x ,y)
treset()

## text
font(style)
ftext(text, x, y maxWidth?)
stext(text, x, y maxWidth?)
