import { getLatLonByName } from '../helpers'
import {
  franciaMiddleEast,
  franciaWestMiddle,
} from './coordinates/civilization/bordersByYear/843'
import {
  eastFrancia,
  middleFrancia,
  westFrancia,
} from './coordinates/civilization/bordersByYear/carolingians'
import { romanEmpire } from './coordinates/civilization/bordersByYear/romanEmpire'
import { romanRepublicObject } from './coordinates/civilization/bordersByYear/romanRepublic'
import { americas } from './coordinates/natural/continents/americas'
import { antarctica } from './coordinates/natural/continents/antarctica'
import { australia } from './coordinates/natural/continents/australia'
import { eurasiaAfrica } from './coordinates/natural/continents/eurasiaAfrica'
import {
  islandBorders,
  islandRegions,
} from './coordinates/natural/islands/islands'
import { BorderSlice, Path, State, World } from './data'

const data: World = {
  borders: [
    // natural borders
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
    // custom borders
    {
      id: 'FranciaWestMiddle843',
      path: franciaWestMiddle.map(getLatLonByName),
    },
    {
      id: 'FranciaMiddleEast843',
      path: franciaMiddleEast.map(getLatLonByName),
    },
  ],
  regions: [
    {
      id: 'eurasiaAfrica',
      borders: ['eurasiaAfrica'],
    },
    {
      id: 'americas',
      borders: ['americas'],
    },
    {
      id: 'australia',
      borders: ['australia'],
    },
    {
      id: 'antarctica',
      borders: ['antarctica'],
    },
    ...islandRegions,
  ],
  cities: [{ name: 'Rome', latLon: [1, 2] }],
  states: [
    romanRepublicObject,
    romanEmpire,
    westFrancia,
    middleFrancia,
    eastFrancia,
  ],
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

function sliceBorder(path: Path, start: number, end: number) {
  if (start < end) {
    return path.slice(start, end + 1)
  } else {
    return path.toReversed().slice(end, start + 1)
  }
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

            return (
              border && sliceBorder(border, borderData.start, borderData.end)
            )
          } else {
            return borderData
          }
        })
        .filter((val) => val !== undefined)

      return foo
    })

    stateBorders.push(regionBorders)
  })

  const borderById = data.borders.reduce<Record<string, Path>>((acc, curr) => {
    acc[curr.id] = curr.path

    return acc
  }, {})

  const islands = data.regions.flatMap(({ borders }) =>
    borders.map((id) => borderById[id])
  )

  return {
    islands,
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
