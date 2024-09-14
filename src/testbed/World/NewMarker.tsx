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
    return (
      <button onClick={() => setMarker(defaultMarker)}>Add new marker</button>
    )
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h4 style={{ margin: '0 0 10px' }}>Add new marker</h4>
      <div
        style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '5px' }}
      >
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={marker.id}
            onChange={(e) => {
              const id = e.target.value
              const xy = getLatLonByName(id) || marker.xy
              setMarker({ ...marker, id, xy })
            }}
          />
        </div>
        <div>
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
        </div>
        <div>
          <label>Image:</label>
          <br />
          <input
            type="text"
            value={marker.image}
            onChange={(e) => {
              setMarker({ ...marker, image: e.target.value })
            }}
          />
        </div>
        <div>
          <label>Thumbnail:</label>
          <br />
          <input
            type="text"
            value={marker.thumbnail}
            onChange={(e) => {
              setMarker({ ...marker, thumbnail: e.target.value })
            }}
          />
        </div>
        <div>
          <label>Artist:</label>
          <br />
          <input
            type="text"
            value={marker.artist}
            onChange={(e) => {
              setMarker({ ...marker, artist: e.target.value })
            }}
          />
        </div>
        <div>
          <label>Location:</label>
          <br />
          <input
            type="text"
            value={marker.location}
            onChange={(e) => {
              setMarker({ ...marker, location: e.target.value })
            }}
          />
        </div>
        <div style={{ display: 'flex', gridColumn: 'span 2' }}>
          <label>Type:</label>
          &nbsp;
          <select
            value={marker.type}
            onChange={(e) =>
              setMarker({ ...marker, type: e.target.value as Marker['type'] })
            }
            style={{ width: '73px' }}
          >
            {markerTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          &nbsp;
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
            onChange={(e) =>
              setMarker({ ...marker, end: parseInt(e.target.value) })
            }
          />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label>Description:</label>
          <br />
          <textarea
            value={marker.description}
            onChange={(e) => {
              setMarker({ ...marker, description: e.target.value })
            }}
            cols={36}
            rows={5}
          />
        </div>
        <button onClick={() => onSave(marker)}>Add</button>
      </div>
    </div>
  )
}
