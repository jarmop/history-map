import { getLatLonByName } from '../../../helpers'
import { LatLonName } from '../latLonByName'

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

export const aralSea: string[] = [
  'Mouth of Amu Darya',
  '44.685164, 59.179821',
  // '45.569311, 59.398611',
  // '45.834416, 59.106079',
  // '45.734845, 58.921505',
  // '45.351916, 58.674245',
  '44.620386, 58.611560',
  '44.414282, 58.458329',
  '44.411795, 58.256342',
  '44.872671, 58.224999',
  '45.851399, 58.743896',
  '46.784594, 60.554811',
  '46.674789, 61.515989',
  '46.252600, 61.237386',
  '45.554681, 59.903578',
  '44.307219, 59.948851',
]

export const seas = [caspianSea, aralSea].map((sea) => sea.map(getLatLonByName))
