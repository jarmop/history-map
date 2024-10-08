import { LatLon } from '../data/data'

export type Connection = {
  id: string
  point: LatLon
}

// Use region id, or specify reverse boolean here, to indicate which side of the border the connection is

// The reverse information tells which way to continue on from the connection.
// The index always refers to the original border.
export type BorderConnection = {
  borderId: Border['id']
  index: number
  reverse?: boolean // connecting to the reverse side
}

export type Border = {
  id: number
  path: LatLon[]
  startPoint?: BorderConnection
  endPoint?: BorderConnection
  startYear?: number
  endYear?: number
}

export type River = {
  id: string
  path: LatLon[]
}

export type Sea = {
  id: string
  path: LatLon[]
}

export type RegionBorder = { borderId: Border['id']; reverse?: boolean }

/**
 * Maybe it's easiest if region has only one border and one divider.
 */
export type Region = {
  id: number
  border: RegionBorder
  // Can have multiple dividers over time, but they must not overlap in time.
  // (They won't overlap in space either because they won't overlap in time)
  dividers?: Border['id'][]
}

// type State = { id: string; regionsByYear: Record<string, Region[]> }
// type State = { id: string; regions: Region['id'][] }
export type State = { id: string; regions: Region[] } // Age of regions is defined by the overlapping ages of its borders
// State can have different age than the regions it is occupying

export type Possession = { regionId: Region['id']; start: number; end?: number }

export type Culture = {
  id: number
  name: string
  color: string
  possessions: Possession[]
}

export const markerTypes = [
  'monastery',
  'university',
  'fortress',
  'church',
  'town',
  'artefact',
  'hospital',
  'building',
  'invention',
  'literature',
  'event',
  'music',
  'person',
  'institution',
] as const

export type Marker = {
  id: number
  name: string
  xy: [number, number]
  latLon?: [number, number]
  type: (typeof markerTypes)[number]
  start: number
  end?: number
  image?: string
  thumbnail?: string
  artist?: string
  location?: string
  description?: string
}

export type World = {
  borders: Border[]
  regions: Region[]
  rivers: River[]
  seas: Sea[]
  markers: Marker[]
  cultures: Culture[]
}

export type Config = {
  markerTypesOnMap: Marker['type'][]
  markerTypesOnGallery: Marker['type'][]
  showCultures: boolean
}

export type BorderData = {
  borderId: Border['id']
  path: [number, number][]
  reverse: boolean
  start: number // index where the sliced path starts
}

export type MapRegion = {
  id: number
  path: [number, number][]
  color?: string
  border: Border
  borderData: BorderData[]
}
