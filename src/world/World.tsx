import { useEffect, useState } from 'react'
import { CustomMap } from '../customMap/CustomMap'
import { LatLonName, latLonByName } from '../customMap/latLonByName'
import * as storage from '../storage'
import { romanRepublic } from './romanRepublic'
import { romanEmpire } from './romanEmpire'
import { westernRomanEmpire } from './westernRomanEmpire'
import { byzantineEmpire } from './byzantineEmpire'

const world: Record<
  number,
  { borders: LatLonName[][]; cities: LatLonName[] }[]
> = {}
const states = [romanRepublic, romanEmpire, byzantineEmpire, westernRomanEmpire]

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

const years = Object.keys(world)
  .map((year) => parseInt(year))
  .sort((a, b) => a - b)

export function World() {
  const [yearIndex, setYearIndex] = useState(storage.getYearIndex())

  useEffect(() => storage.setYearIndex(yearIndex), [yearIndex])

  const year = years[yearIndex]

  const states = world[year].map((state) => ({
    borders: state.borders.map((border) =>
      border.map((name) => latLonByName[name])
    ),
    cities: state.cities.map((name) => latLonByName[name]),
  }))

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap states={states} />
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
