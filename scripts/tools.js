const compose = (...fs) => 
    x => fs.reduce((acc, f) => f(acc), x);

const print = (...args) =>
    console.log(...args)

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const toBase64 = str => 
    btoa(encodeURIComponent(str))

const fromBase64 = str => 
    decodeURIComponent(atob(str))

const vendorPrefix = str =>
    ['', 'ms', 'moz', 'webkit'].map(prefix => prefix + str)

const vendorPrefixed = (prop, target) => {
    return ['', 'ms', 'moz', 'webkit'].map((p, i) =>
        p + (i > 0 ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop)
    ).map(prefixedProp => target[prefixedProp])
    .filter(prefixed => prefixed)[0]
}

const getQueryParam = name =>
    new URLSearchParams(location.search).get(name)

const setQueryParam = (name, value) => {
    let queryString = new URLSearchParams(location.search)
    queryString.set(name, value)
    let newUrl = window.location.protocol + '//' + 
        window.location.host + window.location.pathname + `?${queryString}`
    window.history.pushState({ path: newUrl }, '', newUrl)
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

const toggleFullScreen = (exit) => {
    if (exit) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}

export { 
    compose, 
    print, 
    random, 
    toBase64,
    fromBase64,
    getQueryParam,
    setQueryParam,
    setFavicon,
    vendorPrefix,
    vendorPrefixed,
    toggleFullScreen 
}
