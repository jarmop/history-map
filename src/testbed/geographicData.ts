import data from './data/data.json'
import { LatLon } from '../data/data'
import { Border, City, Region, River, World } from './newTypes'
// import { equirectangular as mapProjection } from '../CustomMap/mapProjections/equiRectangular'
import { mercator as mapProjection } from '../CustomMap/mapProjections/mercator'
import { latLonByName, LatLonName } from '../data/coordinates/latLonByName'
import { setWorld } from './data/storage'
import { roundFloat } from './helpers'

const { lonToX, latToY, latLonToXy, xyToLatLon } = mapProjection(1000)

const world = data as World

const borders = world.borders.map((b) => ({
  ...b,
  path: b.path.map((latLon) => {
    const lat = latLon[0]
    const lon = latLon[1]
    return [lonToX(lon), latToY(lat)] as LatLon
  }),
}))

const regions = world.regions

const rivers = world.rivers.map((r) => ({
  ...r,
  path: r.path.map((latLon) => {
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
  return borders
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

function xyToRoundedLatLon(xy: [number, number]) {
  const latLon = xyToLatLon(xy)
  return [roundFloat(latLon[0], 4), roundFloat(latLon[1], 4)] as const
}

export function prepareForExport(world: World) {
  return {
    ...world,
    borders: world.borders.map((b) => ({
      ...b,
      path: b.path.map(xyToRoundedLatLon),
    })),
    rivers: world.rivers.map((r) => ({
      ...r,
      path: r.path.map(xyToRoundedLatLon),
    })),
    cities: world.cities.map((c) => ({ ...c, xy: xyToRoundedLatLon(c.xy) })),
  }
}

setWorld({
  borders: getBorders(),
  regions: getRegions(),
  rivers: getRivers(),
  cities: getCities(),
})
