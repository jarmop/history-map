import { useEffect, useState } from 'react'
import { TestMap } from '../Map/TestMap'
import { YearInput } from '../../world/YearInput'
import { useData } from '../useData'
import { useConfig, useYear, useZoom } from '../data/usePersistedState'
import { Tools } from './Tools'
import { NewCity } from './NewCity'
import { Culture, Region } from '../newTypes'
import { EditRegion } from './EditRegion'
import { EditCulture } from './EditCulture'

export function TestWorld() {
  const years = [-4000]
  const [year, setYear] = useYear()
  const [zoom, setZoom] = useZoom()
  const [config, setConfig] = useConfig()
  const [activeRegions, setActiveRegions] = useState<number[]>([17])

  const {
    mapRegions,
    onPathCompleted,
    onPointEdited,
    rivers,
    seas,
    cities,
    places,
    addCity,
    cultures,
    saveCultures,
    deleteRegion,
    saveRegionYears,
    cultureByRegion,
  } = useData(year, zoom)

  const activeCulture =
    (activeRegions.length > 0 && cultureByRegion[activeRegions[0]]) || undefined

  useEffect(() => {
    const filteredRegions = activeRegions.filter((id) =>
      mapRegions.find((mr) => mr.id === id)
    )
    if (activeRegions.length !== filteredRegions.length) {
      setActiveRegions(filteredRegions)
    }
  }, [mapRegions, activeRegions])

  return (
    <>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <TestMap
        regions={mapRegions}
        rivers={rivers}
        seas={seas}
        cities={config.showCities ? cities : []}
        places={config.showPlaces ? places : []}
        onPathCompleted={onPathCompleted}
        onPointEdited={onPointEdited}
        zoom={zoom}
        activeRegions={activeRegions}
        setActiveRegions={(regionIds: Region['id'][]) =>
          setActiveRegions(regionIds)
        }
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
        &nbsp;
        <input
          type="checkbox"
          id="showPlaces"
          name="showPlaces"
          checked={config.showPlaces}
          onChange={(e) =>
            setConfig({ ...config, showPlaces: e.target.checked })
          }
        />
        <label htmlFor="showPlaces">Show places</label>
      </div>
      <div style={{ display: 'flex' }}>
        <NewCity onSave={addCity} />
        {activeRegions.length > 0 && (
          <>
            <EditRegion
              mapRegions={mapRegions}
              cultures={cultures}
              activeRegions={activeRegions}
              activeCulture={activeCulture}
              year={year}
              saveCultures={saveCultures}
              onDelete={(regionId: Region['id']) => deleteRegion(regionId)}
              onSaveYears={saveRegionYears}
            />
            <EditCulture
              culture={activeCulture}
              regionIds={activeRegions}
              saveCulture={(culture: Culture) => saveCultures([culture])}
            />
          </>
        )}
      </div>
    </>
  )
}
