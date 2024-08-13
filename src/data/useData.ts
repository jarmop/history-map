import { useState } from 'react'
import { getWorld, setWorld } from '../storage'
import { Border, BorderSlice, Path, Region, State, World } from './data'
import dataJson from './data.json'
import { isBorderSlice, sliceBorder } from '../helpers'
import { NewPath } from '../world/types'

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

export type StateRegions = { name: string; regions: Path[] }

export type Region2 = { id: string; borders: (BorderSlice | Border['id'])[] }

export function useData(year: number) {
  const [data, setData] = useState(getData)
  const [newData, setNewData] = useState<{
    borders: Border[]
    regions: Region2[]
  }>({ borders: [], regions: [] })

  const borderById = [...data.borders, ...newData.borders].reduce<
    Record<string, Border>
  >((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
  // const stateBorders: Path[][] = []
  // const [newStateRegions, setNewStateRegions] = useState<StateRegions[]>()
  // const states: StateRegions[] = newStateRegions
  const states: StateRegions[] = []
  // const stateRegions: {name: string, regions: Region[]}[] = []

  function regionIntoPath(region: Region) {
    const foo = region
      .flatMap((borderData) => {
        if (isBorderSlice(borderData)) {
          const border = borderById[borderData.borderId]

          return sliceBorder(border.path, borderData.start, borderData.end)
        } else {
          return borderData
        }
      })
      .filter((val) => val !== undefined)

    return foo
  }

  data.states.forEach((state) => {
    const regions = findRegions(state, year)
    if (!regions) {
      return
    }

    // stateRegions.push({ name: state.name, regions })

    const regionBorders: Path[] = regions.map(regionIntoPath)

    states.push({ name: state.name, regions: regionBorders })
  })

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

  function addPath(newPath: NewPath) {
    const newBorder = {
      id: 'newBorder1',
      path: newPath.points,
      start: newPath.start,
      end: newPath.end,
    }
    const border = borderById[newPath.start.borderId]
    const newRegion1: Region2 = { id: 'newRegion1', borders: [newBorder.id] }
    const newRegion2: Region2 = { id: 'newRegion1', borders: [newBorder.id] }

    setNewData({
      borders: [...newData.borders, newBorder],
      regions: [...newData.regions, newRegion1, newRegion2],
    })

    // setData({ ...data, borders: [...data.borders, newBorder] })
  }

  console.log('newData')
  console.log(newData)

  function region2BordersIntoPath(borders: Region2['borders']) {
    const foo = borders
      .flatMap((borderData) => {
        if (isBorderSlice(borderData)) {
          const border = borderById[borderData.borderId]
          return sliceBorder(border.path, borderData.start, borderData.end)
        } else {
          return borderById[borderData].path
        }
      })
      .filter((val) => val !== undefined)

    return foo
  }

  return {
    islands,
    rivers,
    states,
    addPath,
    borderById,
    allStates: data.states,
    regions: newData.regions.map((region) => {
      return { name: region.id, path: region2BordersIntoPath(region.borders) }
    }),
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
