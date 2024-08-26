import { latSize, leftLon, lonSize } from './constants'

export function degToRad(deg: number) {
  return (deg * Math.PI) / 180
}

export function mercatorLatToY(lat: number) {
  return Math.log(Math.tan(Math.PI / 4 + lat / 2))
}

export function radToDeg(rad: number) {
  return (180 * rad) / Math.PI
}

function mercatorYToLat(y: number) {
  return 2 * Math.atan(Math.exp(y)) - Math.PI / 2
}

const topLatM = radToDeg(mercatorLatToY(degToRad(75)))

export function mercator(width: number) {
  const lonXRatio = width / lonSize
  const latYRatio = lonXRatio

  const totalWidth = lonXRatio * lonSize
  const totalHeight = latYRatio * latSize

  const lonToX = (lon: number) => {
    return (lon - leftLon) * lonXRatio
  }

  const xToLon = (x: number) => {
    return x / lonXRatio + leftLon
  }

  const latToY = (lat: number) => {
    return (topLatM - radToDeg(mercatorLatToY(degToRad(lat)))) * latYRatio
  }

  const yToLat = (y: number) => {
    return radToDeg(mercatorYToLat(degToRad(topLatM - y / latYRatio)))
  }

  return {
    totalWidth,
    totalHeight,
    lonToX,
    xToLon,
    latToY,
    yToLat,
  }
}
