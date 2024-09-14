import { useEffect, useState } from 'react'
import { TestMap } from '../Map/TestMap'
import { YearInput } from '../../world/YearInput'
import { useData } from '../useData'
import { useConfig, useYear, useZoom } from '../data/usePersistedState'
import { Tools } from './Tools'
import { Culture, Marker, Region } from '../newTypes'
import { EditRegion } from './EditRegion'
import { EditCulture } from './EditCulture'
import { NewMarker } from './NewMarker'

export function TestWorld() {
  const years = [-4000]
  const [year, setYear] = useYear()
  const [zoom, setZoom] = useZoom()
  const [config, setConfig] = useConfig()
  const [activeRegions, setActiveRegions] = useState<number[]>([17])
  const [activeMarker, setActiveMarker] = useState<Marker>()

  const {
    mapRegions,
    onPathCompleted,
    onPointEdited,
    onPointAdded,
    rivers,
    seas,
    markers,
    addMarker,
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
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
        <TestMap
          regions={
            config.showCultures
              ? mapRegions
              : mapRegions.map((r) => ({ ...r, color: undefined }))
          }
          rivers={rivers}
          seas={seas}
          markers={config.showMarkers ? markers : []}
          onPathCompleted={onPathCompleted}
          onPointEdited={onPointEdited}
          onPointAdded={onPointAdded}
          zoom={zoom}
          activeRegions={activeRegions}
          setActiveRegions={(regionIds: Region['id'][]) =>
            setActiveRegions(regionIds)
          }
          activeMarker={activeMarker}
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
            id="showMarkers"
            name="showMarkers"
            checked={config.showMarkers}
            onChange={(e) =>
              setConfig({ ...config, showMarkers: e.target.checked })
            }
          />
          <label htmlFor="showMarkers">Show markers</label>
          &nbsp;
          <input
            type="checkbox"
            id="showCultures"
            name="showCultures"
            checked={config.showCultures}
            onChange={(e) =>
              setConfig({ ...config, showCultures: e.target.checked })
            }
          />
          <label htmlFor="showCultures">Show Cultures</label>
        </div>
        <div style={{ display: 'flex' }}>
          <NewMarker onSave={addMarker} />
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
      </div>
      <div
        style={{
          minWidth: '404px',
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          height: 'fit-content',
          gap: 2,
          padding: 2,
        }}
      >
        {markers
          .filter((p) => p.type === 'artefact')
          .sort((a, b) => b.start - a.start)
          .slice(0, 20)
          .map((p) => (
            <img
              key={p.id}
              src={p.thumbnail}
              onMouseEnter={() => setActiveMarker(p)}
              onMouseLeave={() => setActiveMarker(undefined)}
              onClick={() => window.open(p.image)}
              style={{
                objectFit: 'contain',
                width: '200px',
                maxHeight: '200px',
              }}
            />
          ))}
      </div>
    </div>
  )
}
