import { useMemo } from 'react'
import { equirectangular } from './mapProjections/equiRectangular'
import { mercator } from './mapProjections/mercator'

export type LatLonTupleToXYTuple = (latLon: number[]) => number[]
export type XYTupleToLatLonTuple = (xy: number[]) => number[]

// Change this to compare different projection algorithms
// const mapProjection = equirectangular
const mapProjection = mercator

export function useLatLonToXy(zoom = 5000, width: number) {
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
