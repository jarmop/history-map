import { useEffect, useRef, useState } from 'react'
import { useLatLonToXy } from './useLatLonToXy'
import * as storage from '../storage'
import { rivers } from '../world/rivers'
import { seas } from '../world/seas'
import { toFixedNumber } from './helpers'
import { Path } from '../world/data'

export type NewRegion = {
  index: number
}

interface CityProps {
  city: number[]
  border: string
}

function City({ city }: CityProps) {
  const [x, y] = city
  return <circle cx={x} cy={y} r="2" />
}
interface BorderProps {
  border: number[][]
  onClick: () => void
  fill?: string
  active?: boolean
  selectPoint: (point: number[]) => void
}

function Border({
  border,
  onClick,
  fill = 'lightgrey',
  active = false,
  selectPoint,
}: BorderProps) {
  const [downXy, setDownXy] = useState([0, 0])
  const [activePoint, setActivePoint] = useState(-1)

  return (
    <>
      <path
        fill={fill}
        stroke={active ? 'black' : 'none'}
        strokeWidth={2}
        d={`M${border.join(' ')} z`}
        onMouseDown={(e) => {
          setDownXy([e.clientX, e.clientY])
        }}
        onMouseUp={(e) => {
          if (e.clientX === downXy[0] && e.clientY === downXy[1]) {
            onClick()
          }
          setDownXy([0, 0])
        }}
      />
      {active &&
        border.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={point[1]}
            r="5"
            fill={i === activePoint ? 'black' : 'transparent'}
            onMouseEnter={() => setActivePoint(i)}
            onMouseLeave={() => setActivePoint(-1)}
            onMouseUp={(e) => {
              e.stopPropagation()
              selectPoint(point)
            }}
          />
        ))}
    </>
  )
}

interface RiverProps {
  river: number[][]
}

function River({ river }: RiverProps) {
  return (
    <path
      fill="none"
      stroke="lightcyan"
      strokeWidth={2}
      strokeLinejoin="round"
      d={`M${river.join(' ')}`}
    />
  )
}

interface SeaProps {
  border: number[][]
  fill?: string
}

function Sea({ border }: SeaProps) {
  return <path fill="lightcyan" d={`M${border.join(' ')} z`} />
}

const aspectRatio = 16 / 9
const maxZoom = 350
const stateColors = [
  'red',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'orange',
]

interface FooProps {
  points: number[][]
  mouseXY: number[]
}

function Foo({ points, mouseXY }: FooProps) {
  const dPoints = [...points, mouseXY]
  return <path fill="none" stroke="black" d={`M${dPoints.join(' ')}`} />
}

interface CustomMapProps {
  states: { borders: number[][][]; cities: number[][] }[]
  islands: Path[]
  stateBorders: Path[][]
}

export function CustomMap({ states, islands, stateBorders }: CustomMapProps) {
  const [zoom, setZoom] = useState(storage.getZoom())
  const [xy, setXy] = useState(storage.getXy())
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

  const {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  } = useLatLonToXy(zoom, width)
  const [isMousedown, setMousedown] = useState(false)
  const [mouseOnZoom, setMouseOnZoom] = useState<
    | {
        clientXY: number[]
        latLon: number[]
      }
    | undefined
  >(undefined)

  useEffect(() => {
    storage.setData({ zoom, xy: xy })
  }, [zoom, xy])

  useEffect(() => {
    if (!mouseOnZoom) {
      return
    }
    const mouseXYAfterZoom = latLonTupleToXYTuple(mouseOnZoom.latLon)

    const newX = mouseXYAfterZoom[0] - mouseOnZoom.clientXY[0]
    const newY = mouseXYAfterZoom[1] - mouseOnZoom.clientXY[1]

    setMouseOnZoom(undefined)
    setXy([newX, newY])
  }, [latLonTupleToXYTuple, xYTupleToLatLonTuple, setXy, mouseOnZoom])

  const maxX = width < totalWidth ? totalWidth - width : 0
  const maxY = height < totalHeight ? totalHeight - height : 0

  useEffect(() => {
    function mousedown() {
      setMousedown(true)
    }
    function mousemove(e: MouseEvent) {
      if (isMousedown) {
        const [dx, dy] = [e.movementX, e.movementY]
        setXy((xy) => {
          const newX = xy[0] - dx
          const newY = xy[1] - dy
          return [newX, newY]
        })
      }
    }
    function mouseup() {
      setMousedown(false)
    }
    let foo = 0
    function wheel(e: WheelEvent) {
      e.preventDefault()
      const zoomD = -e.deltaY
      foo += Math.abs(e.deltaY)
      if (foo > 5) {
        foo = 0
        setMouseOnZoom({
          clientXY: [e.clientX, e.clientY],
          latLon: xYTupleToLatLonTuple([xy[0] + e.clientX, xy[1] + e.clientY]),
        })
        setZoom((zoom) => {
          const newZoom = zoom + zoomD
          return newZoom > 0 && newZoom <= maxZoom ? newZoom : zoom
        })
      }
    }

    const dom = domRef.current
    if (!dom) {
      return
    }
    dom.addEventListener('mousedown', mousedown)
    dom.addEventListener('mousemove', mousemove)
    dom.addEventListener('mouseup', mouseup)
    dom.addEventListener('wheel', wheel)

    return () => {
      dom.removeEventListener('mousedown', mousedown)
      dom.removeEventListener('mousemove', mousemove)
      dom.removeEventListener('mouseup', mouseup)
      dom.removeEventListener('wheel', wheel)
    }
  }, [
    isMousedown,
    setXy,
    maxX,
    maxY,
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    xy,
  ])

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
          <Foo points={points} mouseXY={mouseXY} />
        )}
      </svg>
    </div>
  )
}
