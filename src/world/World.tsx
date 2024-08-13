import { useEffect, useState } from 'react'
import { CustomMap } from '../CustomMap/CustomMap'
import * as storage from '../storage'
import { useData, useYears } from '../data/useData'
import { DevTools } from './DevTools'
import { YearInput } from './YearInput'
import { NewPath } from './types'
import { Border, BorderSlice, Region, State } from '../data/data'

export function World() {
  const years = useYears()
  const [year, setYear] = useState(storage.getYear() || years[0])
  const [config, setConfig] = useState(storage.getConfig)
  const [selectedState, setSelectedState] = useState<State>()
  const [newRegion, setNewRegion] = useState<Region>()
  const [newPaths, setNewPaths] = useState<(NewPath | BorderSlice)[]>([])

  useEffect(() => storage.setYear(year), [year])

  const { islands, rivers, states, borderById, allStates, addPath, regions } =
    useData(year)

  // function addRegionToState(state: State, region: Region) {
  //   const stateRegionsForYear = state.regionsByYear[year] || []
  //   saveState({
  //     ...state,
  //     regionsByYear: {
  //       ...state.regionsByYear,
  //       [year]: [...stateRegionsForYear, region],
  //     },
  //   })
  // }

  // Island (cultural) creation is handled in a separate function?
  function handlePathCompleted(newPath: NewPath) {
    addPath(newPath)
    console.log('handlePathCompleted')
    console.log(newPath)
    const border =  newPath.start.borderId
    // const { start, end } = newPath
    // const islandBorder = islandBordersById[start.borderId]
    // if (islandBorder) {
    //   const region1: Region = [
    //     newPath.points,
    //     { borderId: start.borderId, start: end.i, end: start.i },
    //   ]
    //   const region2: Region = [newPath.points]
    // }
  }

  // function handleRegionCompleted(region: Region) {
  //   if (selectedState) {
  //     addRegionToState(selectedState, region)
  //   } else {
  //     setNewRegion(region)
  //   }
  // }

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap
        islands={islands}
        rivers={rivers}
        states={states}
        config={config}
        onPathCompleted={handlePathCompleted}
        // onRegionCompleted={handleRegionCompleted}
        borderById={borderById}
        newPaths={newPaths}
        onEsc={() => setNewPaths([])}
        regions={ regions}
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
