export type LatLon = [number, number]

export type Path = LatLon[]

export type Border = {
  id: string
  path: Path
  start?: { borderId: string; i: number }
  end?: { borderId: string; i: number }
}

// type Region = { id: string; borders: (Border['id'] | Border)[] }
type Island = { id: string; borders: Border['id'][] }

export type BorderSlice = {
  borderId: string
  start: number
  end: number
}

export type Region = (BorderSlice | Path)[]

// founded on the year of the first region
export type State = {
  name: string
  endYear: number
  /* Region of ids mapped by start year of occupation. Undefined means the 
  end date of the state. State may perhaps have multiple separate sequences 
  of existence. */
  // regionIdsByYear: Record<number, (Region['id'] | undefined)[]>
  // regionsByYear: Record<number, (Region['id'] | Region | Foo)[] | undefined>
  regionsByYear: Record<number, Region[]>
}

type City = {
  name: string
  latLon: LatLon
}

export type River = { id: string; borderId: string }

export type World = {
  borders: Border[]
  // Any area, enclosing path
  islands: Island[]
  rivers: River[]
  // mapped to regions by an algorithm
  cities: City[]
  // occupies regions
  states: State[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleWorld: World = {
  borders: [
    {
      id: 'a',
      path: [[1, 2]],
    },
  ],
  regions: [
    {
      id: 'a',
      borders: ['a'],
    },
  ],
  cities: [{ name: 'Rome', latLon: [1, 2] }],
  states: [
    {
      name: 'Roman Republic',
      regionsByYear: { ['-500']: ['region'] },
    },
  ],
}
