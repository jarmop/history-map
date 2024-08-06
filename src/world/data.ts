export type LatLon = [number, number]

export type Path = LatLon[]

type Border = { id: string; path: Path }

type Region = { id: string; borderIds: Border['id'][] }

// founded on the year of the first region
type State = {
  name: string
  /* Region of ids mapped by start year of occupation. Undefined means the 
  end date of the state. State may perhaps have multiple separate sequences 
  of existence. */
  regionIdsByYear: Record<number, (Region['id'] | undefined)[]>
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

const exampleWorld: World = {
  borders: [
    {
      id: 'a',
      path: [
        [1,2],
      ],
    },
  ],
  regions: [
    {
      id: 'a',
      borderIds: ['a'],
    },
  ],
  cities: [{name: 'Rome', latLon: [1,2]}],
  states: [
    {
      name: 'Roman Republic',
      regionIdsByYear: { ['-500']: ['region'] },
    },
  ],
}

console.log(exampleWorld)
