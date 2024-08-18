import { LatLon } from '../data/data'

export type Connection = {
  id: string
  point: LatLon
}

type BorderConnection = { borderId: Border['id'], index: number }

export type Border = {
  id: string
  path: LatLon[]
  startPoint?: BorderConnection
  endPoint?: BorderConnection
  // startYear?: number
  // endYear?: number
}

type RegionBorder = { borderId: Border['id']; reverse?: boolean }

export type Region = {
  id: string
  borders: RegionBorder[]
  startYear?: number
  endYear?: number
}

// type State = { id: string; regionsByYear: Record<string, Region[]> }
// type State = { id: string; regions: Region['id'][] }
export type State = { id: string; regions: Region[] } // Age of regions is defined by the overlapping ages of its borders
// State can have different age than the regions it is occupying

export type World = {
  connections: Connection[]
  borders: Border[]
  regions: Region[] // physical regions and borders in different properties, or separate some other way?
  states: State[]
}
