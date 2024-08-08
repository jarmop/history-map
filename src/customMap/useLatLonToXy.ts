import { useMemo } from 'react'
import { equirectangular } from './mapProjections/equiRectangular'

// Change this to compare different projection algorithms
const mapProjection = equirectangular

export function useLatLonToXy(zoom = 1, width: number) {
  const {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  } = useMemo(() => {
    const { totalWidth, totalHeight, lonToX, xToLon, latToY, yToLat } =
      mapProjection(width + zoom * 10)

    const latLonTupleToXYTuple = (latLon: number[]): number[] => {
      const lat = latLon[0]
      const lon = latLon[1]
      return [lonToX(lon), latToY(lat)]
    }

    const xYTupleToLatLonTuple = (xy: number[]): number[] => {
      const [x, y] = xy
      return [yToLat(y), xToLon(x)]
    }
    return {
      latLonTupleToXYTuple,
      xYTupleToLatLonTuple,
      totalWidth,
      totalHeight,
    }
  }, [zoom, width])

  return {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  }
}
