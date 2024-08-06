import { useEffect, useState } from 'react'
import { CustomMap, NewRegion } from '../customMap/CustomMap'
import { latLonByName } from '../customMap/latLonByName'
import * as storage from '../storage'
import { romanRepublic } from './romanRepublic'
import { romanEmpire } from './romanEmpire'
import { westernRomanEmpire } from './westernRomanEmpire'
import { byzantineEmpire } from './byzantineEmpire'
import { franks } from './franks'
import { w843 } from './843'
import { State } from './types'
import { w888 } from './888'
import { w1075 } from './1075'
import { w720 } from './720'
import { getLatLonByName } from '../customMap/helpers'
import { useData } from './useData'

const world: Record<number, State[]> = {}
const states = [
  romanRepublic,
  romanEmpire,
  byzantineEmpire,
  westernRomanEmpire,
  franks,
]

states.forEach((state) => {
  Object.keys(state)
    .map((year) => parseInt(year))
    .forEach((year) => {
      if (!world[year]) {
        world[year] = []
      }
      world[year].push(state[year])
    })
})

world[720] = w720
world[843] = w843
world[888] = w888
world[1075] = w1075

const years = Object.keys(world)
  .map((year) => parseInt(year))
  .sort((a, b) => a - b)

export function World() {
  const [yearIndex, setYearIndex] = useState(storage.getYearIndex())

  useEffect(() => storage.setYearIndex(yearIndex), [yearIndex])

  const year = years[yearIndex]
  const states = world[year].map((state) => ({
    borders: state.borders.map((border) => border.map(getLatLonByName)),
    cities: state.cities.map((name) => latLonByName[name]),
  }))

  const data = useData()

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap states={states} islands={data.islands} />
      <button
        onClick={() => setYearIndex(yearIndex - 1)}
        disabled={yearIndex === 0}
      >
        {'<'}
      </button>
      <button
        onClick={() => setYearIndex(yearIndex + 1)}
        disabled={yearIndex === years.length - 1}
      >
        {'>'}
      </button>
    </div>
  )
}
