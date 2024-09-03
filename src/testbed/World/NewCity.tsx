import { useState } from 'react'
import { City } from '../newTypes'
import { getLatLonByName } from '../helpers'

interface NewCityProps {
  onSave: (city: City) => void
}

const defaultCity: City = { id: '', xy: [0, 0] }

export function NewCity({ onSave }: NewCityProps) {
  const [city, setCity] = useState<City>(defaultCity)
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
        value={city.startYear || ''}
        onChange={(e) =>
          setCity({ ...city, startYear: parseInt(e.target.value) })
        }
      />
      <br />
      <label>End:</label>
      <br />
      <input
        type="number"
        value={city.endYear || ''}
        onChange={(e) =>
          setCity({ ...city, endYear: parseInt(e.target.value) })
        }
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
