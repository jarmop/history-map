import { useEffect, useState } from 'react'
import { getLatLonByName } from '../helpers'
import { Marker, markerTypes } from '../newTypes'

interface EditMarkerProps {
  onSave: (marker: Marker) => void
  marker?: Marker
}

const defaultMarker: Marker = {
  id: 0,
  name: '',
  xy: [0, 0],
  type: 'person',
  start: 0,
  description: undefined,
  artist: undefined,
  location: undefined,
  image: undefined,
  thumbnail: undefined,
}

export function EditMarker({ onSave, marker: markerProp }: EditMarkerProps) {
  const [marker, setMarker] = useState<Marker>(defaultMarker)

  useEffect(() => {
    setMarker(
      markerProp
        ? { ...markerProp, xy: markerProp.latLon || defaultMarker.xy }
        : defaultMarker
    )
  }, [markerProp])

  if (!marker) {
    return (
      <button onClick={() => setMarker(defaultMarker)}>Add new marker</button>
    )
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h4 style={{ margin: '0 0 10px' }}>
        {markerProp ? `Edit ${marker.name}` : 'Add new marker'}
      </h4>
      <div
        style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '5px' }}
      >
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={marker.name}
            onChange={(e) => {
              const name = e.target.value
              const xy = getLatLonByName(name) || marker.xy
              setMarker({ ...marker, name, xy })
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
            value={marker.image || ''}
            onChange={(e) => {
              const input = e.target.value
              setMarker({
                ...marker,
                image: input.length > 0 ? input : undefined,
              })
            }}
          />
        </div>
        <div>
          <label>Thumbnail:</label>
          <br />
          <input
            type="text"
            value={marker.thumbnail || ''}
            onChange={(e) => {
              const input = e.target.value
              setMarker({
                ...marker,
                thumbnail: input.length > 0 ? input : undefined,
              })
            }}
          />
        </div>
        <div>
          <label>Artist:</label>
          <br />
          <input
            type="text"
            value={marker.artist || ''}
            onChange={(e) => {
              const input = e.target.value
              setMarker({
                ...marker,
                artist: input.length > 0 ? input : undefined,
              })
            }}
          />
        </div>
        <div>
          <label>Location:</label>
          <br />
          <input
            type="text"
            value={marker.location || ''}
            onChange={(e) => {
              const input = e.target.value
              setMarker({
                ...marker,
                location: input.length > 0 ? input : undefined,
              })
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
            value={marker.description || ''}
            onChange={(e) => {
              const input = e.target.value
              setMarker({
                ...marker,
                description: input.length > 0 ? input : undefined,
              })
            }}
            cols={36}
            rows={5}
          />
        </div>
        <button
          onClick={() => {
            onSave(marker)
            !markerProp && setMarker(defaultMarker)
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}
