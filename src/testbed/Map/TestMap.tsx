import { useEffect, useRef, useState } from 'react'
import { useMouse } from './useMouse'
import { Region } from './Region'
import { DrawPath } from './DrawPath'
import { City as CityObj, River } from '../newTypes'
import { City } from './City'

export type MapRegion = { id: number; path: [number, number][] }

// const aspectRatio = 16 / 9
const aspectRatio = 4 / 3
// const aspectRatio = 1
// const aspectRatio = 2 / 1

interface CustomMapProps {
  regions: MapRegion[]
  rivers: River[]
  cities: CityObj[]
  zoom: number
  onPathCompleted: (
    region: MapRegion,
    points: [number, number][],
    start: number,
    end: number
  ) => void
}

// const regionColors = [
//   'red',
//   'green',
//   'blue',
//   'yellow',
//   'purple',
//   'pink',
//   'brown',
//   'gray',
// ]

export function TestMap({
  regions,
  rivers,
  cities,
  zoom,
  config,
  onPathCompleted,
}: CustomMapProps) {
  const [activeBorder, setActiveBorder] = useState(-1)
  const [newPath, setNewPath] = useState<{
    start?: { regionId: MapRegion['id']; i: number }
    points: [number, number][]
  }>()
  const points = newPath?.points || []
  const [width, setWidth] = useState(1)

  const domRef = useRef<HTMLDivElement>(null)
  const prevZoom = useRef(zoom)

  const height = width / aspectRatio

  useEffect(() => {
    window.addEventListener('load', () => {
      setWidth(domRef.current?.offsetWidth || 1)
    })
  }, [])

  const { xy, setXy } = useMouse(domRef.current)

  useEffect(() => {
    if (zoom === prevZoom.current) {
      return
    }

    const zoomMultiplier = zoom > prevZoom.current ? 2 : 1 / 2

    setXy((xy) => [
      (xy[0] + width / 2) * zoomMultiplier - width / 2,
      (xy[1] + height / 2) * zoomMultiplier - height / 2,
    ])

    prevZoom.current = zoom
  }, [zoom, setXy, height, width])

  function toggleActiveBorder(id: number) {
    points.length < 1 &&
      setActiveBorder((activeBorder) => (activeBorder === id ? -1 : id))
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

  const [mouseXY, setMouseXy] = useState<[number, number]>()

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
              // fill={regionColors[i]}
              fill={'lightgrey'}
              active={activeBorder === region.id}
              // active={activeBorder !== undefined}
              selectPoint={(point: [number, number], i: number) =>
                selectBorderPoint(region, point, i)
              }
            />
          ))}
        {rivers.map((river) => (
          <path
            key={river.id}
            fill="none"
            stroke="lightcyan"
            strokeWidth={1}
            strokeLinejoin="round"
            d={`M${river.path.join(' ')}`}
          />
        ))}
        {cities.map((city) => (
          <City key={city.id} city={city} />
        ))}
        {points.length > 0 && mouseXY && (
          <DrawPath points={points} mouseXY={mouseXY} />
        )}
      </svg>
    </div>
  )
}
