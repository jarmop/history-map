import { useState } from 'react'
import { Border, BorderConnection, Region } from './newTypes'
import { MapRegion } from './TestMap'
// import { getBorders, getRegions } from './geographicData'
import { getBorders, getRegions } from './testData'

type BorderData = {
  borderId: Border['id']
  path: [number, number][]
  reverse: boolean
  start: number // index where the sliced path starts
}

export function useData(year: number) {
  const [allBorders, setBorders] = useState<Border[]>(getBorders)
  const [regions, setRegions] = useState<Region[]>(getRegions)

  // const borders = allBorders
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

  // console.log('branchesByBorderId')
  // console.log(branchesByBorderId)
  // console.log('allBorders')
  // console.log(allBorders)
  // console.log('borders')
  // console.log(borders)
  // console.log('regions')
  // console.log(regions)

  function getNextBranch(
    border: Border,
    reverse: boolean,
    startIndex: number,
    previousBorderId: Border['id']
  ) {
    const branch = branchesByBorderId[border.id]

    return (
      branch &&
      (reverse
        ? branch.reverse.filter(
            (bc) =>
              startIndex === undefined ||
              bc.index < startIndex ||
              (bc.index === startIndex && bc.borderId !== previousBorderId)
          )[0]
        : branch.forward.filter(
            (bc) =>
              startIndex === undefined ||
              bc.index > startIndex ||
              (bc.index === startIndex && bc.borderId !== previousBorderId)
          )[0])
    )
  }

  function getBorderData(
    border: Border,
    reverse: boolean,
    startIndex: number,
    firstBorderId: number,
    previousBorderId: Border['id']
  ): BorderData[] {
    // console.log(border)
    // console.log(reverse)
    // console.log(startIndex)
    // console.log(firstBorderId)

    let nextConnection = getNextBranch(
      border,
      reverse,
      startIndex,
      previousBorderId
    )
    // console.log('nextConnection')
    // console.log(nextConnection)
    let nextBorder = undefined
    let nextStartIndex = 0
    let endIndex = 0
    if (!nextConnection) {
      if (border.startPoint && border.endPoint) {
        // console.log('a')
        nextConnection = reverse ? border.startPoint : border.endPoint
        nextBorder = borderById[nextConnection.borderId]
        // nextStartIndex = reverse ? nextBorder.path.length - 1 : 0
        nextStartIndex = nextConnection.index
      } else {
        // Connecting to itself
        // console.log('b')
        nextBorder = border
        nextStartIndex = reverse ? nextBorder.path.length - 1 : 0
        nextConnection = { borderId: border.id, reverse, index: nextStartIndex }
        // nextBorder = borderById[nextConnection.borderId]
      }

      endIndex = reverse ? 0 : nextBorder.path.length - 1
    } else {
      // console.log('c')
      nextBorder = borderById[nextConnection.borderId]
      nextStartIndex = nextConnection.reverse ? nextBorder.path.length - 1 : 0
      endIndex = nextConnection.index
    }

    const nextPath = reverse
      ? border.path.slice(endIndex, startIndex + 1).reverse()
      : border.path.slice(startIndex, endIndex + 1)

    const borderData = {
      borderId: border.id,
      path: nextPath,
      reverse,
      start: startIndex,
    }

    if (nextConnection.borderId === firstBorderId) {
      // console.log('returning', nextConnection.borderId, firstBorderId)
      // console.log(border)
      return [borderData]
    }

    return [
      borderData,
      ...getBorderData(
        nextBorder,
        nextConnection.reverse || false,
        nextStartIndex,
        firstBorderId,
        border.id
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
          start: 0,
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

    // console.log('getting border data', region.id)
    const borderData = getBorderData(
      nextBorder,
      point.reverse || false,
      point.index,
      region.border.borderId,
      border.id
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

  // console.log('mapRegions')
  // console.log(mapRegions)
  // console.log('mapRegionData')
  // console.log(mapRegionData)

  function getBorderDataByRegionIndex(region: Region, regionIndex: number) {
    // console.log('regionIndex', regionIndex)
    // console.log('mapRegionData', mapRegionData[region.id])
    let lengthSoFar = borderById[region.border.borderId].path.length
    let index = 0

    if (regionIndex < lengthSoFar) {
      return {
        borderId: region.border.borderId,
        index: region.border.reverse
          ? lengthSoFar - 1 - regionIndex
          : regionIndex,
        reverse: region.border.reverse,
      }
    }

    const borderData = mapRegionData[region.id].find((data) => {
      // console.log('lengthSoFar', lengthSoFar)
      const { path, start, reverse } = data
      if (regionIndex < lengthSoFar + path.length) {
        index = reverse
          ? start - (regionIndex - lengthSoFar)
          : start + regionIndex - lengthSoFar
        return true
      }

      lengthSoFar += path.length
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
    console.log('startPoint', startPoint)
    const endPoint = getBorderDataByRegionIndex(region, end)
    console.log('endPoint', endPoint)

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

  return { mapRegions, onPathCompleted }
}
