import { useEffect, useState } from 'react'
import { Culture, Possession, Region } from '../newTypes'

interface EditCultureProps {
  culture: Culture | undefined
  regionIds: Region['id'][]
  saveCulture: (culture: Culture) => void
}

const newCulture = {
  id: 0,
  name: 'New culture',
  color: 'burlywood',
  possessions: [],
}

export function EditCulture({
  culture,
  regionIds,
  saveCulture,
}: EditCultureProps) {
  const [editedCulture, setEditedCulture] = useState(culture)

  const possessions = editedCulture?.possessions?.filter((p) =>
    regionIds.includes(p.regionId)
  )
  const years = {
    startYear: possessions?.[0]?.start || '',
    endYear: possessions?.[0]?.end || '',
  }

  useEffect(() => setEditedCulture(culture), [culture])

  if (!editedCulture) {
    return (
      <button onClick={() => saveCulture(newCulture)}>Add new culture</button>
    )
  }

  const updatePossessions = (possessions: Possession[]) => {
    if (!editedCulture.possessions || !possessions) {
      throw new Error('no possessions')
    }
    setEditedCulture({
      ...editedCulture,
      possessions: [
        ...editedCulture.possessions.filter(
          (p) => !regionIds.includes(p.regionId)
        ),
        ...possessions,
      ],
    })
  }

  return (
    <div style={{ border: '1px solid black' }}>
      Edit {editedCulture.name}
      <br />
      <br />
      Name
      <br />
      <input
        type="text"
        value={editedCulture.name}
        onChange={(e) =>
          setEditedCulture({ ...editedCulture, name: e.target.value })
        }
      />
      <br />
      Color
      <br />
      <input
        type="text"
        value={editedCulture.color || ''}
        onChange={(e) =>
          setEditedCulture({ ...editedCulture, color: e.target.value })
        }
      />
      <br />
      <br />
      <label>Start:</label>
      &nbsp;
      <input
        type="number"
        value={years.startYear || ''}
        onChange={(e) => {
          const newStart = parseInt(e.target.value)
          possessions &&
            updatePossessions(
              possessions.map((p) => ({ ...p, start: newStart }))
            )
        }}
        style={{ width: '50px' }}
      />
      {possessions && possessions.length === regionIds.length && (
        <>
          &nbsp;
          <label>End:</label>
          &nbsp;
          <input
            type="number"
            value={years.endYear || ''}
            onChange={(e) => {
              const newEnd = parseInt(e.target.value)
              possessions &&
                updatePossessions(
                  possessions.map((p) => ({ ...p, end: newEnd }))
                )
            }}
            style={{ width: '50px' }}
          />
        </>
      )}
      <br />
      <br />
      <br />
      <button onClick={() => saveCulture(editedCulture)}>Save</button>
    </div>
  )
}
