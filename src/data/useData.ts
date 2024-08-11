import { useState } from 'react'
import { getWorld, setWorld } from '../storage'
import { Border, Path, State, World } from './data'
import dataJson from './data.json'
import { isBorderSlice, sliceBorder } from '../helpers'

function getData() {
  const storageData = getWorld()
  if (storageData.borders.length === 0) {
    const world = dataJson as unknown as World
    setWorld(world)
    return world
  }

  return storageData
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

// function sliceBorder(path: Path, start: number, end: number) {
//   if (start < end) {
//     return path.slice(start, end + 1)
//   } else {
//     return path.toReversed().slice(end, start + 1)
//   }
// }

export function useData(year: number) {
  const [data, setData] = useState(getData)
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

  const borderById = data.borders.reduce<Record<string, Border>>(
    (acc, curr) => {
      acc[curr.id] = curr
      return acc
    },
    {}
  )

  const islands = data.islands.flatMap(({ borders }) =>
    borders.map((id) => borderById[id])
  )

  const rivers = data.rivers.map(({ borderId }) => borderById[borderId])

  function saveState(state: State) {
    const newStates = data.states.map((s) =>
      s.name === state.name ? { ...state } : { ...s }
    )

    const newData = { ...data, states: newStates }
    setData(newData)
    setWorld(newData)
    console.info('Saved state!')
  }

  return {
    islands,
    rivers,
    stateBorders,
    saveState,
    borderById,
    allStates: data.states,
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
