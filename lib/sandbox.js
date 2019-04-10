const output = document.querySelector('output')
export function evaluate (editor) {

  console.log('-------');
  eval('var editor = 2')
  console.log(editor)
console.log('...........');

  try {
    eval(setupCode)
  } catch (error) {
    output.textContent = error.message
  }
  requestAnimationFrame(function loop() {
    let result
    try {
      result = eval(loopCode)
      prevCode = loopCode
    } catch (error) {
      result = error.message
      try { eval(prevCode) } catch (_) {}
    } finally {
      if (String(result) !== output.textContent)
      output.textContent = result
    }
    setTimeout(requestAnimationFrame, 1000 / window.frameRate, loop)
  })
}
