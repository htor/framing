export function vendorPrefix (prop, target) {
  return ['', 'ms', 'moz', 'webkit'].map((p, i) =>
  p + (i > 0 ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop)
).map(prefixedProp => target[prefixedProp])
.filter(prefixed => prefixed)[0]
}

export function getQueryParam (name) {
  return new URLSearchParams(location.search).get(name)
}

export function setQueryParam (name, value) {
  const queryString = new URLSearchParams(location.search)
  queryString.set(name, value)
  const newUrl = window.location.protocol + '//' +
  window.location.host + window.location.pathname + `?${queryString}`
  window.history.pushState({ path: newUrl }, '', newUrl)
}

export function setFavicon () {
  setTimeout(() => {
    const canvas = document.querySelector('canvas')
    const favicon = document.querySelector('[rel=icon]')
    const iconCanvas = document.createElement('canvas')
    const iconGraphics = iconCanvas.getContext('2d')
    const size = Math.min(canvas.width, canvas.height)
    iconCanvas.width = iconCanvas.height = size
    iconGraphics.drawImage(canvas, 0, 0, size, size, 0, 0, size, size)
    favicon.href = iconCanvas.toDataURL()
  }, 1000)
}

export function remember (fn) {
  let last = ''
  return arg => {
    if (arg === last) return
    last = arg
    fn(arg)
  }
}
