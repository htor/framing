// floating circles
clear()
push()
let t=ms()*.0009,c,c2,g
tslate(w/2,h/2)

rotate(cos(t)*120)
c=rgba(225,abs(sin(t)*252),255,1)
fstyle(c)
fellips(sin(t)*150,cos(t/2)*220,
        abs(sin(t)*200),abs(sin(t/10)*200))

rotate(sin(t)*220)
c2=rgba(abs(sin(t/2)*25),222,252,1)
fstyle(c2)
fellips(cos(t)*10,sin(t/2)*220,
        abs(cos(t)*200),abs(cos(t/10)*200))
pop()
