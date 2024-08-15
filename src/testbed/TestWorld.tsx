import { useState } from 'react'
import { borderById, connectionById, regions as regionsData } from './newData'
import { MapRegion, TestMap } from './TestMap'
import { Region } from './newTypes'

export function TestWorld() {
  const [regions, setRegions] = useState(regionsData)

  const regionsById  = regions.reduce<Record<string, Region>>(
  (acc, curr) => {
    acc[curr.id] = curr
    return acc
  },
  {}
)

  const mapRegions: MapRegion[] = regions.map((region) => ({
    id: region.id,
    path: region.borderIds.flatMap((borderId) => {
      const border = borderById[borderId]
      const startPoint = connectionById[border.startPoint]
      return [startPoint.point, ...border.path]
    }),
  }))

  function onPathCompleted(
    mapRegion: MapRegion,
    path: [number, number][],
    start: number,
    end: number
  ) {
    const divider = {
      id: 'border1',
      path,
      startPoint: start,
      endPoint: end,
    }

    const region = regionsById[mapRegion.id]

    // const regionBorder = 

    const border2 = {

    }



    // console.log('onPathCompleted')
    // console.log(region)
    // console.log(path)
    // console.log(start)
    // console.log(end)
  }

  return <TestMap regions={mapRegions} onPathCompleted={onPathCompleted} />
}
