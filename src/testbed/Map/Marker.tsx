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
  hospital: <circle cx={cx} cy={cy} r={r} fill="white" stroke="red" />,
  building: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  literature: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  invention: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  event: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  music: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  person: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
  institution: <circle cx={cx} cy={cy} r={r} fill="gray" stroke="black" />,
}

export function Marker({ marker }: MarkerProps) {
  const [hover, setHover] = useState(false)

  const markerIcon = styleByType[marker.type]

  return (
    <>
      <svg
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // onClick={() => setHover(!hover)}
        x={marker.xy[0] - cx}
        y={marker.xy[1] - cy}
        width={size}
        height={size}
      >
        {markerIcon}
      </svg>
      {hover && (
        <svg
          x={marker.xy[0] + 20}
          y={marker.xy[1] - 200}
          width="400"
          height="200"
        >
          <image href={marker.image} height="180" />
          <text x="0" y="194">
            {marker.name}, {marker.start}
          </text>
        </svg>
      )}
    </>
  )
}
