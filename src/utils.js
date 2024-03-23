import { compress, decompress } from '@blu3r4y/lzma'

export function vendorPrefix(prop, target) {
  const prefixes = ['', 'ms', 'moz', 'webkit']
  for (let i = 0; i < prefixes.length; i++) {
    const ident = `${prefixes[i]}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`
    const vendor = target[ident]
    if (vendor) target[prop] = vendor
  }
}

export function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name)
}

export function setQueryParam(name, value) {
  const params = new URLSearchParams(window.location.search)
  params.set(name, value)
  const newUrl = `${window.location.origin}${window.location.pathname}?${params}`
  window.history.pushState({ path: newUrl }, '', newUrl)
}

export function setFavicon() {
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

export function sleep(millis, callback) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(callback()), millis)
  })
}

export function strToBase64(str) {
  const compBytes = Uint8Array.from(compress(str))
  return btoa(String.fromCharCode.apply(null, compBytes))
}

export function base64ToStr(str) {
  const compBytes = Uint8Array.from(atob(str), (m) => m.charCodeAt(0))
  return decompress(compBytes)
}

vendorPrefix('exitFullscreen', document)
vendorPrefix('cancelFullScreen', document)
vendorPrefix('requestFullscreen', document.documentElement)
vendorPrefix('requestFullScreen', document.documentElement)
