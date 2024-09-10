import { useEffect, useState } from 'react'
import { Culture, MapRegion, Region } from '../newTypes'

interface EditRegionProps {
  mapRegions: MapRegion[]
  cultures: Culture[]
  activeRegions: Region['id'][]
  activeCulture: Culture | undefined
  year: number
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
  activeCulture,
  year,
  saveCultures,
  onDelete,
  onSaveYears,
}: EditRegionProps) {
  const mapRegion = mapRegions.find((r) => r.id === activeRegions[0])

  const [years, setYears] = useState({
    startYear: mapRegion?.border.startYear,
    endYear: mapRegion?.border.endYear,
  })

  useEffect(() => {
    setYears({
      startYear: mapRegion?.border.startYear,
      endYear: mapRegion?.border.endYear,
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
        value={activeCulture?.id || 0}
        onChange={(e) => {
          const culture = cultures.find(
            (c) => c.id === parseInt(e.target.value)
          )

          const updatedCultures: Culture[] = []
          if (activeCulture) {
            updatedCultures.push({
              ...activeCulture,
              possessions: activeCulture.possessions.filter(
                (p) => !activeRegions.includes(p.regionId)
              ),
            })
          }
          if (culture) {
            const newPossessions = [
              ...activeRegions
                .filter(
                  (rId) => !culture.possessions.find((p) => p.regionId === rId)
                )
                .map((rId) => ({
                  regionId: rId,
                  start: mapRegion.border.startYear || year,
                  end: mapRegion.border.endYear,
                })),
            ]

            updatedCultures.push({
              ...culture,
              possessions: [...culture.possessions, ...newPossessions],
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
      <br />
      <label>Start:</label>
      &nbsp;
      <input
        type="number"
        value={years.startYear === undefined ? '' : years.startYear}
        onChange={(e) =>
          setYears({
            ...years,
            startYear:
              e.target.value === '' ? undefined : parseInt(e.target.value),
          })
        }
        style={{ width: '50px' }}
      />
      &nbsp;
      <label>End:</label>
      &nbsp;
      <input
        type="number"
        value={years.endYear === undefined ? '' : years.endYear}
        onChange={(e) => {
          setYears({
            ...years,
            endYear:
              e.target.value === '' ? undefined : parseInt(e.target.value),
          })
        }}
        style={{ width: '50px' }}
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
