import { useCallback } from 'react'

const leftLon = -180
const topLat = 90
const lonSize = 360
const latSize = 180

export function useLatLonToXy(zoom = 1, containerSize: number[]) {
  const [containerX] = containerSize

  const latLonRatio = 3 / 4
  const lonXRatio = containerX / (lonSize - zoom)
  const latYRatio = lonXRatio / latLonRatio

  const totalWidth = lonXRatio * lonSize
  const totalHeight = latYRatio * latSize

  const lonToX = useCallback(
    (lon: number) => {
      return (lon - leftLon) * lonXRatio
    },
    [lonXRatio]
  )

  const xToLon = useCallback(
    (x: number) => {
      return x / lonXRatio + leftLon
    },
    [lonXRatio]
  )

  const latToY = useCallback(
    (lat: number) => {
      return (topLat - lat) * latYRatio
    },
    [latYRatio]
  )

  const yToLat = useCallback(
    (y: number) => {
      return topLat - y / latYRatio
    },
    [latYRatio]
  )

  const latLonTupleToXYTuple = useCallback(
    (latLon: number[]): number[] => {
      const lat = latLon[0]
      const lon = latLon[1]
      return [lonToX(lon), latToY(lat)]
    },
    [lonToX, latToY]
  )

  const xYTupleToLatLonTuple = useCallback(
    (xy: number[]): number[] => {
      const [x, y] = xy
      return [yToLat(y), xToLon(x)]
    },
    [yToLat, xToLon]
  )

  return {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  }
}
