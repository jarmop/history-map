import { useState } from 'react'
import { Border, BorderSlice, Region } from '../data/data'
import { isEqualPoint, isBorderSlice } from '../helpers'
import { NewPath } from '../world/types'

export function useRegionBuilder(
  onRegionCompleted: (newRegion: Region) => void,
  xYTupleToLatLonTuple: (xy: [number, number]) => [number, number],
  borderById: Record<string, Border>
) {
  const [newPath, setNewPath] = useState<{
    start?: { borderId: string; i: number }
    points: [number, number][]
  }>()
  const [newPaths, setNewPaths] = useState<(NewPath | BorderSlice)[]>([])
  const points = newPath?.points || []

  function selectPoint(
    point: [number, number],
    start?: { borderId: string; i: number }
  ) {
    setNewPath((newPath) => {
      const wtf = newPath
        ? { ...newPath, points: [...points, point] }
        : { start: start, points: [point] }

      return wtf
    })
  }

  /**
   * Clicking a border either ends a path or starts it. Region may then share the border
   * and continue with another path from some point
   */
  function selectBorderPoint(
    border: Border,
    point: [number, number],
    i: number
  ) {
    if (points.length > 0) {
      // Ending a path
      if (!newPath) {
        // This shouldn't happen
        return
      }

      if (
        newPaths.length > 0 &&
        points.length === 1 &&
        isEqualPoint(points[0], point)
      ) {
        // Clicking again the same point on a border selects the whole border
        // Only if there are two possible endings?
        const lastPath = newPaths[newPaths.length - 1]
        // const borderSlice =
        if (!isBorderSlice(lastPath)) {
          setNewPaths((newPaths) => [
            ...newPaths,
            {
              borderId: border.id,
              start: lastPath.end?.i || 0,
              // end at whatever the next connection point?
              end: border.path.length - 1,
            },
          ])

          setNewPath(undefined)
          return
        }
      }
      const completedPath = {
        ...newPath,
        points: [...points, point],
        end: { borderId: border.id, i },
      }

      setNewPaths((newPaths) => [...newPaths, completedPath])
      setNewPath(undefined)
    } else {
      if (newPaths.length > 0) {
        const firstPath = newPaths[0]
        const startId = !isBorderSlice(firstPath) && firstPath.start?.borderId
        if (border.id === startId) {
          const lastPath = newPaths[newPaths.length - 1]
          const newPathStart = isBorderSlice(lastPath)
            ? borderById[lastPath.borderId].end?.i || 0
            : lastPath.end?.i
          const newPathsTemp = [
            ...newPaths,
            {
              borderId: border.id,
              start: newPathStart || 0,
              // end at whatever the next connection point?
              end: (!isBorderSlice(firstPath) && firstPath.start?.i) || 0,
            },
          ]
          const newRegion: Region = newPathsTemp.map((newPath) =>
            isBorderSlice(newPath)
              ? { ...newPath }
              : newPath.points.map(xYTupleToLatLonTuple)
          )
          onRegionCompleted(newRegion)
          setNewPaths(newPathsTemp)
          return
        }
      }
      // Starting a new Path
      selectPoint(point, { borderId: border.id, i })
    }
  }

  function resetNewPaths() {
    setNewPath(undefined)
    setNewPaths([])
  }

  return { selectBorderPoint, selectPoint, newPaths, resetNewPaths, points }
}
