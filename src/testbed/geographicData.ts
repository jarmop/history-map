import dataJson from '../data/data.json'
import { LatLon, World as OldWorld } from '../data/data'
import { Border, Region } from './newTypes'
// import { equirectangular as mapProjection } from '../CustomMap/mapProjections/equiRectangular'
import { mercator as mapProjection } from '../CustomMap/mapProjections/mercator'

const oldWorld = dataJson as unknown as OldWorld

const borders = oldWorld.islands.map((island, i) => {
  const border = oldWorld.borders.find((b) => b.id === island.borders[0])
  if (!border) {
    throw new Error('border not found')
  }
  return {
    ...border,
    id: i + 1,
  }
})

export function getBorders(): Border[] {
  const { lonToX, latToY } = mapProjection(1000)

  return borders.map((border) => {
    const path = border.path.map((latLon) => {
      const lat = latLon[0]
      const lon = latLon[1]
      return [lonToX(lon), latToY(lat)] as LatLon
    })

    return { ...border, path }
  })
}

export function getRegions(): Region[] {
  return borders.map((b) => ({ id: b.id, border: { borderId: b.id } }))
}
