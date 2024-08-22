import { LatLon } from '../data/data'

export type Connection = {
  id: string
  point: LatLon
}

// Use region id, or specify reverse boolean here, to indicate which side of the border the connection is

// The reverse information tells which way to continue on from the connection. The index always refers to the
// original border. So when traversing backwards the discount starts from that, or if reversed the point needs to be flipped.
// Perhaps traversing backwards (with index discounts) is less confusing than reversing the array.
export type BorderConnection = {
  borderId: Border['id']
  index: number
  reverse?: boolean // connecting to the reverse side
  endConnection?: boolean // connecting with end point
}

export type Border = {
  id: number
  path: LatLon[]
  startPoint?: BorderConnection
  endPoint?: BorderConnection
  startYear?: number
  endYear?: number
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
  divider?: Border['id']
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
