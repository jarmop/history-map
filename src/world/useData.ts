import { eurasiaAfrica } from '../customMap/continents'
import { islandBorders, islandRegions } from '../customMap/islands'
import { World } from './data'

const data: World = {
  borders: [
    {
      id: 'eurasiaAfrica',
      path: eurasiaAfrica,
    },
    ...islandBorders,
  ],
  regions: [
    {
      id: 'eurasiaAfrica',
      borderIds: ['eurasiaAfrica'],
    },
    ...islandRegions,
  ],
  cities: [{ name: 'Rome', latLon: [1, 2] }],
  states: [
    {
      name: 'Roman Republic',
      regionIdsByYear: { ['-500']: ['region'] },
    },
  ],
}

export function useData() {
  // return {islands: data.regions.map(region => region.borderIds.map(id => ))}
  return { islands: data.borders.map((border) => border.path) }
}

console.log(data)
