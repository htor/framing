# repeat-editor

An editor for live coding [canvas](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) graphics in the browser.

<a href="https://hermantorjussen.no/repeat/?id=JTJGJTJGJTIwZ2VuZXJhdGUlMjAyLWRpbWVuc2lvbmFsJTIwdGV4dHVyZSUyMHdpdGglMjBub2lzZSUyMGZ1bmN0aW9uJTBBJTJGJTJGJTIwdGhpcyUyMGlzJTIwdXNpbmclMjBzaW1wbGV4JTIwdW5kZXJuZWF0aCUyMChwZXJsaW4tbGlrZSklMEFmdW5jdGlvbiUyMGRyYXclMjAoKSUyMCU3QiUwQSUyMCUyMGJncm91bmQoJ3JnYmEoMjAlMkM4MCUyQzIwMiUyQzEpJyklMEElMjAlMjBsZXQlMjBzJTIwJTNEJTIwMTglMEElMjAlMjBsZXQlMjB4JTIwJTNEJTIwMCUzQiUyMGxldCUyMHklMjAlM0QlMjAwJTNCJTIwbGV0JTIwaW5jJTIwJTNEJTIwLTAuMDc4JTBBJTIwJTIwZm9yJTIwKGxldCUyMGklMjAlM0QlMjAwJTNCJTIwaSUyMCUzQyUyMHclM0IlMjBpJTIwJTJCJTNEJTIwcyUyQyUyMHglMjAlM0QlMjAwJTJDJTIweSUyMCUyQiUzRCUyMGluYyklMjAlN0IlMEElMjAlMjAlMjAlMjBmb3IlMjAobGV0JTIwaiUyMCUzRCUyMDAlM0IlMjBqJTIwJTNDJTIwaCUzQiUyMGolMjAlMkIlM0QlMjBzJTJDJTIweCUyMCUyQiUzRCUyMGluYyklMjAlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjBsZXQlMjBuJTIwJTNEJTIwbWFwKG5vaXNlKHglMkMlMjB5KSUyQyUyMC0xJTJDJTIwMSUyQyUyMDAlMkMlMjAxKSUwQSUyMCUyMCUyMCUyMCUyMCUyMGZzdHlsZSglNjByZ2JhKDI1NSUyQzIyJTJDMjQlMkMlMjQlN0JuJTdEKSU2MCklMEElMjAlMjAlMjAlMjAlMjAlMjBmcmVjdChpJTJDJTIwaiUyQyUyMHMlMkMlMjBzKSUwQSUyMCUyMCUyMCUyMCU3RCUwQSUyMCUyMCU3RCUwQSU3RCUwQQ%3D%3D&hidden=false">
<img src="examples/screen.png" alt="repeat: editor for live coding" width="660"></a>


# example

To draw something on the canvas use the shorthand functions or standard canvas functions on the `ctx` global.
Press F1 to get a list of shorthand functions.

 ```js
 // using shorthand
fstyle('orange')
frect(500, 500, 100, 100)
 // using standard
ctx.fillStyle('orange')
ctx.fillRect(500, 500, 100, 100)
 ```

To run code for each frame, define a function `draw(n)`.
This function will be called for each frame. Current frame number is passed as `n`:

```js
fps(6)
fstyle('orange')
var s=20,x=0,y=0

function draw (n) {
 for (x=0;x<w;x+=s) {
   for (y=0;y<h;y+=s) {
     frect(x, y, s-5, s-5)
   }
 }
}
```

Control the number of frames per second with `fps(n)`.
Look inside the [examples](examples) directory for examples and inspiration. Press F1 for more help.

# usage

### f1
Show/hide help window

### f2
Toggle hiding code and output

### f3
Toggle fullscreen mode

### cmd/ctrl+enter
Save and evaluate code. If the code errors, the error is displayed on the lower left.
The URL is updated with a shareable link.

### cmd/ctrl+shift+d
Duplicate current line

### cmd/ctrl+shift+k
Comment/uncomment current line

### cmd/ctrl+l
Select current line(s)

### back/forward
Back and forward buttons in the browser moves through save history.




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
