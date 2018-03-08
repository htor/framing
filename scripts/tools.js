const compose = (...fs) => 
    x => fs.reduce((acc, f) => f(acc), x);

const print = (...args) => {
    console.log(...args)
}

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const randomColor = () =>
    [0, 0, 0].map(c => random(0, 255)).concat(1.0)

const rgbaString = (rgba) => {
    return 'rgba(' +
        rgba.slice(0, 3)
        .map(Math.floor)
        .concat(rgba[3])
        .join() + ')'
}

const toBase64 = (str) => 
    btoa(unescape(encodeURIComponent(str)))

const fromBase64 = (str) => 
    decodeURIComponent(escape(atob(str)))

const setQueryParam = (name, value) => {
    let newurl = window.location.protocol + '//' + 
        window.location.host + window.location.pathname + `?${name}=${value}`
    window.history.pushState({ path: newurl }, '', newurl)
}

export { 
    compose, 
    print, 
    random, 
    randomColor, 
    rgbaString,
    toBase64,
    fromBase64,
    setQueryParam
}
