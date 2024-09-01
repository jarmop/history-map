import { useMemo } from 'react'
import { Border, BorderConnection, Region } from './newTypes'
import { MapRegion } from './Map/TestMap'
import { getCities, getRivers, getWorld } from './geographicData'
import { LatLon } from '../data/data'
import { useWorld } from './data/usePersistedState'

type BorderData = {
  borderId: Border['id']
  path: [number, number][]
  reverse: boolean
  start: number // index where the sliced path starts
}

function isIsland(border: Border) {
  return !border.startPoint && !border.endPoint
}

function isRiver(border: Border) {
  return !border.startPoint && border.endPoint
}

export function useData(year: number, zoom: number) {
  const [world, setWorld] = useWorld(getWorld())
  const allBorders = world.borders
  const regions = world.regions
  const zoomMultiplier = Math.pow(2, zoom - 1)

  const borders = useMemo(() => {
    return allBorders
      .filter(
        ({ startYear, endYear }) =>
          (!startYear || startYear <= year) && (!endYear || endYear >= year)
      )
      .map((b) => ({
        ...b,
        path: b.path.map(
          (xy) => [xy[0] * zoomMultiplier, xy[1] * zoomMultiplier] as LatLon
        ),
      }))
  }, [allBorders, zoomMultiplier, year])

  const rivers = useMemo(() => {
    return getRivers().map((b) => ({
      ...b,
      path: b.path.map(
        (xy) => [xy[0] * zoomMultiplier, xy[1] * zoomMultiplier] as LatLon
      ),
    }))
  }, [zoomMultiplier])

  const cities = useMemo(() => {
    return getCities().map((b) => ({
      ...b,
      xy: [b.xy[0] * zoomMultiplier, b.xy[1] * zoomMultiplier] as LatLon,
    }))
  }, [zoomMultiplier])

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
    } else if (curr.endPoint) {
      if (!acc[curr.endPoint.borderId]) {
        acc[curr.endPoint.borderId] = { forward: [], reverse: [] }
      }
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
    const branchData = branchesByBorderId[border.id]
    // console.log('branch')
    // console.log(branchData)

    return (
      branchData &&
      (reverse
        ? branchData.reverse.filter(
            (bc) =>
              startIndex === undefined ||
              bc.index < startIndex ||
              (bc.index === startIndex && bc.borderId !== previousBorderId)
          )[0]
        : branchData.forward.filter(
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
    // console.log('border', border)
    // console.log('reverse', reverse)
    // console.log('startIndex', startIndex)

    let nextConnection: BorderConnection | undefined = getNextBranch(
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
      } else if (border.endPoint) {
        // console.log('b')
        if (reverse) {
          // river connecting to start
          nextBorder = border
          nextStartIndex = 0
          nextConnection = { borderId: border.id, index: nextStartIndex }
        } else {
          // river connecting to another border
          nextConnection = border.endPoint
          nextBorder = borderById[nextConnection.borderId]
          nextStartIndex = nextConnection.index
        }
        // nextBorder = borderById[nextConnection.borderId]
      } else {
        // island connecting to start
        // console.log('b')
        nextBorder = border
        if (border.id === firstBorderId) {
          nextConnection = undefined
        } else {
          nextStartIndex = reverse ? nextBorder.path.length - 1 : 0
          nextConnection = {
            borderId: border.id,
            reverse,
            index: nextStartIndex,
          }
        }
        // nextBorder = borderById[nextConnection.borderId]
      }

      endIndex = reverse ? 0 : nextBorder.path.length - 1
    } else {
      // console.log('c')
      endIndex = nextConnection.index
      if (nextConnection.borderId === firstBorderId) {
        nextConnection = undefined
      } else {
        nextBorder = borderById[nextConnection.borderId]
        nextStartIndex = nextConnection.reverse ? nextBorder.path.length - 1 : 0
      }
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

    if (!nextConnection || !nextBorder) {
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
      const borderData = getBorderData(border, false, 0, border.id, border.id)
      const path = borderData.flatMap((p) => p.path)
      // console.log('borderData')
      // console.log(borderData)
      mapRegions.push({
        id: region.id,
        path,
      })
      mapRegionData[region.id] = borderData

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
    const startBorder = borderById[region.border.borderId]
    let lengthSoFar =
      isIsland(startBorder) && mapRegionData[region.id].length > 0
        ? 0
        : startBorder.path.length
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

  function confirmBorderConnection(
    name: string,
    bc: BorderConnection | undefined
  ) {
    console.log(name, bc)
    if (!bc) {
      throw new Error(`${name} data not found`)
    }

    const border = borderById[bc.borderId]

    return isRiver(border) && !confirm(`${name} reverse: ${bc.reverse}?`)
      ? { ...bc, reverse: !bc.reverse }
      : bc
  }

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    // console.log('onPathCompleted')
    const region = regionById[mapRegion.id]

    const startPoint = confirmBorderConnection(
      'StartPoint',
      getBorderDataByRegionIndex(region, start)
    )

    const endPoint = confirmBorderConnection(
      'EndPoint',
      getBorderDataByRegionIndex(region, end)
    )

    const invertedZoomMultiplier = 1 / zoomMultiplier

    const newBorder: Border = {
      id: getNextBorderId(),
      path: path.map(
        (xy) =>
          [
            xy[0] * invertedZoomMultiplier,
            xy[1] * invertedZoomMultiplier,
          ] as LatLon
      ),
      startPoint: startPoint,
      endPoint: endPoint,
      startYear: year,
      endYear: year + 5,
    }
    // setBorders([...allBorders, newBorder])

    const region2 = {
      id: getNextRegionId(),
      border: { borderId: newBorder.id },
    }
    const region3 = {
      id: region2.id + 1,
      border: { borderId: newBorder.id, reverse: true },
    }

    // setRegions([
    //   ...regions.filter((r) => r.id !== region.id),
    //   { ...region, dividers: [...(region.dividers || []), newBorder.id] },
    //   region2,
    //   region3,
    // ])

    setWorld({
      ...world,
      borders: [...allBorders, newBorder],
      regions: [
        ...regions.filter((r) => r.id !== region.id),
        { ...region, dividers: [...(region.dividers || []), newBorder.id] },
        region2,
        region3,
      ],
    })
  }

  function onPointEdited(
    regionId: MapRegion['id'],
    index: number,
    newPoint: [number, number]
  ) {
    const region = regions.find((r) => r.id === regionId)
    if (!region) {
      throw new Error('region not found')
    }

    const borderData = getBorderDataByRegionIndex(region, index)
    if (!borderData) {
      throw new Error('borderData not found')
    }

    const newPointWithoutZoom = [
      newPoint[0] / zoomMultiplier,
      newPoint[1] / zoomMultiplier,
    ] as [number, number]

    const border = allBorders.find((b) => b.id === borderData.borderId)
    if (!border) {
      throw new Error('border not found')
    }
    const editedBorder: Border = {
      ...border,
      path: [
        ...border.path.slice(0, borderData.index),
        newPointWithoutZoom,
        ...border.path.slice(borderData.index + 1),
      ],
    }

    setWorld({
      ...world,
      borders: [
        ...allBorders.filter((b) => b.id !== editedBorder.id),
        editedBorder,
      ],
    })
  }

  return { mapRegions, onPathCompleted, onPointEdited, rivers, cities }
}
