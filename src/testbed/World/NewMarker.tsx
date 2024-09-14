import { useState } from 'react'
import { getLatLonByName } from '../helpers'
import { Marker, markerTypes } from '../newTypes'

interface NewMarkerProps {
  onSave: (marker: Marker) => void
}

const defaultMarker: Marker = { id: '', xy: [0, 0], type: 'town', start: 0 }

export function NewMarker({ onSave }: NewMarkerProps) {
  const [marker, setMarker] = useState<Marker>(defaultMarker)
  if (!marker) {
    return <button onClick={() => setMarker(defaultMarker)}>Add new marker</button>
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h4>Add new marker</h4>
      <label>Name:</label>
      <br />
      <input
        type="text"
        value={marker.id}
        onChange={(e) => {
          const id = e.target.value
          const xy = getLatLonByName(id) || [0, 0]
          setMarker({ ...marker, id, xy })
        }}
      />
      <br />
      <label>Type:</label>
      <br />
      <select
        value={marker.type}
        onChange={(e) =>
          setMarker({ ...marker, type: e.target.value as Marker['type'] })
        }
      >
        {markerTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <br />
      <label>Start:</label>
      &nbsp;
      <input
        style={{ width: '50px' }}
        type="number"
        value={marker.start || ''}
        onChange={(e) =>
          setMarker({ ...marker, start: parseInt(e.target.value) })
        }
      />
      &nbsp;
      <label>End:</label>
      &nbsp;
      <input
        style={{ width: '50px' }}
        type="number"
        value={marker.end || ''}
        onChange={(e) => setMarker({ ...marker, end: parseInt(e.target.value) })}
      />
      <br />
      <label>Coordinates:</label>
      <br />
      <input
        type="text"
        value={`${marker.xy[0]}, ${marker.xy[1]}`}
        onChange={(e) => {
          const xy = e.target.value
            .split(', ')
            .map((val) => parseFloat(val)) as [number, number]

          !isNaN(xy[0]) && !isNaN(xy[1]) && setMarker({ ...marker, xy })
        }}
      />
      <br />
      <label>Image:</label>
      <br />
      <input
        type="text"
        value={marker.image}
        onChange={(e) => {
          setMarker({ ...marker, image: e.target.value })
        }}
      />
      <br />
      <label>Artist:</label>
      <br />
      <input
        type="text"
        value={marker.artist}
        onChange={(e) => {
          setMarker({ ...marker, artist: e.target.value })
        }}
      />
      <br />
      <label>Location:</label>
      <br />
      <input
        type="text"
        value={marker.location}
        onChange={(e) => {
          setMarker({ ...marker, location: e.target.value })
        }}
      />
      <br />
      <br />
      <button onClick={() => onSave(marker)}>Add</button>
    </div>
  )
}
