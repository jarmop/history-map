import { getWorld, setWorld } from '../storage'
import { Border, BorderSlice, Path, State, World } from './data'
import dataJson from './data.json'

function getData() {
  const storageData = getWorld()
  if (storageData.borders.length === 0) {
    const world = dataJson as unknown as World
    setWorld(world)
    return world
  }

  return storageData
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
  const data = getData()
  const stateBorders: Path[][] = []

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

  const borderById = data.borders.reduce<Record<string, Border>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const islands = data.regions.flatMap(({ borders }) =>
    borders.map((id) => borderById[id])
  )

  const rivers = data.rivers.map(({ borderId }) => borderById[borderId])

  return {
    islands,
    rivers,
    stateBorders,
  }
}

export function useYears() {
  const years = Array.from(
    new Set(
      getData().states.flatMap((state) =>
        Object.keys(state.regionsByYear).map((year) => parseInt(year))
      )
    )
  )

  return years
}
