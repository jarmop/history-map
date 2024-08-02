import { africaBorder, asiaBorder, europeBorder } from './continents'
import { islandsBorders } from './islands'
import { useEffect, useRef, useState } from 'react'
import { useLatLonToXy } from './useLatLonToXy'
import * as storage from '../storage'

interface CityProps {
  city: number[]
  border: string
}

function City({ city, border }: CityProps) {
  const [x, y] = city
  return <circle cx={x} cy={y} r="3" stroke={border} strokeWidth={3} />
  // return (
  //   <circle cx={x} cy={y} r="2" fill="white" stroke="black" strokeWidth={2} />
  // )
}
interface BorderProps {
  border: number[][]
  fill?: string
}

function Border({ border, fill = 'lightgrey' }: BorderProps) {
  return (
    <path
      fill={fill}
      // stroke="black"
      // strokeWidth={1}
      // strokeLinejoin="round"
      d={`M${border.join(' ')} z`}
      // d={`M${border[0].join(" ")} ${border.slice(1).flat().join(" ")} z`}
    />
  )
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
}

export function CustomMap({ states }: CustomMapProps) {
  const [zoom, setZoom] = useState(storage.getZoom())
  const [xy, setXy] = useState(storage.getXy())

  const [containerSize, setContainersize] = useState([1, 1])
  const {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  } = useLatLonToXy(zoom, containerSize)
  const [isMousedown, setMousedown] = useState(false)
  const [mouseOnZoom, setMouseOnZoom] = useState<
    | {
        clientXY: number[]
        latLon: number[]
      }
    | undefined
  >(undefined)

  const domRef = useRef<HTMLDivElement>(null)

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

  const width = containerSize[0]
  const height = containerSize[1]
  const maxX = width < totalWidth ? totalWidth - width : 0
  const maxY = height < totalHeight ? totalHeight - height : 0

  useEffect(() => {
    const width = domRef.current?.offsetWidth || 1
    setContainersize([width, width / aspectRatio])
  }, [])

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

  return (
    <div ref={domRef}>
      <svg
        viewBox={`${xy[0]} ${xy[1]} ${width} ${height}`}
        style={{ background: 'lightcyan' }}
      >
        {[europeBorder, africaBorder, asiaBorder, ...islandsBorders].map(
          (border: number[][], i) => (
            <Border
              key={i}
              border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
            />
          )
        )}
        {states.flatMap((state, i) => [
          ...state.borders.map((border, j) => (
            <Border
              key={`border${i}-${j}`}
              border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
              fill={stateColors[i]}
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
        {/* {borders.map((border, i) => (
          <Border
            key={i}
            border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
            fill="red"
          />
        ))}
        {cities.map((city, i) => (
          <City key={i} city={latLonTupleToXYTuple(city)} />
        ))} */}
      </svg>
    </div>
  )
}
