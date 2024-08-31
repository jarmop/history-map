import { useCallback } from 'react'
import { TestMap } from './TestMap'
import { YearInput } from '../world/YearInput'
import { useData } from './useData'
import { useYear, useZoom } from './data/usePersistedState'

export function TestWorld() {
  const years = [-4000]
  const [year, setYear] = useYear()
  const [zoom, setZoom] = useZoom()

  const { mapRegions, onPathCompleted } = useData(year, zoom)

  useCallback

  return (
    <>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <TestMap
        regions={mapRegions}
        onPathCompleted={onPathCompleted}
        zoom={zoom}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <YearInput
          year={year}
          years={years}
          onChange={(year) => setYear(year)}
        />
        <div>
          <button onClick={() => setZoom((zoom) => zoom + 1)}>+</button>
          <button onClick={() => zoom > 1 && setZoom((zoom) => zoom - 1)}>
            -
          </button>
        </div>
      </div>
    </>
  )
}
