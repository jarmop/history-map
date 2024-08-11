import { useState } from 'react'

interface BorderProps {
  border: [number, number][]
  onClick: () => void
  fill?: string
  active?: boolean
  selectPoint: (point: [number, number], i: number) => void
}

export function Border({
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
            r="6"
            fill={i === activePoint ? 'black' : 'transparent'}
            onMouseEnter={() => {
              setActivePoint(i)
            }}
            onMouseLeave={() => setActivePoint(-1)}
            onMouseUp={(e) => {
              e.stopPropagation()
              selectPoint(point, i)
              // console.log('point index:', i, point)
            }}
          />
        ))}
    </>
  )
}
