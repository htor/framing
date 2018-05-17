# scratch-editor

A simple editor for live coding graphics with js.
Try out the editor here:

[https://hermantorjussen.no/scratch](https://hermantorjussen.no/scratch/?id=JTJGJTJGJTIwYnJlYXRoaW5nJTIwZ3JhZGllbnQlMEElMEFsZXQlMjB0JTNEYWJzKHNpbihtcygpKi4wMDA5KSoyMDUpJTBBbGV0JTIwZyUzRHJncmFkKHclMkYzJTJDaCUyRjIlMkN3JTJGMi4xJTJDdyUyRjIlMkNoJTJGMiUyQzApJTBBbGV0JTIwYyUzRHJnYmEoMjM0JTJDdCUyNjI1NSUyQ3QtMjU1JTJDMSklMEFnLnN0b3AoMCUyQyUyMCclMjNmMDZkMDYnKSUwQSUyMC5zdG9wKC4zJTJDYyklMEElMjAuc3RvcCgxJTJDJ2JsdWUnKSUwQWZzdHlsZShnKSUwQWZyZWN0KDAlMkMwJTJDdyUyQ2gpJTBBZw==)

![scratch: editor for live coding](examples/screen.png)

# usage 

The code is evaluated ~60 times a second in the global scope and you have access 
to all of the browser APIs to build your thing. There is a group of non-standard 
functions and properties defined in the [scratch library](https://github.com/htor/scratch)
for writing more compact code, but there is a also global canvas context object `ctx`
that lets you write normal canvas code if you want. All links are sharable.

### cmd+enter or ctrl+enter
Evaluate code. If the code errors, the error is displayed on the lower left and
the previous code will continue to be evaluated.

### back/forward
Back and forward buttons in the browser moves through editing history. 

### alt+h
Hide/unhide the code and output.

### alt+b
Blend/unblend the code and output with the canvas. Use this when your code is too hard
too read.

### alt+f
Toggle fullscreen mode.

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
