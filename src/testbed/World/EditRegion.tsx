import { Culture, Region } from '../newTypes'

interface EditRegionProps {
  cultures: Culture[]
  activeRegions: Region['id'][]
  saveCultures: (cultures: Culture[]) => void
  onDelete: (regionId: Region['id']) => void
}

export function EditRegion({
  cultures,
  activeRegions,
  saveCultures,
  onDelete,
}: EditRegionProps) {
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
          const culture = cultures.find((c) => c.id === e.target.value)
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
          <option key={c.id}>{c.id}</option>
        ))}
      </select>
      {activeRegions.length === 1 && (
        <>
          <br />
          <button onClick={() => onDelete(activeRegions[0])}>Delete</button>
        </>
      )}
    </div>
  )
}
