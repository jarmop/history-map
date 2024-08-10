import { useState, useEffect } from 'react'
import { useLatLonToXy } from './useLatLonToXy'
import * as storage from '../storage'

const maxZoom = 10000

export function useMouse(
  width: number,
  zoomEnabled: boolean,
  dom: HTMLDivElement | null
) {
  const [zoom, setZoom] = useState(storage.getZoom())
  const [xy, setXy] = useState(storage.getXy())
  const [isMousedown, setMousedown] = useState(false)

  const [mouseOnZoom, setMouseOnZoom] = useState<
    | {
        clientXY: number[]
        latLon: number[]
      }
    | undefined
  >(undefined)

  const {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    // totalWidth,
    // totalHeight,
  } = useLatLonToXy(zoom, width)

  // const maxX = width < totalWidth ? totalWidth - width : 0
  // const maxY = height < totalHeight ? totalHeight - height : 0

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
  }, [latLonTupleToXYTuple, setXy, mouseOnZoom])

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
      if (!zoomEnabled) {
        return
      }
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
    // maxX,
    // maxY,
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    xy,
    dom,
    zoomEnabled,
  ])

  return {
    xy,
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
  }
}
