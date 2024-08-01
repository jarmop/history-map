import { useEffect, useState } from 'react'
import { CustomMap } from '../customMap/CustomMap'
import { latLonByName as modernCities } from '../customMap/latLonByName'
import * as storage from '../storage'
import { romanRepublic } from './romanRepublic'

const latLonByName = {
  ...modernCities,
  // Luceria: [],
}

export function Rome() {
  const [yearIndex, setYearIndex] = useState(storage.getYearIndex())
  const years = Object.keys(romanRepublic).map((year) => parseInt(year))
  const year = years[yearIndex]

  const romeCities = romanRepublic[year].cities.map(
    (name) => latLonByName[name]
  )
  const romeBorders = romanRepublic[year].borders?.map((border) =>
    border.map((name) => latLonByName[name])
  )

  useEffect(() => storage.setYearIndex(yearIndex), [yearIndex])

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap cities={romeCities} borders={romeBorders} />
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
