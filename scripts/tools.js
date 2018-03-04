const compose = (...fs) => x => fs.reduce((acc, f) => f(acc), x);

const print = (...args) => {
    console.log(...args)
}

export { compose, print }
