const compose = (...fs) => 
    x => fs.reduce((acc, f) => f(acc), x);

const print = (...args) =>
    console.log(...args)

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const toBase64 = (str) => 
    btoa(encodeURIComponent(str))

const fromBase64 = (str) => 
    decodeURIComponent(atob(str))

const setQueryParam = (name, value) => {
    let newurl = window.location.protocol + '//' + 
        window.location.host + window.location.pathname + `?${name}=${value}`
    window.history.pushState({ path: newurl }, '', newurl)
}

const setFavicon = (canvas) => {
    setTimeout(() => {
        let favicon = document.querySelector('[rel=icon]')
        let iconCanvas = document.createElement('canvas')
        let iconGraphics = iconCanvas.getContext('2d')
        let length = Math.min(canvas.width, canvas.height)
        iconCanvas.width = iconCanvas.height = length
        iconGraphics.drawImage(canvas, 0, 0, length, length, 
            0, 0, length, length)
        favicon.href = iconCanvas.toDataURL()
    }, 1000)
}

export { 
    compose, 
    print, 
    random, 
    toBase64,
    fromBase64,
    setQueryParam,
    setFavicon
}
