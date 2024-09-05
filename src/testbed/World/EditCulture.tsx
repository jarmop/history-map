import { useEffect, useState } from 'react'
import { Culture } from '../newTypes'

interface EditCultureProps {
  culture: Culture | undefined
  saveCulture: (culture: Culture) => void
}

const newCulture = {
  id: 0,
  name: 'New culture',
  regions: [],
  color: 'burlywood',
}

export function EditCulture({ culture, saveCulture }: EditCultureProps) {
  const [editedCulture, setEditedCulture] = useState(culture)

  useEffect(() => setEditedCulture(culture), [culture])

  if (!editedCulture) {
    return (
      <button onClick={() => saveCulture(newCulture)}>Add new culture</button>
    )
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
      <button onClick={() => saveCulture(editedCulture)}>Save</button>
    </div>
  )
}
