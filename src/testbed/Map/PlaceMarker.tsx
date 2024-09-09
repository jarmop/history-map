import { useState } from 'react'
import { Place } from '../newTypes'

interface PlaceProps {
  place: Place
}

const r = 3

const styleByType: Record<Place['type'], React.ReactNode> = {
  monastery: <circle cx={4} cy={4} r={r} fill="yellow" stroke="black" />,
  church: <circle cx={4} cy={4} r={r} fill="pink" stroke="black" />,
  university: <circle cx={4} cy={4} r={r} fill="lightblue" stroke="black" />,
  fortress: <circle cx={4} cy={4} r={r} fill="red" stroke="black" />,
  town: <circle cx={4} cy={4} r={r} fill="black" stroke="black" />,
}

export function PlaceMarker({ place }: PlaceProps) {
  const [hover, setHover] = useState(false)

  const marker = styleByType[place.type]

  return (
    <>
      <svg
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // onClick={() => setHover(!hover)}
        x={place.xy[0]}
        y={place.xy[1]}
        width={8}
        height={8}
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
