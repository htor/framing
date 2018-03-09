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

export { 
    compose, 
    print, 
    random, 
    toBase64,
    fromBase64,
    setQueryParam
}
