import { useEffect, useRef, useState } from 'react'
import { seas } from '../data/coordinates/natural/seas'
import { isBorderSlice, sliceBorder } from '../helpers'
import { BorderSlice, Path, Region } from '../data/data'
import {
  meridians,
  parallels,
} from '../data/coordinates/natural/parallelsAndMeridiansData'
import { Meridians, Parallels } from './ParallelsAndMeridians'
import { Config } from '../types'
import { Border } from './Border'
import { Border as BorderData } from '../data/data'
import { River } from './River'
import { Sea } from './Sea'
import { DrawPath } from './DrawPath'
import { useMouse } from './useMouse'
import { NewPath } from '../world/types'
import { useRegionBuilder } from './useRegionBuilder'

export type NewRegion = {
  index: number
}

// const aspectRatio = 16 / 9
const aspectRatio = 4 / 3
// const aspectRatio = 1

const stateColors = [
  'red',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'orange',
]

interface CustomMapProps {
  islands: BorderData[]
  rivers: BorderData[]
  stateBorders: Path[][]
  config: Config
  onRegionCompleted: (newRegion: Region) => void
  borderById: Record<string, BorderData>
}

export function CustomMap({
  islands,
  stateBorders,
  config,
  rivers,
  onRegionCompleted,
  borderById,
}: CustomMapProps) {
  const [activeBorder, setActiveBorder] = useState('')

  const [width, setWidth] = useState(1)

  const domRef = useRef<HTMLDivElement>(null)

  const height = width / aspectRatio

  useEffect(() => {
    window.addEventListener('load', () => {
      setWidth(domRef.current?.offsetWidth || 1)
    })
  }, [])

  const { xy, latLonTupleToXYTuple, xYTupleToLatLonTuple } = useMouse(
    width,
    config.zoomEnabled,
    domRef.current
  )

  const { selectBorderPoint, selectPoint, newPaths, resetNewPaths, points } =
    useRegionBuilder(onRegionCompleted, xYTupleToLatLonTuple, borderById)

  function toggleActiveBorder(id: string) {
    points.length < 1 &&
      setActiveBorder((activeBorder) => (activeBorder === id ? '' : id))
  }

  const [mouseXY, setMouseXy] = useState<number[]>()

  useEffect(() => {
    function keyup(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMouseXy(undefined)
        resetNewPaths()
      }
    }
    document.addEventListener('keyup', keyup)
    return () => {
      document.removeEventListener('keyup', keyup)
    }
  }, [resetNewPaths])

  const [downXy, setDownXy] = useState([0, 0])

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
        {islands.map((border: BorderData, i) => (
          <Border
            key={i}
            border={border.path.map((latlon) => latLonTupleToXYTuple(latlon))}
            onClick={() => toggleActiveBorder('continent' + i)}
            active={activeBorder === 'continent' + i}
            selectPoint={(point: [number, number], i: number) =>
              selectBorderPoint(border, point, i)
            }
          />
        ))}
        {stateBorders.flatMap((borders, i) =>
          borders.map((border, j) => (
            <Border
              key={`border${i}-${j}`}
              border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
              fill={stateColors[i]}
              onClick={() => toggleActiveBorder(`state${i}`)}
              active={activeBorder === `state${i}`}
              selectPoint={(point: [number, number], i: number) => {
                //selectBorderPoint(border, point, i)
              }}
            />
          ))
        )}
        {rivers
          .filter((b) => b.id === 'torne')
          .map((river, i) => (
            <River
              key={i}
              river={river.path.map((latlon) => latLonTupleToXYTuple(latlon))}
              active={activeBorder !== ''}
              selectPoint={(point: [number, number], i: number) =>
                selectBorderPoint(river, point, i)
              }
            />
          ))}
        {seas.map((sea, i) => (
          <Sea
            key={i}
            border={sea.map((latLon) => latLonTupleToXYTuple(latLon))}
          />
        ))}
        {points.length > 0 && mouseXY && (
          <DrawPath points={points} mouseXY={mouseXY} />
        )}
        {config.showParallelsAndMeridians && (
          <>
            <Parallels
              parallels={parallels}
              latLonTupleToXYTuple={latLonTupleToXYTuple}
            />
            <Meridians
              meridians={meridians}
              latLonTupleToXYTuple={latLonTupleToXYTuple}
            />
          </>
        )}
        {newPaths.map((newPath: NewPath | BorderSlice, i) => {
          if (isBorderSlice(newPath)) {
            const slicedPoints = sliceBorder(
              borderById[newPath.borderId].path,
              newPath.start,
              newPath.end
            )
            return (
              <path
                key={i}
                fill="none"
                stroke="red"
                strokeWidth={2}
                strokeLinejoin="round"
                d={`M${slicedPoints.map(latLonTupleToXYTuple).join(' ')}`}
              />
            )
          } else {
            return (
              <path
                key={i}
                fill="none"
                stroke="red"
                strokeWidth={2}
                strokeLinejoin="round"
                d={`M${newPath.points.join(' ')}`}
              />
            )
          }
        })}
      </svg>
    </div>
  )
}
