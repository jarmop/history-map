import { africaBorder, asiaBorder, europeBorder } from './continents'
import { islandsBorders } from './islands'
import { useEffect, useRef, useState } from 'react'
import { useLatLonToXy } from './useLatLonToXy'
import * as storage from '../storage'
import { rivers } from '../world/rivers'
import { seas } from '../world/seas'

interface CityProps {
  city: number[]
  border: string
}

function City({ city, border }: CityProps) {
  const [x, y] = city
  return <circle cx={x} cy={y} r="2" />
  // return <circle cx={x} cy={y} r="3" stroke={border} strokeWidth={3} />
  // return (
  //   <circle cx={x} cy={y} r="2" fill="white" stroke="black" strokeWidth={2} />
  // )
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
        // strokeLinejoin="round"
        d={`M${border.join(' ')} z`}
        // d={`M${border[0].join(" ")} ${border.slice(1).flat().join(" ")} z`}
        // onClick={() => setActive((active) => !active)}
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
            onClick={(e) => {
              e.stopPropagation()
              // selectPoint([e.clientX, e.clientY])
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
      // d={`M${border[0].join(" ")} ${border.slice(1).flat().join(" ")} z`}
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

interface CustomMapProps {
  states: { borders: number[][][]; cities: number[][] }[]
  editMode: boolean
}

interface FooProps {
  points: number[][]
  mouseXY: number[]
}

function Foo({ points, mouseXY }: FooProps) {
  const dPoints = [...points, mouseXY]
  return (
    <path
      fill="none"
      stroke="black"
      // strokeWidth={2}
      // strokeLinejoin="round"
      d={`M${dPoints.join(' ')}`}
    />
  )
}

export function CustomMap({ states, editMode }: CustomMapProps) {
  const [zoom, setZoom] = useState(storage.getZoom())
  const [xy, setXy] = useState(storage.getXy())
  const [activePoint, setActivePoint] = useState(-1)
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

  const continents = [europeBorder, africaBorder, asiaBorder, ...islandsBorders]

  // const contactPoints = [continents.flat(), ...states.flatMap(state => state.borders)].flat()
  const contactPoints = editMode
    ? [
        ...continents,
        ...states.flatMap((state) => state.borders),
        ...seas,
        ...rivers,
      ]
        .flat()
        .map(latLonTupleToXYTuple)
    : []
  // const contactPoints = [...states.flatMap(state => state.borders)]

  function toggleActiveBorder(id: string) {
    points.length < 1 &&
      setActiveBorder((activeBorder) => (activeBorder === id ? '' : id))
  }

  function selectPoint(point: number[]) {
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
        // onClick={(e) => {
        //   selectPoint([e.clientX, e.clientY])
        //   // const x = e.clientX + xy[0]
        //   // const y = e.clientY + xy[1]
        //   // const latLon = xYTupleToLatLonTuple([x, y])
        //   // const latLonString = latLon.map((val) => val.toFixed(2)).join(', ')
        //   // navigator.clipboard.writeText(latLonString)
        // }}
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
        {continents.map((border: number[][], i) => (
          <Border
            key={i}
            border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
            onClick={() => toggleActiveBorder('continent' + i)}
            active={activeBorder === 'continent' + i}
            selectPoint={selectPoint}
          />
        ))}
        {states.flatMap((state, i) => [
          ...state.borders.map((border, j) => (
            <Border
              key={`border${i}-${j}`}
              border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
              fill={stateColors[i]}
              onClick={() => toggleActiveBorder(`state${i}`)}
              active={activeBorder === `state${i}`}
              selectPoint={selectPoint}
            />
          )),
          ...state.cities.map((city, j) => (
            <City
              key={`city${i}-${j}`}
              city={latLonTupleToXYTuple(city)}
              border={stateColors[i]}
            />
          )),
        ])}
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
        {contactPoints.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={point[1]}
            r="5"
            // fill="none"
            // fill="black"
            fill={i === activePoint ? 'black' : 'transparent'}
            onMouseEnter={() => setActivePoint(i)}
            onMouseLeave={() => setActivePoint(-1)}
            onClick={(e) => {
              e.stopPropagation()
              const x = e.clientX + xy[0]
              const y = e.clientY + xy[1]
              setPoints((points) => [...points, [x, y]])
            }}
          />
        ))}
        {points.length > 0 && mouseXY && (
          <Foo points={points} mouseXY={mouseXY} />
        )}
      </svg>
    </div>
  )
}
