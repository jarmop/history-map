import { useState } from 'react'
import { borders as bordersData, regions as regionsData } from './newData'
import { MapRegion, TestMap } from './TestMap'
import { Border, BorderConnection, Region } from './newTypes'
import { YearInput } from '../world/YearInput'

export function TestWorld() {
  const years = [0]
  const [year, setYear] = useState(years[0])
  const [borders, setBorders] = useState(bordersData)
  const [regions, setRegions] = useState(regionsData)

  // Use this to get next border branch

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

  console.log('branchesByBorderId')
  console.log(branchesByBorderId)
  console.log('borders')
  console.log(borders)
  console.log('regions')
  console.log(regions)

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

  function getNextPath(
    border: Border,
    reverse: boolean,
    startIndex: number,
    firstBorderId: number
  ): [number, number][] {
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
      return nextPath
    }

    return [
      ...nextPath,
      ...getNextPath(
        nextBorder,
        nextConnection.reverse || false,
        nextStartIndex,
        firstBorderId
      ),
    ]
  }

  /**
   * Find borders by year, and then regions that are defined by those borders but don't have dividers
   */
  const mapRegions: MapRegion[] = regions
    .filter((r) => !r.divider)
    .map((region) => {
      const border = borderById[region.border.borderId]

      if (!border.startPoint || !border.endPoint) {
        return {
          id: region.id,
          path: border.path,
        }
      }

      const nextBorder = region.border.reverse
        ? borderById[border.startPoint.borderId]
        : borderById[border.endPoint.borderId]

      const firstPath = region.border.reverse
        ? [...border.path].reverse()
        : border.path

      const point = region.border.reverse ? border.startPoint : border.endPoint

      const nextPath = getNextPath(
        nextBorder,
        point.reverse || false,
        point.index,
        region.border.borderId
      )

      return {
        id: region.id,
        path: [...firstPath, ...nextPath],
      }
    })

  console.log('mapRegions')
  console.log(mapRegions)

  function getNextBorderId() {
    return (
      borders.reduce((acc, curr) => {
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

  function getRegionBorders(region: Region): Record<Border['id'], boolean> {
    const parentRegion = regions.find(
      (r) => r.divider === region.border.borderId
    )
    if (!parentRegion) {
      return { [region.border.borderId]: false }
    }

    return {
      ...getRegionBorders(parentRegion),
      [region.border.borderId]: region.border.reverse || false,
    }
  }

  function getBorderIndexByRegionIndex(region: Region, regionIndex: number) {
    // get list of region borders of all the parent regions {borderId, reverse: boolean}
    // Then start travelling from the closest parents border. Go to next border. Whether it's start
    // or end point, is described by the reverse boolean. Travel around the region borders like this
    // until you find the borders where the new border is connecting to
    const border = borderById[region.border.borderId]
    let lengthSoFar = 0
    if (regionIndex < lengthSoFar + border.path.length) {
      const relativeIndex = regionIndex - lengthSoFar
      return {
        borderId: border.id,
        index: region.border.reverse
          ? border.path.length - 1 - relativeIndex
          : relativeIndex,
        reverse: region.border.reverse,
      }
    }
    lengthSoFar += border.path.length
    const reverseMap = getRegionBorders(region)

    const borderEndPoint = region.border.reverse
      ? border.startPoint
      : border.endPoint
    if (!borderEndPoint) {
      throw new Error('No border end point!')
    }

    const nextBorder = borderById[borderEndPoint.borderId]
    // need to slice this border from "borderEndPoint.index" to next (rightside) connection
    // Do borders always start from the "right side" of another border? If reverse, needs to be "left side".
    if (regionIndex < lengthSoFar + nextBorder.path.length) {
      const relativeIndex = regionIndex - lengthSoFar
      return {
        borderId: nextBorder.id,
        index: reverseMap[nextBorder.id] // check if border is used in reverse by its region
          ? nextBorder.path.length - 1 - relativeIndex
          : relativeIndex,
      }
    }
    lengthSoFar += nextBorder.path.length
  }

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    console.log('onPathCompleted')
    const region = regionById[mapRegion.id]

    const startBorder = getBorderIndexByRegionIndex(region, start)
    console.log('startBorder', startBorder)
    const endBorder = getBorderIndexByRegionIndex(region, end)
    console.log('endBorder', endBorder)

    const newBorder: Border = {
      id: getNextBorderId(),
      path: path,
      startPoint: startBorder,
      endPoint: endBorder,
    }
    setBorders([...borders, newBorder])

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
      { ...region, divider: newBorder.id },
      region2,
      region3,
    ])
  }

  return (
    <>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <TestMap regions={mapRegions} onPathCompleted={onPathCompleted} />
      <YearInput year={year} years={years} onChange={(year) => setYear(year)} />
    </>
  )
}
