import { LatLon } from '../data/data'

export type Connection = {
  id: string
  point: LatLon
}

export type Border = {
  id: string
  path: LatLon[]
  startPoint: Connection['id']
  endPoint: Connection['id']
  startYear?: number
  endYear?: number
}

export type Region = { id: string; borderIds: Border['id'][] }

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
