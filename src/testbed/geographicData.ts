import dataJson from '../data/data.json'
import { LatLon, World as OldWorld } from '../data/data'
import { Border, Region } from './newTypes'
// import { equirectangular as mapProjection } from '../CustomMap/mapProjections/equiRectangular'
import { mercator as mapProjection } from '../CustomMap/mapProjections/mercator'

export function getBorders(): Border[] {
  const oldWorld = dataJson as unknown as OldWorld

  const eurasiaAfrica = oldWorld.borders.find((b) => b.id === 'eurasiaAfrica')
  if (!eurasiaAfrica) {
    throw new Error('data not found')
  }

  const borders = [{ ...eurasiaAfrica, id: 1 }]

  const { totalWidth, totalHeight, lonToX, latToY } = mapProjection(1000)

  console.log(totalWidth, totalHeight)

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
  return [
    {
      id: 1,
      border: {
        borderId: 1,
      },
    },
  ]
}
