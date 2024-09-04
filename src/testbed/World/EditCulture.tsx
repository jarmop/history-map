import { useEffect, useState } from 'react'
import { Culture } from '../newTypes'

interface EditCultureProps {
  culture: Culture | undefined
  saveCulture: (culture: Culture) => void
}

export function EditCulture({ culture, saveCulture }: EditCultureProps) {
  const [editedCulture, setEditedCulture] = useState(culture)

  useEffect(() => setEditedCulture(culture), [culture])

  if (!editedCulture) {
    return
  }

  return (
    <div style={{ border: '1px solid black' }}>
      Edit {editedCulture.id}
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
