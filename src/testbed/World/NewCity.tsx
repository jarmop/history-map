import { useState } from 'react'
import { getLatLonByName } from '../helpers'
import { Place } from '../newTypes'

interface NewCityProps {
  onSave: (city: Place) => void
}

const defaultCity: Place = { id: '', xy: [0, 0], type: 'town', start: 0 }

export function NewCity({ onSave }: NewCityProps) {
  const [city, setCity] = useState<Place>(defaultCity)
  if (!city) {
    return <button onClick={() => setCity(defaultCity)}>Add new city</button>
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h4>Add new city</h4>
      <label>Name:</label>
      <br />
      <input
        type="text"
        value={city.id}
        onChange={(e) => {
          const id = e.target.value
          const xy = getLatLonByName(id) || [0, 0]
          setCity({ ...city, id, xy })
        }}
      />
      <br />
      <label>Start:</label>
      <br />
      <input
        type="number"
        value={city.start || ''}
        onChange={(e) => setCity({ ...city, start: parseInt(e.target.value) })}
      />
      <br />
      <label>End:</label>
      <br />
      <input
        type="number"
        value={city.end || ''}
        onChange={(e) => setCity({ ...city, end: parseInt(e.target.value) })}
      />
      <br />
      <label>Coordinates:</label>
      <br />
      <input
        type="text"
        value={`${city.xy[0]}, ${city.xy[1]}`}
        onChange={(e) => {
          const xy = e.target.value
            .split(', ')
            .map((val) => parseFloat(val)) as [number, number]

          !isNaN(xy[0]) && !isNaN(xy[1]) && setCity({ ...city, xy })
        }}
      />
      <br />
      <button onClick={() => onSave(city)}>Add</button>
    </div>
  )
}
