import { useState } from 'react'

interface RiverProps {
  river: [number, number][]
  active: boolean
  selectPoint: (point: [number, number], i: number) => void
}

export function River({ river, active, selectPoint }: RiverProps) {
  const [activePoint, setActivePoint] = useState(-1)

  return (
    <>
      <path
        fill="none"
        stroke="lightcyan"
        strokeWidth={2}
        strokeLinejoin="round"
        d={`M${river.join(' ')}`}
      />
      {active &&
        river.map(
          (point, i) =>
            i !== river.length - 1 && (
              <circle
                key={i}
                cx={point[0]}
                cy={point[1]}
                r="6"
                fill={i === activePoint ? 'red' : 'transparent'}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(-1)}
                onMouseUp={(e) => {
                  e.stopPropagation()
                  selectPoint(point, i)
                }}
              />
            )
        )}
    </>
  )
}
