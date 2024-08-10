export type LatLon = [number, number]

export type Path = LatLon[]

type Border = { id: string; path: Path }

type Region = { id: string; borders: (Border['id'] | Border)[] }

export type BorderSlice = {
  borderId: string
  start: number
  end: number
}

type Foo = (BorderSlice | Path)[]

// founded on the year of the first region
export type State = {
  name: string
  /* Region of ids mapped by start year of occupation. Undefined means the 
  end date of the state. State may perhaps have multiple separate sequences 
  of existence. */
  // regionIdsByYear: Record<number, (Region['id'] | undefined)[]>
  // regionsByYear: Record<number, (Region['id'] | Region | Foo)[] | undefined>
  regionsByYear: Record<number, Foo[]>
}

type City = {
  name: string
  latLon: LatLon
}

export type World = {
  borders: Border[]
  // Any area, enclosing path
  regions: Region[]
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
