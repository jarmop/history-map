import { useEffect, useState } from 'react'
import { TestMap } from '../Map/TestMap'
import { YearInput } from '../../world/YearInput'
import { useData } from '../useData'
import { useConfig, useYear, useZoom } from '../data/usePersistedState'
import { Tools } from './Tools'
import { Culture, Marker, Region } from '../newTypes'
import { EditRegion } from './EditRegion'
import { EditCulture } from './EditCulture'
import { EditMarker } from './EditMarker'

export function TestWorld() {
  const years = [-4000]
  const [year, setYear] = useYear()
  const [zoom, setZoom] = useZoom()
  const [config, setConfig] = useConfig()
  const [activeRegions, setActiveRegions] = useState<number[]>([17])
  const [activeMarker, setActiveMarker] = useState<Marker>()
  const [selectedMarker, setSelectedMarker] = useState<Marker>()

  const {
    mapRegions,
    onPathCompleted,
    onPointEdited,
    onPointAdded,
    rivers,
    seas,
    markers,
    saveMarker,
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
          <EditMarker onSave={saveMarker} marker={selectedMarker} />
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
          minWidth: '910px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 150px)',
          height: 'fit-content',
          gap: 2,
          padding: 2,
        }}
      >
        {markers
          .filter((a) =>
            [
              'literature',
              'person',
              // 'church'
            ].includes(a.type)
          )
          .sort((a, b) => b.start - a.start)
          .slice(0, 100)
          .map((a) => (
            <div
              key={a.id}
              onMouseEnter={() => setActiveMarker(a)}
              onMouseLeave={() => setActiveMarker(undefined)}
              onClick={(e) => {
                if (e.detail === 2) {
                  window.open(a.image)
                } else {
                  setSelectedMarker((s) => (s?.id === a.id ? undefined : a))
                }
              }}
              style={{
                position: 'relative',
                cursor: 'pointer',
                backgroundColor:
                  a.id === selectedMarker?.id ? 'lightgreen' : '',
              }}
            >
              {a.thumbnail ? (
                <img
                  src={a.thumbnail}
                  style={{
                    objectFit: 'contain',
                    width: '150px',
                    maxHeight: '150px',
                  }}
                />
              ) : (
                <>{a.name}</>
              )}

              {activeMarker?.id === a.id && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    fontSize: '11px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                    }}
                  >
                    {a.name}
                  </div>
                  {a.artist
                    ? `{a.artist}, {a.start}`
                    : a.end
                    ? `${a.start} - ${a.end}`
                    : a.end}

                  <br />
                  {a.location}
                  <br />
                  <div
                    style={{
                      fontSize: '11px',
                    }}
                  >
                    {a.description}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
