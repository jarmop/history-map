import { romanEmpire } from './coordinates/civilization/bordersByYear/romanEmpire'
import { romanRepublicObject } from './coordinates/civilization/bordersByYear/romanRepublic'
import { americas } from './coordinates/natural/continents/americas'
import { antarctica } from './coordinates/natural/continents/antarctica'
import { australia } from './coordinates/natural/continents/australia'
import { eurasiaAfrica } from './coordinates/natural/continents/eurasiaAfrica'
import { islandBorders } from './coordinates/natural/islands/islands'
import { BorderSlice, Path, State, World } from './data'

const data: World = {
  borders: [
    {
      id: 'eurasiaAfrica',
      path: eurasiaAfrica,
    },
    {
      id: 'americas',
      path: americas,
    },
    {
      id: 'australia',
      path: australia,
    },
    {
      id: 'antarctica',
      path: antarctica,
    },
    ...islandBorders,
  ],
  regions: [
    // {
    //   id: 'eurasiaAfrica',
    //   borders: ['eurasiaAfrica'],
    // },
    // ...islandRegions,
  ],
  cities: [{ name: 'Rome', latLon: [1, 2] }],
  states: [romanRepublicObject, romanEmpire],
}

function isBorderSlice(border: Path | BorderSlice): border is BorderSlice {
  // eslint-disable-next-line no-prototype-builtins
  return border.hasOwnProperty('borderId')
}

function findRegions(state: State, year: number) {
  if (state.endYear < year) {
    return undefined
  }
  const yearsOfChange = Object.keys(state.regionsByYear)
  const yearString = yearsOfChange.find((testYear, i) => {
    const currentYear = parseInt(testYear)
    const nextYear =
      i < yearsOfChange.length - 1 && parseInt(yearsOfChange[i + 1])
    return currentYear <= year && (!nextYear || nextYear > year)
  })
  if (!yearString) {
    return undefined
  }

  return state.regionsByYear[parseInt(yearString)]
}

export function useData(year: number) {
  const stateBorders: Path[][] = []
  const years = Array.from(
    new Set(data.states.flatMap((state) => Object.keys(state).map(parseInt)))
  )

  data.states.forEach((state) => {
    const regions = findRegions(state, year)
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

  return {
    islands: data.borders.map((border) => border.path),
    stateBorders,
    years,
  }
}

export function useYears() {
  const years = Array.from(
    new Set(
      data.states.flatMap((state) =>
        Object.keys(state.regionsByYear).map((year) => parseInt(year))
      )
    )
  )

  return years
}
