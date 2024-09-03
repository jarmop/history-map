import { useCallback } from 'react'
import { TestMap } from '../Map/TestMap'
import { YearInput } from '../../world/YearInput'
import { useData } from '../useData'
import { useConfig, useYear, useZoom } from '../data/usePersistedState'
import { Tools } from './Tools'
import { NewCity } from './NewCity'

export function TestWorld() {
  const years = [-4000]
  const [year, setYear] = useYear()
  const [zoom, setZoom] = useZoom()
  const [config, setConfig] = useConfig()

  const { mapRegions, onPathCompleted, onPointEdited, rivers, cities, addCity } =
    useData(year, zoom)

  useCallback

  return (
    <>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <TestMap
        regions={mapRegions}
        rivers={rivers}
        cities={config.showCities ? cities : []}
        onPathCompleted={onPathCompleted}
        onPointEdited={onPointEdited}
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
      <Tools />
      <br />
      <br />
      <div>
        <input
          type="checkbox"
          id="showCities"
          name="showCities"
          checked={config.showCities}
          onChange={(e) =>
            setConfig({ ...config, showCities: e.target.checked })
          }
        />
        <label htmlFor="showCities">Show cities</label>
      </div>
      <NewCity onSave={addCity} />
    </>
  )
}
