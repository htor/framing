# repeat-editor

A simple editor for live coding [canvas](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) graphics. Demo: [https://hermantorjussen.no/repeat](https://hermantorjussen.no/repeat/?id=JTJGJTJGJTIwYnJlYXRoaW5nJTIwZ3JhZGllbnQlMEElMEFsZXQlMjB0JTNEYWJzKHNpbihtcygpKi4wMDA5KSoyMDUpJTBBbGV0JTIwZyUzRHJncmFkKHclMkYzJTJDaCUyRjIlMkN3JTJGMi4xJTJDdyUyRjIlMkNoJTJGMiUyQzApJTBBbGV0JTIwYyUzRHJnYmEoMjM0JTJDdCUyNjI1NSUyQ3QtMjU1JTJDMSklMEFnLnN0b3AoMCUyQyUyMCclMjNmMDZkMDYnKSUwQSUyMC5zdG9wKC4zJTJDYyklMEElMjAuc3RvcCgxJTJDJ2JsdWUnKSUwQWZzdHlsZShnKSUwQWZyZWN0KDAlMkMwJTJDdyUyQ2gpJTBBZw==)

![repeat: editor for live coding](examples/screen.png)


# usage

To draw something on the canvas, use the shorthand functions defined in
[lang.js](./scripts/lang.js) or standard canvas functions with the `ctx` global. The code is run once:

 ```js
fstyle('orange')
frect(500, 500, 100, 100)
 // or
ctx.fillStyle('orange')
ctx.fillRect(500, 500, 100, 100)
 ```

To run code in a loop, define a function called `draw()`. The body of this function is called for each frame:

```js
fps(6)
fstyle('orange')
s=20

function draw () {
 for (x=0;x<w;x+=s) {
   for (y=0;y<h;y+=s) {
     frect(x, y, s-5, s-5)
   }
 }
}
```

Control the number of frames per second with `fps(n)`. Look inside the [examples](examples) directory for examples and inspiration.

# shortcuts

### cmd/ctrl+enter
Save and evaluate code. If the code errors, the error is displayed on the lower left and
the previous code will continue to be evaluated. When saving, the URL is updated with a shareable link to your piece.

### cmd/ctrl+shift+d
Duplicate current line

### cmd/ctrl+shift+k
Comment/uncomment current line

### cmd/ctrl+l
Select current line(s)

### back/forward
Back and forward buttons in the browser moves through save history.

### alt+f
Toggle fullscreen mode.

### alt+h
Toggle hiding code and output.

# installing

Clone this repo and with [npm](https://npmjs.com/) do:

```
npm install
npm start
```

It should open in your browser.


# inspiration

Inspired by https://hydra-editor.glitch.me made by https://github.com/ojack
and the programming module at https://www.khanacademy.org/computer-programming/new/pjs
and http://processingjs.org/.

# license

MIT

[1]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
