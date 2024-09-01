import { useState } from 'react'
import { City as CityObj } from '../newTypes'

interface CityProps {
  city: CityObj
}

export function City({ city }: CityProps) {
  const [showName, setShowName] = useState(false)

  return (
    <>
      <circle
        fill="black"
        r="3"
        cx={city.xy[0]}
        cy={city.xy[1]}
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
      />
      {showName && (
        <text x={city.xy[0] + 5} y={city.xy[1] - 5}>
          {city.id}
        </text>
      )}
    </>
  )
}
