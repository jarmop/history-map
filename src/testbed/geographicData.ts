import dataJson from '../data/data.json'
import { LatLon, World as OldWorld, Border as OldBorder } from '../data/data'
import { Border, City, Region, River } from './newTypes'
// import { equirectangular as mapProjection } from '../CustomMap/mapProjections/equiRectangular'
import { mercator as mapProjection } from '../CustomMap/mapProjections/mercator'
import { latLonByName, LatLonName } from '../data/coordinates/latLonByName'

const { lonToX, latToY, latLonToXy } = mapProjection(1000)

const oldWorld = dataJson as unknown as OldWorld

const borderById = oldWorld.borders.reduce<Record<string, OldBorder>>(
  (acc, curr) => {
    acc[curr.id] = curr
    return acc
  },
  {}
)

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

const regions = borders.map((b) => ({ id: b.id, border: { borderId: b.id } }))

const rivers = oldWorld.rivers.map((r) => ({
  id: r.id,
  path: borderById[r.borderId].path.map((latLon) => {
    const lat = latLon[0]
    const lon = latLon[1]
    return [lonToX(lon), latToY(lat)] as [number, number]
  }),
}))

const cityNames: LatLonName[] = ['Jerusalem']
const cities = cityNames.map((city) => {
  const latLon = latLonByName[city] as [number, number]
  return { id: city, xy: latLonToXy(latLon) }
})

export function getBorders(): Border[] {
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
  return regions
}

export function getRivers(): River[] {
  return rivers
}

export function getCities(): City[] {
  return cities
}
