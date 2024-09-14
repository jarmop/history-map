import { useState } from 'react'
import { Marker as MarkerType } from '../newTypes'

interface MarkerProps {
  marker: MarkerType
}

const r = 3
const size = 8
const cx = size / 2
const cy = size / 2

const styleByType: Record<MarkerType['type'], React.ReactNode> = {
  monastery: <circle cx={cx} cy={cy} r={r} fill="yellow" stroke="black" />,
  church: <circle cx={cx} cy={cy} r={r} fill="pink" stroke="black" />,
  university: <circle cx={cx} cy={cy} r={r} fill="lightblue" stroke="black" />,
  fortress: <circle cx={cx} cy={cy} r={r} fill="red" stroke="black" />,
  town: <circle cx={cx} cy={cy} r={1} fill="black" stroke="black" />,
  artefact: <circle cx={cx} cy={cy} r={0} fill="none" stroke="none" />,
}

export function Marker({ marker: place }: MarkerProps) {
  const [hover, setHover] = useState(false)

  const marker = styleByType[place.type]

  return (
    <>
      <svg
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // onClick={() => setHover(!hover)}
        x={place.xy[0] - cx}
        y={place.xy[1] - cy}
        width={size}
        height={size}
      >
        {marker}
      </svg>
      {hover && (
        <svg
          x={place.xy[0] + 20}
          y={place.xy[1] - 200}
          width="400"
          height="200"
        >
          <image href={place.image} height="180" />
          <text x="0" y="194">
            {place.id}, {place.start}
          </text>
        </svg>
      )}
    </>
  )
}
