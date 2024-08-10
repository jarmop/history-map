import { useEffect, useRef, useState } from 'react'
import { rivers } from '../data/coordinates/natural/rivers/rivers'
import { seas } from '../data/coordinates/natural/seas'
import { toFixedNumber } from '../helpers'
import { Path } from '../data/data'
import {
  meridians,
  parallels,
} from '../data/coordinates/natural/parallelsAndMeridiansData'
import { Meridians, Parallels } from './ParallelsAndMeridians'
import { Config } from '../types'
import { Border } from './Border'
import { River } from './River'
import { Sea } from './Sea'
import { DrawPath } from './DrawPath'
import { useMouse } from './useMouse'

export type NewRegion = {
  index: number
}

// const aspectRatio = 16 / 9
const aspectRatio = 1

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
  islands: Path[]
  stateBorders: Path[][]
  config: Config
}

export function CustomMap({ islands, stateBorders, config }: CustomMapProps) {
  const [activeBorder, setActiveBorder] = useState('')
  const [points, setPoints] = useState<number[][]>([])
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

  function toggleActiveBorder(id: string) {
    points.length < 1 &&
      setActiveBorder((activeBorder) => (activeBorder === id ? '' : id))
  }

  function selectPoint(point: number[]) {
    setPoints((points) => [...points, point])
  }

  function selectBorderPoint(point: number[]) {
    setPoints((points) => [...points, point])
  }

  const [mouseXY, setMouseXy] = useState<number[]>()

  useEffect(() => {
    function keyup(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPoints([])
        setMouseXy(undefined)
      }
    }
    document.addEventListener('keyup', keyup)
    return () => {
      document.removeEventListener('keyup', keyup)
    }
  }, [])

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
        {islands.map((border: number[][], i) => (
          <Border
            key={i}
            border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
            onClick={() => toggleActiveBorder('continent' + i)}
            active={activeBorder === 'continent' + i}
            selectPoint={(point: number[]) => {
              if (points.length > 0) {
                const startPoint = points[0]
                const endPoint = point
                const startIndex = border.findIndex((borderPoint) => {
                  const xyTuple = latLonTupleToXYTuple(borderPoint)
                  return (
                    startPoint[0] === xyTuple[0] && startPoint[1] === xyTuple[1]
                  )
                })

                const endIndex = border.findIndex((borderPoint) => {
                  const xyTuple = latLonTupleToXYTuple(borderPoint)
                  return (
                    endPoint[0] === xyTuple[0] && endPoint[1] === xyTuple[1]
                  )
                })

                // const divider = [
                //   border[startIndex],
                //   ...points
                //     .slice(1)
                //     .map((p) =>
                //       xYTupleToLatLonTuple(p).map((value) =>
                //         toFixedNumber(value, 5)
                //       )
                //     ),
                //   border[endIndex],
                // ]

                const divider = points
                  .slice(1)
                  .map((p) =>
                    xYTupleToLatLonTuple(p).map((value) =>
                      toFixedNumber(value, 5)
                    )
                  )

                // if (startIndex > endIndex) {
                //   divider.reverse()

                // }

                // const newBorder = {
                //   id: 'africa' + Date.now()
                //   points:
                // }

                const firstRegion = [
                  divider,
                  {
                    share: 'africa',
                    start: endIndex,
                    end: startIndex,
                  },
                ]
                // console.log(
                //   `[${divider
                //     .map((tuple) => `'${tuple.join(', ')}'`)
                //     .join(',')}]`
                // )
                // // Object.keys(africa)
                // console.log(
                //   `sliceBorder(africa, ${africa[endIndex]}, ${africa[startIndex]})`
                // )

                const secondRegion = [
                  divider,

                  {
                    share: 'africa',
                    start: startIndex,
                    end: endIndex,
                  },
                ]

                // console.log(firstRegion)
                // // console.log(secondRegion)

                console.log(JSON.stringify(firstRegion))
                console.log(JSON.stringify(secondRegion))
                // console.log(secondRegion)

                //   startIndex: endIndex,
                //   endIndex: startIndex,
                //   divider,
                //   container: activeBorder,
                // }

                // const smallerIndex = Math.min(startIndex, endIndex)
                // const largerIndex = Math.max(startIndex, endIndex)
                // const firstRegion = [
                //   border.slice(0, smallerIndex),
                //   startIndex === smallerIndex
                //     ? divider
                //     : [...divider].reverse(),
                //   border.slice(largerIndex + 1),
                // ].flat()
                // const secondRegion = [
                //   border.slice(smallerIndex + 1, largerIndex),
                //   startIndex === largerIndex ? divider : [...divider].reverse(),
                // ].flat()

                // setNewRegions([firstRegion, secondRegion])
                setPoints([])
              } else {
                selectBorderPoint(point)
              }
            }}
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
              selectPoint={selectBorderPoint}
            />
          ))
        )}
        {/* {states.flatMap((state, i) => [
          ...state.borders.map((border, j) => (
            <Border
              key={`border${i}-${j}`}
              border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
              fill={stateColors[i]}
              onClick={() => toggleActiveBorder(`state${i}`)}
              active={activeBorder === `state${i}`}
              selectPoint={selectBorderPoint}
            />
          )),
          ...state.cities.map((city, j) => (
            <City
              key={`city${i}-${j}`}
              city={latLonTupleToXYTuple(city)}
              border={stateColors[i]}
            />
          )),
        ])} */}
        {rivers.map((river, i) => (
          <River
            key={i}
            river={river.map((latlon) => latLonTupleToXYTuple(latlon))}
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
        <Parallels
          parallels={parallels}
          latLonTupleToXYTuple={latLonTupleToXYTuple}
        />
        <Meridians
          meridians={meridians}
          latLonTupleToXYTuple={latLonTupleToXYTuple}
        />
      </svg>
    </div>
  )
}
