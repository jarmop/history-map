import { useState } from 'react'
import { Border, BorderConnection, Region } from './newTypes'
import { MapRegion } from './TestMap'
import { getBorders, getRegions } from './geographicData'
// import { getBorders, getRegions } from './testData'

type BorderData = {
  borderId: Border['id']
  path: [number, number][]
  reverse: boolean
}

export function useData(year: number) {
  const [allBorders, setBorders] = useState<Border[]>(getBorders)
  const [regions, setRegions] = useState<Region[]>(getRegions)

  const borders = allBorders.filter(
    ({ startYear, endYear }) =>
      (!startYear || startYear <= year) && (!endYear || endYear >= year)
  )

  const branchesByBorderId = borders.reduce<
    Record<
      Border['id'],
      { forward: BorderConnection[]; reverse: BorderConnection[] }
    >
  >((acc, curr) => {
    if (curr.startPoint && curr.endPoint) {
      if (!acc[curr.startPoint.borderId]) {
        acc[curr.startPoint.borderId] = { forward: [], reverse: [] }
      }
      if (!acc[curr.endPoint.borderId]) {
        acc[curr.endPoint.borderId] = { forward: [], reverse: [] }
      }

      acc[curr.startPoint.borderId][
        curr.startPoint.reverse ? 'reverse' : 'forward'
      ].push({
        borderId: curr.id,
        index: curr.startPoint.index,
      })
      acc[curr.endPoint.borderId][
        curr.endPoint.reverse ? 'reverse' : 'forward'
      ].push({
        borderId: curr.id,
        index: curr.endPoint.index,
        reverse: true,
      })
    }

    return acc
  }, {})

  Object.values(branchesByBorderId).forEach((bcs) => {
    // small index first
    bcs.forward.sort((a, b) => a.index - b.index)
    // big index first
    bcs.reverse.sort((a, b) => b.index - a.index)
  })

  const borderById = borders.reduce<Record<string, Border>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const regionById = regions.reduce<Record<string, Region>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  function getNextBranch(
    border: Border,
    reverse: boolean,
    startIndex?: number
  ) {
    return reverse
      ? branchesByBorderId[border.id].reverse.filter(
          (bc) => !startIndex || bc.index < startIndex
        )[0]
      : branchesByBorderId[border.id].forward.filter(
          (bc) => !startIndex || bc.index > startIndex
        )[0]
  }

  function getBorderData(
    border: Border,
    reverse: boolean,
    startIndex: number,
    firstBorderId: number
  ): BorderData[] {
    let nextConnection = getNextBranch(border, reverse, startIndex)
    let nextBorder = undefined
    let nextStartIndex = 0
    let endIndex = 0
    if (!nextConnection) {
      if (border.startPoint && border.endPoint) {
        nextConnection = reverse ? border.startPoint : border.endPoint
      } else {
        // Connecting to itself
        nextConnection = { borderId: border.id, reverse, index: 0 }
      }
      nextBorder = borderById[nextConnection.borderId]
      nextStartIndex = reverse ? border.path.length - 1 : 0
      endIndex = reverse ? 0 : border.path.length - 1
    } else {
      nextBorder = borderById[nextConnection.borderId]
      nextStartIndex = nextConnection.reverse ? nextBorder.path.length - 1 : 0
      endIndex = nextConnection.index
    }

    const nextPath = reverse
      ? border.path.slice(endIndex, startIndex + 1).reverse()
      : border.path.slice(startIndex, endIndex + 1)

    if (nextConnection.borderId === firstBorderId) {
      return [{ borderId: border.id, path: nextPath, reverse }]
    }

    return [
      { borderId: border.id, path: nextPath, reverse },
      ...getBorderData(
        nextBorder,
        nextConnection.reverse || false,
        nextStartIndex,
        firstBorderId
      ),
    ]
  }

  function regionExistsInYear(region: Region): boolean {
    const border = borderById[region.border.borderId]
    const dividerBorder =
      region.dividers && region.dividers.some((d) => borderById[d])
    return border && !dividerBorder
  }

  const mapRegions: MapRegion[] = []
  const mapRegionData: Record<Region['id'], BorderData[]> = {}
  regions.filter(regionExistsInYear).forEach((region) => {
    const border = borderById[region.border.borderId]

    if (!border.startPoint || !border.endPoint) {
      mapRegions.push({
        id: region.id,
        path: border.path,
      })
      mapRegionData[region.id] = [
        {
          borderId: border.id,
          path: border.path,
          reverse: false,
        },
      ]
      return
    }

    const nextBorder = region.border.reverse
      ? borderById[border.startPoint.borderId]
      : borderById[border.endPoint.borderId]

    const firstPath = region.border.reverse
      ? [...border.path].reverse()
      : border.path

    const point = region.border.reverse ? border.startPoint : border.endPoint

    const borderData = getBorderData(
      nextBorder,
      point.reverse || false,
      point.index,
      region.border.borderId
    )

    mapRegions.push({
      id: region.id,
      path: [...firstPath, ...borderData.flatMap((p) => p.path)],
    })
    mapRegionData[region.id] = borderData
  })

  function getNextBorderId() {
    return (
      allBorders.reduce((acc, curr) => {
        return curr.id > acc ? curr.id : acc
      }, 0) + 1
    )
  }

  function getNextRegionId() {
    return (
      regions.reduce((acc, curr) => {
        return curr.id > acc ? curr.id : acc
      }, 0) + 1
    )
  }

  function getBorderDataByRegionIndex(region: Region, regionIndex: number) {
    const lengthSoFar = 0
    let index = 0
    const borderData = mapRegionData[region.id].find((data) => {
      const { path } = data
      if (regionIndex < lengthSoFar + path.length) {
        index = regionIndex - lengthSoFar
        return true
      }
      return false
    })

    return (
      borderData && {
        borderId: borderData.borderId,
        index,
        reverse: borderData.reverse,
      }
    )
  }

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    // console.log('onPathCompleted')
    const region = regionById[mapRegion.id]

    const startPoint = getBorderDataByRegionIndex(region, start)
    // console.log('startBorder', startPoint)
    const endPoint = getBorderDataByRegionIndex(region, end)
    // console.log('endBorder', endPoint)

    if (!startPoint || !endPoint) {
      throw new Error('Start and end border data not found')
    }

    const newBorder: Border = {
      id: getNextBorderId(),
      path: path,
      startPoint: startPoint,
      endPoint: endPoint,
      startYear: year,
      endYear: year + 5,
    }
    setBorders([...allBorders, newBorder])

    const region2 = {
      id: getNextRegionId(),
      border: { borderId: newBorder.id },
    }
    const region3 = {
      id: region2.id + 1,
      border: { borderId: newBorder.id, reverse: true },
    }

    setRegions([
      ...regions.filter((r) => r.id !== region.id),
      { ...region, dividers: [...(region.dividers || []), newBorder.id] },
      region2,
      region3,
    ])
  }

  // console.log('branchesByBorderId')
  // console.log(branchesByBorderId)
  // console.log('allBorders')
  // console.log(allBorders)
  // console.log('borders')
  // console.log(borders)
  // console.log('regions')
  // console.log(regions)
  // console.log('mapRegions')
  // console.log(mapRegions)
  // console.log('mapRegionData')
  // console.log(mapRegionData)

  return { mapRegions, onPathCompleted }
}
