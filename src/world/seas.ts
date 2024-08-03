import { latLonByName, LatLonName } from '../customMap/latLonByName'

export const caspianSea: LatLonName[] = [
  'Mouth of Volga',
  'Atyrau',
  'Beyneu',
  // 'Aktau',
  // 'Turkmenbashi',
  'Gorgan',
  'Sari',
  'Ramsar',
  'Rasht',
  'Baku',
  'Makhachkala',
]

export const seas = [caspianSea].map((sea) =>
  sea.map((name) => latLonByName[name])
)
