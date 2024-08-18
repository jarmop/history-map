import { useState } from 'react'
import {
  connections as connectionsData,
  borders as bordersData,
  regions as regionsData,
} from './newData'
import { MapRegion, TestMap } from './TestMap'
import { Border, Connection, Region } from './newTypes'
import { sliceRegion } from './helpers'

export function TestWorld() {
  const [regions, setRegions] = useState(regionsData)
  const [connections, setConnections] = useState(connectionsData)
  const [borders, setBorders] = useState(bordersData)

  const connectionById = connections.reduce<Record<string, Connection>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const borderById = borders.reduce<Record<string, Border>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const regionById = regions.reduce<Record<string, Region>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const mapRegions: MapRegion[] = regions.map((region) => {
    let previousEndPoint: Connection | undefined
    const path = region.borderIds.flatMap((borderId) => {
      const border = borderById[borderId]
      const startPoint = connectionById[border.startPoint]
      const endPoint = connectionById[border.endPoint]

      if (previousEndPoint && previousEndPoint.id !== startPoint.id) {
        previousEndPoint = startPoint
        return [...border.path, endPoint.point].reverse()
      }

      previousEndPoint = endPoint
      return [startPoint.point, ...border.path]
    })
    return {
      id: region.id,
      path,
    }
  })

  function getMaxConnectionNum() {
    return connections.reduce((acc, curr) => {
      const id = parseInt(curr.id.slice(-1))
      return id > acc ? id : acc
    }, 0)
  }

  function getMaxBorderNum() {
    return borders.reduce((acc, curr) => {
      const id = parseInt(curr.id.slice(-1))
      return id > acc ? id : acc
    }, 0)
  }

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    const region = regionById[mapRegion.id]

    const regionBorders = region.borderIds.map((id) => borderById[id])

    const { borders, newConnections } = sliceRegion(regionBorders, start, end)

    console.log(newConnections)

    let maxConnectionNum = getMaxConnectionNum()
    const cs = newConnections.map((c) => {
      const connection = {
        ...c,
        id: 'connection' + maxConnectionNum + 1,
      }
      maxConnectionNum++

      return connection
    })

    let maxBorderNum = getMaxBorderNum()
    const newBorders = [
      borders[0][borders[0].length - 1],
      borders[1][0],
      borders[2][0],
    ].map((b) => {
      const border = { ...b, id: 'border' + maxBorderNum + 1 }
      maxBorderNum++

      return border
    })

    newBorders[0].endPoint = cs[0].id
    newBorders[1].startPoint = cs[0].id
    newBorders[1].endPoint = cs[1].id
    newBorders[2].startPoint = cs[1].id

    const divider = {
      id: 'border' + maxBorderNum + 1,
      path,
      startPoint: cs[0].id,
      endPoint: cs[1].id,
    }

    // const region1: Region = {
    //   ...region,
    //   borderIds: newBorders.map((b) => b.id),
    // }
    const region2: Region = {
      id: 'region2',
      borderIds: [newBorders[0].id, divider.id, newBorders[2].id],
    }
    const region3: Region = {
      id: 'region3',
      borderIds: [newBorders[1].id, divider.id],
    }

    setConnections((connections) => [...connections, ...cs])
    setBorders((borders) => [...borders, ...newBorders, divider])
    setRegions([region2, region3])

    // console.log('onPathCompleted')
    // console.log(region)
    // console.log(path)
    // console.log(start)
    // console.log(end)
  }

  return <TestMap regions={mapRegions} onPathCompleted={onPathCompleted} />
}
