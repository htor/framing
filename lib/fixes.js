import { vendorPrefixed, vendorPrefix } from './tools'

document.exitFullscreen = 
    vendorPrefixed('exitFullscreen', document) ||
    vendorPrefixed('cancelFullScreen', document)
document.documentElement.requestFullscreen = 
    vendorPrefixed('requestFullscreen', document.documentElement) || 
    vendorPrefixed('requestFullScreen', document.documentElement)

