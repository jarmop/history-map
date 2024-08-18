import { useState } from 'react'
import { borders as bordersData, regions as regionsData } from './newData'
import { MapRegion, TestMap } from './TestMap'
import { Border, Region } from './newTypes'
import { YearInput } from '../world/YearInput'

export function TestWorld() {
  const years = [0]
  const [year, setYear] = useState(years[0])
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

  // function getBranches(border: Border) {
  //   return borders.filter((b) => b.startPoint?.borderId === border.id)
  // }

  // use this for now
  // const islandBorder = borders[0]
  // getBranches(islandBorder).forEach((b) => {
  //   getBranches(b)
  // })

  /**
   * Find borders by year, and then regions that are defined by those borders but don't have dividers
   */

  const mapRegions: MapRegion[] = regions
    .filter((r) => !r.divider)
    .map((region) => {
      const borderConnection = region.border
      const border = borderById[borderConnection.borderId]

      if (!border.startPoint || !border.endPoint) {
        return {
          id: region.id,
          path: border.path,
        }
      }

      const parentBorder = borderById[border.startPoint.borderId]

      if (borderConnection.reverse) {
        return {
          id: region.id,
          path: [
            ...[...border.path].reverse(),
            ...parentBorder.path.slice(
              border.startPoint.index,
              border.endPoint.index + 1
            ),
          ],
        }
      }

      return {
        id: region.id,
        path: [
          ...border.path,
          ...parentBorder.path.slice(border.endPoint.index),
          ...parentBorder.path.slice(0, border.startPoint.index + 1),
        ],
      }
    })

  console.log('mapRegions')
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
    const region = regionById[mapRegion.id]
    const border = borderById[region.border.borderId]

    const newBorder: Border = {
      id: 'border2',
      path: path,
      startPoint: { borderId: border.id, index: start },
      endPoint: { borderId: border.id, index: end },
    }
    setBorders([...borders, newBorder])

    const region2 = { id: 'region2', border: { borderId: newBorder.id } }
    const region3 = {
      id: 'region3',
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
