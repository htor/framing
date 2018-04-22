# scratch-editor

A simple editor for live coding graphics with JS.
Try out the editor here:

https://hermantorjussen.no/scratch

![scratch: editor for live coding](examples/screen.png)

# usage 

Evaluate code in the editor window with Cmd + Enter or Ctrl + Enter. 
Results are placed in the lower left corner. Hide/unhide the code with Alt-H. 
Back and forward buttons in the browser moves through editing history. Links are sharable.

The code is evaluated 60 times 
a second in the global scope and you have access to all of the browser APIs 
to build your thing. There is a group of non-standard functions and properties
defined in [scripts/index.js](scripts/index.js) for writing more compact
code, but there is a also global canvas context object `ctx`
that lets you write normal canvas code if you want.

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
