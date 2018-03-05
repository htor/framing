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

export { compose, print, random, randomColor, rgbaString }
