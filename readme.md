# repeat-editor

A simple editor for live coding [canvas](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) graphics.

![repeat: editor for live coding](examples/screen.png)

# demo

Try out the editor here: [https://hermantorjussen.no/repeat](https://hermantorjussen.no/repeat/?id=JTJGJTJGJTIwYnJlYXRoaW5nJTIwZ3JhZGllbnQlMEElMEFsZXQlMjB0JTNEYWJzKHNpbihtcygpKi4wMDA5KSoyMDUpJTBBbGV0JTIwZyUzRHJncmFkKHclMkYzJTJDaCUyRjIlMkN3JTJGMi4xJTJDdyUyRjIlMkNoJTJGMiUyQzApJTBBbGV0JTIwYyUzRHJnYmEoMjM0JTJDdCUyNjI1NSUyQ3QtMjU1JTJDMSklMEFnLnN0b3AoMCUyQyUyMCclMjNmMDZkMDYnKSUwQSUyMC5zdG9wKC4zJTJDYyklMEElMjAuc3RvcCgxJTJDJ2JsdWUnKSUwQWZzdHlsZShnKSUwQWZyZWN0KDAlMkMwJTJDdyUyQ2gpJTBBZw==). Look inside the [examples](examples) directory for examples and inspiration.

# usage

To draw something on the canvas, use the shorthand functions defined in
[lib/repeat-lang.js](./lib/repeat-lang.js) (`srect(...)`) or standard functions with `ctx` global
 (`ctx.strokeRect(...)`). The inputted code is evaluated ~60 times a second by default. 

### cmd/ctrl+enter
Save and evaluate code. If the code errors, the error is displayed on the lower left and
the previous code will continue to be evaluated. When saving, the URL is updated with a shareable link to your piece.

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
