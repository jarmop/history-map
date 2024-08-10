import { Fragment } from 'react'
import { LatLon } from '../data/data'
import { LatLonTupleToXYTuple } from './useLatLonToXy'

interface ParallelsProps {
  parallels: LatLon[][]
  latLonTupleToXYTuple: LatLonTupleToXYTuple
}

export function Parallels({ parallels, latLonTupleToXYTuple }: ParallelsProps) {
  return parallels.map((parallel, i) => {
    const startLatLon = parallel[0]
    const startLat = startLatLon[0]
    const [x, y] = latLonTupleToXYTuple(startLatLon)
    return (
      <Fragment key={i}>
        <text x={x - 20} y={y + 4} style={{ fontSize: '12px' }}>
          {startLat}
        </text>
        <path
          fill="none"
          stroke="black"
          strokeWidth={1}
          strokeLinejoin="round"
          d={`M${parallel
            .map((latLon) => latLonTupleToXYTuple(latLon))
            .join(' ')}`}
        />
      </Fragment>
    )
  })
}

interface MeridianProps {
  meridians: LatLon[][]
  latLonTupleToXYTuple: LatLonTupleToXYTuple
}

export function Meridians({ meridians, latLonTupleToXYTuple }: MeridianProps) {
  return meridians.map((meridian, i) => {
    const startLatLon = meridian[0]
    const startLon = startLatLon[1]
    const [x, y] = latLonTupleToXYTuple(startLatLon)
    return (
      <Fragment key={i}>
        <text x={x - 3} y={y + 10} style={{ fontSize: '12px' }}>
          {startLon}
        </text>
        <path
          fill="none"
          stroke="black"
          strokeWidth={1}
          strokeLinejoin="round"
          d={`M${meridian
            .map((latLon) => latLonTupleToXYTuple(latLon))
            .join(' ')}`}
        />
      </Fragment>
    )
  })
}
