import data from './data/data.json'
import { LatLon } from '../data/data'
import { Border, Culture, Marker, Region, River, Sea, World } from './newTypes'
// import { equirectangular as mapProjection } from '../CustomMap/mapProjections/equiRectangular'
import { mercator as mapProjection } from '../CustomMap/mapProjections/mercator'
import { roundFloat } from './helpers'

export const { lonToX, latToY, latLonToXy, xyToLatLon } = mapProjection(1000)

const world = data as unknown as World

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

const seas = world.seas.map((s) => ({
  ...s,
  path: s.path.map((latLon) => {
    const lat = latLon[0]
    const lon = latLon[1]
    return [lonToX(lon), latToY(lat)] as [number, number]
  }),
}))

const markers = world.markers.map((marker) => {
  return { ...marker, xy: latLonToXy(marker.xy) }
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

export function getSeas(): Sea[] {
  return seas
}

export function getMarkers(): Marker[] {
  return markers
}

export function getCultures(): Culture[] {
  return world.cultures
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
    seas: world.seas.map((s) => ({
      ...s,
      path: s.path.map(xyToRoundedLatLon),
    })),
    markers: world.markers.map((p) => ({ ...p, xy: xyToRoundedLatLon(p.xy) })),
  }
}

export function getWorld(): World {
  return {
    borders: getBorders(),
    regions: getRegions(),
    rivers: getRivers(),
    seas: getSeas(),
    markers: getMarkers(),
    cultures: getCultures(),
  }
}

// setWorld({
//   borders: getBorders(),
//   regions: getRegions(),
//   rivers: getRivers(),
//   cities: getCities(),
// })
