import { latLonByName } from '../latLonByName'

const carolingianCities: (keyof typeof latLonByName)[] = ['Paris', 'Aachen']

const italyCities: (keyof typeof latLonByName)[] = [
  'Rome',
  'Venice',
  'Milan',
  'Genoa',
  'Florence',
  'Pisa',
  'Naples',
  'Palermo',
  'Syracuse',
  'Bari',
]

export const cities = [...carolingianCities, ...italyCities].map((name) => {
  const latLon = latLonByName[name]
  const lat = latLon[0] || 0
  const lon = latLon[1] || 0
  return [lat, lon]
})
