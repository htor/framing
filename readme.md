# scratch

A simple editor for live coding with JS.

# installing

Clone this repo and with [npm](https://npmjs.com/) do:

```
npm install
npm start
```

It should open in your browser.

# usage 

Evaluate code in the editor window with Cmd + Enter or Ctrl + Enter. 
Results are placed in the lower left corner.
The code is evaluated 60 times a second in the global scope and you have 
access to all of the browser APIs to build your thing.


# api
For convenience, there is a global object `ctx`
(of type [CanvasRenderingContext2D][1])
controlling the a canvas 
covering the entire window, plus a group of aliases for some common canvas 
operations. See `index.js` for the aliases.


# inspiration

Inspired by https://hydra-editor.glitch.me made by https://github.com/ojack
and the programming module at https://www.khanacademy.org/computer-programming/new/pjs
and http://processingjs.org/.

# license

MIT

[1]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
