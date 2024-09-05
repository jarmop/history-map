import { useEffect, useState } from 'react'
import { Culture, MapRegion, Region } from '../newTypes'

interface EditRegionProps {
  mapRegions: MapRegion[]
  cultures: Culture[]
  activeRegions: Region['id'][]
  saveCultures: (cultures: Culture[]) => void
  onDelete: (regionId: Region['id']) => void
  onSaveYears: (
    mapRegionId: MapRegion['id'],
    startYear?: number,
    endYear?: number
  ) => void
}

export function EditRegion({
  mapRegions,
  cultures,
  activeRegions,
  saveCultures,
  onDelete,
  onSaveYears,
}: EditRegionProps) {
  const mapRegion = mapRegions.find((r) => r.id === activeRegions[0])

  const [years, setYears] = useState({
    startYear: mapRegion?.border.startYear || 0,
    endYear: mapRegion?.border.endYear || 0,
  })

  useEffect(() => {
    setYears({
      startYear: mapRegion?.border.startYear || 0,
      endYear: mapRegion?.border.endYear || 0,
    })
  }, [mapRegion])

  if (!mapRegion) {
    return
  }

  return (
    <div style={{ border: '1px solid black' }}>
      Add region {activeRegions} to culture
      <br />
      <select
        value={
          cultures.find((c) =>
            activeRegions.every((r) => c.regions.includes(r))
          )?.id || 0
        }
        onChange={(e) => {
          const culture = cultures.find(
            (c) => c.id === parseInt(e.target.value)
          )
          const previousCulture = cultures.find((c) =>
            activeRegions.every((r) => c.regions.includes(r))
          )
          const updatedCultures: Culture[] = []
          if (previousCulture) {
            updatedCultures.push({
              ...previousCulture,
              regions: [
                ...previousCulture.regions.filter(
                  (id) => !activeRegions.includes(id)
                ),
              ],
            })
          }
          if (culture) {
            updatedCultures.push({
              ...culture,
              regions: [
                ...culture.regions.filter((id) => !activeRegions.includes(id)),
                ...activeRegions,
              ].sort(),
            })
          }
          if (updatedCultures.length > 0) {
            saveCultures(updatedCultures)
          }
        }}
      >
        <option></option>
        {cultures.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <br />
      <label>Start:</label>
      <br />
      <input
        type="number"
        value={years.startYear || ''}
        onChange={(e) =>
          setYears({ ...years, startYear: parseInt(e.target.value) })
        }
      />
      <br />
      <label>End:</label>
      <br />
      <input
        type="number"
        value={years.endYear || ''}
        onChange={(e) => {
          setYears({ ...years, endYear: parseInt(e.target.value) })
        }}
      />
      <br />
      <button
        onClick={() => {
          onSaveYears(mapRegion.id, years.startYear, years.endYear)
          console.log('Saved years!')
        }}
      >
        Save years
      </button>
      <br />
      {mapRegion && (
        <>
          <br />
          <button onClick={() => onDelete(mapRegion.id)}>
            Delete region {mapRegion.id}
          </button>
        </>
      )}
    </div>
  )
}
