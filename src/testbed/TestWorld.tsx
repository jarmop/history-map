import { useState } from 'react'
import { borders as bordersData, regions as regionsData } from './newData'
import { MapRegion, TestMap } from './TestMap'
import { Border, Region } from './newTypes'
import { sliceRegion } from './helpers'

export function TestWorld() {
  const [borders, setBorders] = useState(bordersData)
  // const [paths, setPaths] = useState(pathsData)
  const [regions, setRegions] = useState(regionsData)

  console.log('borders')
  console.log(borders)
  console.log('regions')
  console.log(regions)

  // const pathById = paths.reduce<Record<string, Path>>((acc, curr) => {
  //   acc[curr.id] = curr
  //   return acc
  // }, {})

  const borderById = borders.reduce<Record<string, Border>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const regionById = regions.reduce<Record<string, Region>>((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

  const mapRegions: MapRegion[] = regions.map((region) => {
    const path = region.borders.flatMap((borderConnection) => {
      const border = borderById[borderConnection.borderId]
      if (!border.startPoint || !border.endPoint) {
        return border.path
      }

      const parentBorder = borderById[border.startPoint.borderId]

      if (borderConnection.reverse) {
        return [
          ...[...border.path].reverse(),
          ...parentBorder.path.slice(
            border.startPoint.index,
            border.endPoint.index + 1
          ),
        ]
      }

      return [
        ...border.path,
        ...parentBorder.path.slice(border.endPoint.index),
        ...parentBorder.path.slice(0, border.startPoint.index + 1),
      ]

      // const path = pathById[border.pathId]
      // if (border.startPoint > border.endPoint) {
      //   return
      // }
      // return [startPoint.point, ...border.path]
    })
    return {
      id: region.id,
      path,
    }
  })

  console.log(mapRegions)

  // function getMaxConnectionNum() {
  //   return connections.reduce((acc, curr) => {
  //     const id = parseInt(curr.id.slice(-1))
  //     return id > acc ? id : acc
  //   }, 0)
  // }

  // function getMaxBorderNum() {
  //   return borders.reduce((acc, curr) => {
  //     const id = parseInt(curr.id.slice(-1))
  //     return id > acc ? id : acc
  //   }, 0)
  // }

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    console.log('onPathCompleted')
    const region = regionById[mapRegion.id]
    const border = borderById[region.borders[0].borderId]

    const newBorder: Border = {
      id: 'border2',
      path: path,
      startPoint: { borderId: border.id, index: start },
      endPoint: { borderId: border.id, index: end },
    }
    setBorders([...borders, newBorder])

    const region2 = { id: 'region2', borders: [{ borderId: newBorder.id }] }
    const region3 = {
      id: 'region3',
      borders: [{ borderId: newBorder.id, reverse: true }],
    }

    setRegions([...regions, region2, region3])

    // const regionBorders = region.borderIds.map((id) => borderById[id])

    // const { borders, newConnections } = sliceRegion(regionBorders, start, end)

    // console.log(newConnections)

    // let maxConnectionNum = getMaxConnectionNum()
    // const cs = newConnections.map((c) => {
    //   const connection = {
    //     ...c,
    //     id: 'connection' + maxConnectionNum + 1,
    //   }
    //   maxConnectionNum++

    //   return connection
    // })

    // let maxBorderNum = getMaxBorderNum()
    // const newBorders = [
    //   borders[0][borders[0].length - 1],
    //   borders[1][0],
    //   borders[2][0],
    // ].map((b) => {
    //   const border = { ...b, id: 'border' + maxBorderNum + 1 }
    //   maxBorderNum++

    //   return border
    // })

    // newBorders[0].endPoint = cs[0].id
    // newBorders[1].startPoint = cs[0].id
    // newBorders[1].endPoint = cs[1].id
    // newBorders[2].startPoint = cs[1].id

    // const divider = {
    //   id: 'border' + maxBorderNum + 1,
    //   path,
    //   startPoint: cs[0].id,
    //   endPoint: cs[1].id,
    // }

    // // const region1: Region = {
    // //   ...region,
    // //   borderIds: newBorders.map((b) => b.id),
    // // }
    // const region2: Region = {
    //   id: 'region2',
    //   borderIds: [newBorders[0].id, divider.id, newBorders[2].id],
    // }
    // const region3: Region = {
    //   id: 'region3',
    //   borderIds: [newBorders[1].id, divider.id],
    // }

    // setConnections((connections) => [...connections, ...cs])
    // setBorders((borders) => [...borders, ...newBorders, divider])
    // setRegions([region2, region3])

    // // console.log('onPathCompleted')
    // // console.log(region)
    // // console.log(path)
    // // console.log(start)
    // // console.log(end)
  }

  return <TestMap regions={mapRegions} onPathCompleted={onPathCompleted} />
}
