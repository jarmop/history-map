import { useState, useEffect } from 'react'
import { useXy } from '../data/usePersistedState'

export function useMouse(dom: HTMLDivElement | null) {
  const [xy, setXy] = useXy()
  const [isMousedown, setMousedown] = useState(false)

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
    function mouseleave() {
      setMousedown(false)
    }

    if (!dom) {
      return
    }
    dom.addEventListener('mousedown', mousedown)
    dom.addEventListener('mousemove', mousemove)
    dom.addEventListener('mouseup', mouseup)
    dom.addEventListener('mouseleave', mouseleave)

    return () => {
      dom.removeEventListener('mousedown', mousedown)
      dom.removeEventListener('mousemove', mousemove)
      dom.removeEventListener('mouseup', mouseup)
      dom.removeEventListener('mouseleave', mouseleave)
    }
  }, [isMousedown, setXy, xy, dom])

  return {
    xy,
    setXy,
  }
}
