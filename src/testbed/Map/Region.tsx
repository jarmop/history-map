import { useState } from 'react'

interface BorderProps {
  border: [number, number][]
  onClick: (multiSelect: boolean) => void
  fill?: string
  active?: boolean
  selectPoint: (point: [number, number], i: number, initMove: boolean) => void
  addPoint: (i: number) => void
}

export function Region({
  border,
  onClick,
  fill = 'lightgrey',
  active = false,
  selectPoint,
  addPoint,
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
          setDownXy([e.pageX, e.pageY])
        }}
        onMouseUp={(e) => {
          if (e.pageX === downXy[0] && e.pageY === downXy[1]) {
            onClick(e.metaKey)
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
            r="4"
            fill={i === activePoint ? 'green' : 'black'}
            // fill={'black'}
            onMouseEnter={() => {
              setActivePoint(i)
            }}
            onMouseLeave={() => setActivePoint(-1)}
            onMouseUp={(e) => {
              e.stopPropagation()
              if (e.metaKey) {
                addPoint(i)
              } else {
                selectPoint(point, i, e.detail === 2)
              }
            }}
          />
        ))}
    </>
  )
}
