import { latSize, leftLon, lonSize, topLat } from './constants'

export function equirectangular(width: number) {
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
    return (topLat - lat) * latYRatio
  }

  const yToLat = (y: number) => {
    return topLat - y / latYRatio
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
