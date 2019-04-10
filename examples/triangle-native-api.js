// draw a triangle by closing path
// using native canvas api
ctx.beginPath()
ctx.moveTo(ctx.canvas.width/2,ctx.canvas.height/2)
ctx.lineTo(ctx.canvas.width/2-50,ctx.canvas.height/2-50)
ctx.lineTo(ctx.canvas.width/2+80,ctx.canvas.height/2+20)
ctx.closePath()
ctx.stroke()
