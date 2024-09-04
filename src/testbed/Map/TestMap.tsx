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
  activeRegions: MapRegion['id'][]
  setActiveRegions: (regions: MapRegion['id'][]) => void
  onPathCompleted: (
    region: MapRegion,
    points: [number, number][],
    start: number,
    end: number
  ) => void
  onPointEdited: (
    regionId: MapRegion['id'],
    index: number,
    newPoint: [number, number]
  ) => void
}

export function TestMap({
  regions,
  rivers,
  cities,
  zoom,
  activeRegions,
  setActiveRegions,
  onPathCompleted,
  onPointEdited,
}: CustomMapProps) {
  const [newPath, setNewPath] = useState<{
    start?: { regionId: MapRegion['id']; i: number }
    points: [number, number][]
  }>()
  const [activeBorderPoint, setActiveBorderPoint] = useState<{
    regionId: MapRegion['id']
    i: number
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

  function selectRegion(id: number) {
    points.length < 1 && setActiveRegions([id])
  }

  function multiSelectRegion(regionId: number) {
    if (activeRegions.includes(regionId)) {
      setActiveRegions(
        activeRegions.filter((activeId) => activeId !== regionId)
      )
    } else {
      setActiveRegions([...activeRegions, regionId])
    }
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
        setActiveBorderPoint(undefined)
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
          if (points.length < 1 && !activeBorderPoint) return
          const x = e.pageX + xy[0]
          const y = e.pageY + xy[1]
          setMouseXy([x, y])
        }}
        onMouseDown={(e) => {
          setDownXy([e.pageX, e.pageY])
        }}
        onMouseUp={(e) => {
          if (
            points.length > 0 &&
            e.pageX === downXy[0] &&
            e.pageY === downXy[1]
          ) {
            selectPoint([e.pageX + xy[0], e.pageY + xy[1]])
          }
          setDownXy([0, 0])
        }}
      >
        {regions
          .sort((r1, r2) =>
            activeRegions.includes(r1.id)
              ? 1
              : activeRegions.includes(r2.id)
              ? -1
              : 0
          )
          .map((region, i) => (
            <Region
              key={i}
              border={region.path}
              onClick={(multiSelect) =>
                multiSelect
                  ? multiSelectRegion(region.id)
                  : selectRegion(region.id)
              }
              // fill={regionColors[i]}
              fill={'lightgrey'}
              active={activeRegions.includes(region.id)}
              // active={activeBorder !== undefined}
              selectPoint={(
                point: [number, number],
                i: number,
                initMove: boolean
              ) => {
                if (initMove) {
                  setActiveBorderPoint({ regionId: region.id, i })
                  setNewPath(undefined)
                } else {
                  selectBorderPoint(region, point, i)
                }
              }}
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
        {activeBorderPoint && mouseXY && (
          <circle
            cx={mouseXY[0]}
            cy={mouseXY[1]}
            r="6"
            fill="red"
            onClick={(e) => {
              // const region =
              e.stopPropagation()
              onPointEdited(
                activeBorderPoint.regionId,
                activeBorderPoint.i,
                mouseXY
              )
              setActiveBorderPoint(undefined)
            }}
          />
        )}
      </svg>
    </div>
  )
}
