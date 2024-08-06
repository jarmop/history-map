import { eurasiaAfrica } from '../customMap/continents'
import { islandBorders, islandRegions } from '../customMap/islands'
import { BorderSlice, Path, World } from './data'
import { romanRepublicObject } from './romanRepublic'

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
      borders: ['eurasiaAfrica'],
    },
    ...islandRegions,
  ],
  cities: [{ name: 'Rome', latLon: [1, 2] }],
  states: [romanRepublicObject],
}

function isBorderSlice(border: Path | BorderSlice): border is BorderSlice {
  return border.hasOwnProperty('borderId')
}

export function useData(year: number) {
  // return {islands: data.regions.map(region => region.borderIds.map(id => ))}
  const stateBorders: Path[][] = []

  data.states.forEach((state) => {
    const regions = state.regionsByYear[year]
    if (!regions) {
      return
    }

    const regionBorders: Path[] = regions.map((region) => {
      const foo = region
        .flatMap((borderData) => {
          if (isBorderSlice(borderData)) {
            const foo = data.borders.find(
              (border) => border.id === borderData.borderId
            )
            const border = foo?.path

            return border && border.slice(borderData.start, borderData.end + 1)
          } else {
            return borderData
          }
        })
        .filter((val) => val !== undefined)

      return foo
    })

    stateBorders.push(regionBorders)
  })

  return { islands: data.borders.map((border) => border.path), stateBorders }
}
