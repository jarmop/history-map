import { useCallback, useMemo } from 'react'
import {
  Border,
  BorderConnection,
  BorderData,
  Culture,
  MapRegion,
  Marker,
  Region,
} from './newTypes'
import { getRivers, getSeas, getWorld, latLonToXy } from './geographicData'
import { LatLon } from '../data/data'
import { useWorld } from './data/usePersistedState'
import { sortById } from './helpers'

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

  const zoomXy = useCallback(
    (xy: [number, number]): [number, number] => {
      return [xy[0] * zoomMultiplier, xy[1] * zoomMultiplier]
    },
    [zoomMultiplier]
  )

  const visibleBorders = useMemo(() => {
    return allBorders.filter(
      ({ startYear, endYear }) =>
        (!startYear || startYear <= year) && (!endYear || endYear >= year)
    )
  }, [allBorders, year])

  const zoomedBorders = useMemo(() => {
    return visibleBorders.map((b) => ({
      ...b,
      path: b.path.map(zoomXy),
    }))
  }, [visibleBorders, zoomXy])

  const rivers = useMemo(() => {
    return getRivers().map((b) => ({
      ...b,
      path: b.path.map(zoomXy),
    }))
  }, [zoomXy])

  const seas = useMemo(() => {
    return getSeas().map((b) => ({
      ...b,
      path: b.path.map(zoomXy),
    }))
  }, [zoomXy])

  const markers = useMemo(() => {
    return world.markers
      .filter(
        (marker) => !marker.start || marker.start <= year
        // && (!marker.end || marker.end >= year)
      )
      .map((b) => ({
        ...b,
        xy: zoomXy(b.xy),
      }))
  }, [world.markers, zoomXy, year])

  const branchesByBorderId = visibleBorders.reduce<
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

  const visibleBorderById = visibleBorders.reduce<Record<string, Border>>(
    (acc, curr) => {
      acc[curr.id] = curr
      return acc
    },
    {}
  )

  const zoomedBorderById = zoomedBorders.reduce<Record<string, Border>>(
    (acc, curr) => {
      acc[curr.id] = curr
      return acc
    },
    {}
  )

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
    // if (firstBorderId === 31) {
    //   console.log('getBorderData')
    //   console.log('border.id', border.id)
    //   console.log('border', border)
    //   console.log('reverse', reverse)
    // }

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
        nextBorder = zoomedBorderById[nextConnection.borderId]
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
          nextBorder = zoomedBorderById[nextConnection.borderId]
          nextStartIndex = nextConnection.index
        }
        // nextBorder = borderById[nextConnection.borderId]
      } else {
        // island connecting to start
        // console.log('c')
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
      // console.log('d')
      endIndex = nextConnection.index
      if (nextConnection.borderId === firstBorderId) {
        nextConnection = undefined
      } else {
        nextBorder = zoomedBorderById[nextConnection.borderId]
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
    const branchesByDirection = branchesByBorderId[region.border.borderId]
    if (
      branchesByDirection &&
      branchesByDirection[region.border.reverse ? 'reverse' : 'forward']
        .length > 0
    ) {
      return false
    }
    const border = visibleBorderById[region.border.borderId]
    const dividerBorder =
      region.dividers && region.dividers.some((d) => visibleBorderById[d])
    return border && !dividerBorder
  }

  const cultureByRegion = world.cultures.reduce<Record<Region['id'], Culture>>(
    (acc, curr) => {
      curr.possessions.forEach((p) => {
        if (p.start <= year && (!p.end || p.end >= year)) {
          acc[p.regionId] = curr
        }
      })

      return acc
    },
    {}
  )

  // perhaps count only full borders?
  const borderUsedForward: Record<Border['id'], boolean> = {}
  const borderUsedReverse: Record<Border['id'], boolean> = {}
  // let regionSkipCount = 0

  const mapRegions: MapRegion[] = []
  const mapRegionData: Record<Region['id'], BorderData[]> = {}
  regions.filter(regionExistsInYear).forEach((region) => {
    if (
      region.border.reverse
        ? borderUsedReverse[region.border.borderId]
        : borderUsedForward[region.border.borderId]
    ) {
      // console.log('skipping border', region.border)
      // regionSkipCount++
      return
    }
    const border = zoomedBorderById[region.border.borderId]

    if (!border.startPoint || !border.endPoint) {
      const borderData = getBorderData(border, false, 0, border.id, border.id)
      const path = borderData.flatMap((p) => p.path)

      borderData.forEach((bd) => {
        if (bd.reverse) {
          borderUsedReverse[bd.borderId] = true
        } else {
          borderUsedForward[bd.borderId] = true
        }
      })

      mapRegions.push({
        id: region.id,
        path,
        color: cultureByRegion[region.id]?.color,
        border: zoomedBorderById[region.border.borderId],
        borderData,
      })
      mapRegionData[region.id] = borderData

      return
    }

    const nextBorder = region.border.reverse
      ? zoomedBorderById[border.startPoint.borderId]
      : zoomedBorderById[border.endPoint.borderId]

    const firstPath = region.border.reverse
      ? [...border.path].reverse()
      : border.path

    const point = region.border.reverse ? border.startPoint : border.endPoint

    const borderData = getBorderData(
      nextBorder,
      point.reverse || false,
      point.index,
      region.border.borderId,
      border.id
    )

    borderData.forEach((bd) => {
      if (bd.reverse) {
        borderUsedReverse[bd.borderId] = true
      } else {
        borderUsedForward[bd.borderId] = true
      }
    })

    mapRegions.push({
      id: region.id,
      path: [...firstPath, ...borderData.flatMap((p) => p.path)],
      color: cultureByRegion[region.id]?.color,
      border: zoomedBorderById[region.border.borderId],
      borderData,
    })
    mapRegionData[region.id] = borderData
  })

  // console.log('regionSkipCount', regionSkipCount)

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

  function getNextCultureId() {
    return (
      world.cultures.reduce((acc, curr) => {
        return curr.id > acc ? curr.id : acc
      }, 0) + 1
    )
  }

  function getNextMarkerId() {
    return (
      world.markers.reduce((acc, curr) => {
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
    const startBorder = zoomedBorderById[region.border.borderId]
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

    const border = visibleBorderById[bc.borderId]

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
    }

    const region2 = {
      id: getNextRegionId(),
      border: { borderId: newBorder.id },
    }
    const region3 = {
      id: region2.id + 1,
      border: { borderId: newBorder.id, reverse: true },
    }

    setWorld({
      ...world,
      borders: [...allBorders, newBorder],
      regions: sortById([
        ...regions.filter((r) => r.id !== region.id),
        { ...region, dividers: [...(region.dividers || []), newBorder.id] },
        region2,
        region3,
      ]),
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
      borders: sortById([
        ...allBorders.filter((b) => b.id !== editedBorder.id),
        editedBorder,
      ]),
    })
  }

  function onPointAdded(regionId: MapRegion['id'], index: number) {
    const region = regions.find((r) => r.id === regionId)
    if (!region) {
      throw new Error('region not found')
    }

    const borderData = getBorderDataByRegionIndex(region, index)
    if (!borderData) {
      throw new Error('borderData not found')
    }

    const border = allBorders.find((b) => b.id === borderData.borderId)
    if (!border) {
      throw new Error('border not found')
    }

    const newPoint = border.path[borderData.index]

    const editedBorder: Border = {
      ...border,
      path: [
        ...border.path.slice(0, borderData.index + 1),
        newPoint,
        ...border.path.slice(borderData.index + 1),
      ],
    }

    const affectedBorders = allBorders.filter(
      (b) =>
        (b.startPoint?.borderId === editedBorder.id &&
          b.startPoint.index > borderData.index) ||
        (b.endPoint?.borderId === editedBorder.id &&
          b.endPoint.index > borderData.index)
    )

    const fixedAffectedBorders = affectedBorders.map((b) => {
      const fixedBorder = { ...b }
      if (
        fixedBorder.startPoint &&
        fixedBorder.startPoint?.borderId === editedBorder.id &&
        fixedBorder.startPoint.index > borderData.index
      ) {
        fixedBorder.startPoint = {
          ...fixedBorder.startPoint,
          index: fixedBorder.startPoint.index + 1,
        }
      }
      if (
        fixedBorder.endPoint &&
        fixedBorder.endPoint?.borderId === editedBorder.id &&
        fixedBorder.endPoint.index > borderData.index
      ) {
        fixedBorder.endPoint = {
          ...fixedBorder.endPoint,
          index: fixedBorder.endPoint.index + 1,
        }
      }
      return fixedBorder
    })

    const editedBorders = [editedBorder, ...fixedAffectedBorders]

    const editedBorderIds = editedBorders.map((b) => b.id)

    setWorld({
      ...world,
      borders: sortById([
        ...allBorders.filter((b) => !editedBorderIds.includes(b.id)),
        ...editedBorders,
      ]),
    })
  }

  // Add new marker if does not exist
  function saveMarker(marker: Marker) {
    const updateMarkers = [
      ...world.markers.filter((m) => m.id !== marker.id),
      {
        ...marker,
        id: marker.id === 0 ? getNextMarkerId() : marker.id,
        xy: latLonToXy(marker.xy),
        latLon: marker.xy,
      },
    ]
    setWorld({
      ...world,
      markers: sortById(updateMarkers),
    })
  }

  function saveCultures(cultures: Culture[]) {
    const updatedCultureIds = cultures.map((c) => c.id)
    const newCultures = [
      ...world.cultures.filter((c) => !updatedCultureIds.includes(c.id)),
      ...cultures.map((c) => (c.id < 1 ? { ...c, id: getNextCultureId() } : c)),
    ]
    setWorld({
      ...world,
      cultures: sortById(newCultures),
    })
  }

  function deleteRegion(regionId: Region['id']) {
    const regionIdsToRemove = [regionId]
    const region1 = regionById[regionId]
    const border = visibleBorderById[region1.border.borderId]
    const region2 = regions.find(
      (r) => r.id !== regionId && r.border.borderId === border.id
    )
    if (!region2) {
      throw new Error('region2 not found')
    }
    if (!region2.dividers) {
      regionIdsToRemove.push(region2.id)
      setWorld({
        ...world,
        borders: [...world.borders.filter((b) => b.id !== border.id)],
        regions: [
          ...world.regions.filter((r) => !regionIdsToRemove.includes(r.id)),
        ],
        cultures: [
          ...world.cultures.map((c) => {
            return {
              ...c,
              possessions: c.possessions.filter(
                (p) => !regionIdsToRemove.includes(p.regionId)
              ),
            }
          }),
        ],
      })
    } else {
      // merge region1 to region2
      // what if border has a connection? Simply cannot remove the region in that case
    }
  }

  function getTemporaryRegionBorders(regionId: Region['id']) {
    const region = regionById[regionId]
    const borderData = mapRegionData[regionId]
    return [
      visibleBorderById[region.border.borderId],
      ...borderData
        .map((bd) => visibleBorderById[bd.borderId])
        .filter((b) => b.startYear || b.endYear),
    ]
  }

  function saveRegionYears(
    regionId: Region['id'],
    startYear?: number,
    endYear?: number
  ) {
    const borders = getTemporaryRegionBorders(regionId)
    const editerBorders = borders.map((b, i) => {
      if (i === 0) {
        // Is the main border of the region
        return { ...b, startYear: startYear, endYear: endYear }
      }
      // Allow only extending the timeline of other borders to avoid corrupting data
      return {
        ...b,
        startYear:
          startYear && b.startYear && startYear < b.startYear
            ? startYear
            : b.startYear,
        endYear:
          endYear && b.endYear && endYear > b.endYear ? endYear : b.endYear,
      }
    })
    const editerBorderIds = editerBorders.map((b) => b.id)

    setWorld({
      ...world,
      borders: sortById([
        ...world.borders.filter((b) => !editerBorderIds.includes(b.id)),
        ...editerBorders,
      ]),
    })
  }

  return {
    mapRegions,
    onPathCompleted,
    onPointEdited,
    onPointAdded,
    rivers,
    seas,
    markers,
    saveMarker,
    cultures: world.cultures,
    saveCultures,
    deleteRegion,
    saveRegionYears,
    cultureByRegion,
  }
}
