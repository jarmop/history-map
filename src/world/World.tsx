import { useEffect, useState } from 'react'
import { CustomMap } from '../CustomMap/CustomMap'
import * as storage from '../storage'
import { useData, useYears } from '../data/useData'
import { DevTools } from './DevTools'
import { YearInput } from './YearInput'
import { NewPath } from './types'
import { Region, State } from '../data/data'

export function World() {
  const years = useYears()
  const [year, setYear] = useState(storage.getYear() || years[0])
  const [config, setConfig] = useState(storage.getConfig)
  const [selectedState, setSelectedState] = useState<State>()
  const [newRegion, setNewRegion] = useState<Region>()

  useEffect(() => storage.setYear(year), [year])

  const { islands, rivers, stateBorders, borderById, allStates, saveState } =
    useData(year)

  function addRegionToState(state: State, region: Region) {
    const wtf = state.regionsByYear[year] || []
    saveState({
      ...state,
      regionsByYear: {
        ...state.regionsByYear,
        [year]: [...wtf, region],
      },
    })
  }

  function handleRegionCompleted(region: Region) {
    if (selectedState) {
      addRegionToState(selectedState, region)
    } else {
      setNewRegion(region)
    }
  }

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap
        islands={islands}
        rivers={rivers}
        stateBorders={stateBorders}
        config={config}
        onRegionCompleted={handleRegionCompleted}
        borderById={borderById}
        // newState={ newState}
      />
      <YearInput year={year} years={years} onChange={(year) => setYear(year)} />

      <DevTools config={config} setConfig={setConfig} />
      {
        <div>
          <h4>Add region to State</h4>
          Name
          <select
            onChange={(e) => {
              const selectedName = e.target.value
              const state = allStates.find((s) => s.name === selectedName)
              if (!state) {
                return
              }
              newRegion
                ? addRegionToState(state, newRegion)
                : setSelectedState(state)
            }}
          >
            <option value=""></option>
            {allStates.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      }
    </div>
  )
}
