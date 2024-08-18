import { useEffect, useRef, useState } from 'react'
import { useMouse } from './useMouse'
import { Region } from './Region'
import { DrawPath } from './DrawPath'

export type MapRegion = { id: string; path: [number, number][] }

// const aspectRatio = 16 / 9
const aspectRatio = 4 / 3
// const aspectRatio = 1

interface CustomMapProps {
  regions: MapRegion[]
  onPathCompleted: (
    region: MapRegion,
    points: [number, number][],
    start: number,
    end: number
  ) => void
}

export function TestMap({ regions, onPathCompleted }: CustomMapProps) {
  const [activeBorder, setActiveBorder] = useState('')
  const [newPath, setNewPath] = useState<{
    start?: { regionId: MapRegion['id']; i: number }
    points: [number, number][]
  }>()
  const points = newPath?.points || []
  const [width, setWidth] = useState(1)

  const domRef = useRef<HTMLDivElement>(null)

  const height = width / aspectRatio

  useEffect(() => {
    window.addEventListener('load', () => {
      setWidth(domRef.current?.offsetWidth || 1)
    })
  }, [])

  const { xy } = useMouse(domRef.current)

  function toggleActiveBorder(id: string) {
    points.length < 1 &&
      setActiveBorder((activeBorder) => (activeBorder === id ? '' : id))
  }

  function selectPoint(
    point: [number, number],
    start?: { regionId: MapRegion['id']; i: number }
  ) {
    setNewPath((newPath) => {
      const wtf = newPath
        ? { ...newPath, points: [...points, point] }
        : { start: start, points: [point] }

      return wtf
    })
  }

  const [mouseXY, setMouseXy] = useState<number[]>()

  useEffect(() => {
    function keyup(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setNewPath(undefined)
        setMouseXy(undefined)
      }
    }
    document.addEventListener('keyup', keyup)
    return () => {
      document.removeEventListener('keyup', keyup)
    }
  }, [])

  const [downXy, setDownXy] = useState([0, 0])

  function selectBorderPoint(
    region: MapRegion,
    point: [number, number],
    i: number
  ) {
    if (points.length > 0) {
      if (!newPath?.start) {
        return
      }

      const path = [...points]
      path.shift()
      onPathCompleted(region, path, newPath.start.i, i)

      setNewPath(undefined)
    } else {
      selectPoint(point, { regionId: region.id, i })
    }
  }

  return (
    <div ref={domRef}>
      <svg
        viewBox={`${xy[0]} ${xy[1]} ${width} ${height}`}
        style={{ background: 'lightcyan' }}
        onMouseMove={(e) => {
          if (points.length < 1) return
          const x = e.clientX + xy[0]
          const y = e.clientY + xy[1]
          setMouseXy([x, y])
        }}
        onMouseDown={(e) => {
          setDownXy([e.clientX, e.clientY])
        }}
        onMouseUp={(e) => {
          if (
            points.length > 0 &&
            e.clientX === downXy[0] &&
            e.clientY === downXy[1]
          ) {
            selectPoint([e.clientX + xy[0], e.clientY + xy[1]])
          }
          setDownXy([0, 0])
        }}
      >
        {regions
          // .filter((r) => r.id !== activeBorder)
          .sort((r1, r2) =>
            r1.id === activeBorder ? 1 : r2.id === activeBorder ? -1 : 0
          )
          .map((region, i) => (
            <Region
              key={i}
              border={region.path}
              onClick={() => toggleActiveBorder(region.id)}
              active={activeBorder === region.id}
              // active={activeBorder !== undefined}
              selectPoint={(point: [number, number], i: number) =>
                selectBorderPoint(region, point, i)
              }
            />
          ))}
        {points.length > 0 && mouseXY && (
          <DrawPath points={points} mouseXY={mouseXY} />
        )}
      </svg>
    </div>
  )
}
