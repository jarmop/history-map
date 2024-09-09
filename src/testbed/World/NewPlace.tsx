import { useState } from 'react'
import { getLatLonByName } from '../helpers'
import { Place, placeTypes } from '../newTypes'

interface NewPlaceProps {
  onSave: (place: Place) => void
}

const defaultPlace: Place = { id: '', xy: [0, 0], type: 'town', start: 0 }

export function NewPlace({ onSave }: NewPlaceProps) {
  const [place, setPlace] = useState<Place>(defaultPlace)
  if (!place) {
    return <button onClick={() => setPlace(defaultPlace)}>Add new place</button>
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h4>Add new place</h4>
      <label>Name:</label>
      <br />
      <input
        type="text"
        value={place.id}
        onChange={(e) => {
          const id = e.target.value
          const xy = getLatLonByName(id) || [0, 0]
          setPlace({ ...place, id, xy })
        }}
      />
      <br />
      <label>Type:</label>
      <br />
      <select
        value={place.type}
        onChange={(e) =>
          setPlace({ ...place, type: e.target.value as Place['type'] })
        }
      >
        {placeTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <br />
      <label>Start:</label>
      <br />
      <input
        type="number"
        value={place.start || ''}
        onChange={(e) => setPlace({ ...place, start: parseInt(e.target.value) })}
      />
      <br />
      <label>End:</label>
      <br />
      <input
        type="number"
        value={place.end || ''}
        onChange={(e) => setPlace({ ...place, end: parseInt(e.target.value) })}
      />
      <br />
      <label>Coordinates:</label>
      <br />
      <input
        type="text"
        value={`${place.xy[0]}, ${place.xy[1]}`}
        onChange={(e) => {
          const xy = e.target.value
            .split(', ')
            .map((val) => parseFloat(val)) as [number, number]

          !isNaN(xy[0]) && !isNaN(xy[1]) && setPlace({ ...place, xy })
        }}
      />
      <br />
      <button onClick={() => onSave(place)}>Add</button>
    </div>
  )
}
