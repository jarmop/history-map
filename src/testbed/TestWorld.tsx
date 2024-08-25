import { useState } from 'react'
import { TestMap } from './TestMap'
import { YearInput } from '../world/YearInput'
import { useData } from './useData'

export function TestWorld() {
  const years = [0]
  const [year, setYear] = useState(years[0])

  const { mapRegions, onPathCompleted } = useData(year)

  return (
    <>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <TestMap regions={mapRegions} onPathCompleted={onPathCompleted} />
      <YearInput year={year} years={years} onChange={(year) => setYear(year)} />
    </>
  )
}
