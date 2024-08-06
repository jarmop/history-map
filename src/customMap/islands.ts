import { getLatLonByName } from './helpers'
import { latLonByName } from './latLonByName'

export const britishIsles: Record<string, (keyof typeof latLonByName)[]> = {
  ['Great Britain']: [
    'Dover',
    'Eastbourne',
    'Worthing',
    'Portsmouth',
    'Bournemouth',
    'Plymouth',
    'Penzance',
    'Bideford',
    'Bristol',
    'Newport',
    'Cardiff',
    'Swansea',
    'Fishguard',
    'Liverpool',
    'Rottington',
    'Annan',
    'Kirkcudbright',
    'Stranraer',
    'Ayr',
    'Largs',
    'Greenock',
    'Dumbarton',
    'Helensburgh',
    'Campbeltown',
    'Ardrishaig',
    'Oban',
    'Fidden',
    'Portree',
    'Thurso',
    'Wick',
    'Golspie',
    'Inverness',
    'Lossiemouth',
    'Fraserburgh',
    'Peterhead',
    'Aberdeen',
    'Arbroath',
    'Dundee',
    'St. Andrews',
    'Craighead',
    'Rosyth',
    'Falkirk',
    'Edinburgh',
    'Dunbar',
    'Sunderland',
    'Hull',
    'Great Yarmouth',
    'Southend',
  ],
  Ireland: [
    'Dublin',
    'Wexford',
    'Baltimore',
    'Tullybawn',
    'Dingle',
    'Galway',
    'Clifden',
    'Belmullet',
    'Falcarragh',
    'Ballycastle',
    'Belfast',
  ],
}

export const mediterraneanIslands: Record<
  string,
  (keyof typeof latLonByName)[]
> = {
  Corse: ['Ajaccio', 'Bonifacio', 'Aleria', 'Bastia', 'Calvi'],
  Crete: [
    'Heraklion',
    'Chania',
    'Kissamos',
    'Gialos',
    'Lerapetra',
    'Kato Zakros',
  ],
  Cyprus: ['Paphos', 'Limassol', 'Ayja Napa', 'Cidilesek', 'Poli Crysochous'],
  Mallorca: ['Palma', 'Salines', 'Agulla', 'Vicenc', 'Sant_Elm'],
  Sardegna: [
    'Capo Comino',
    'Olbia',
    'Palau',
    'Santa Teresa Gallura',
    'Alghero',
    'Oristano',
    'Portoscuso',
    'Capo Spartivento',
    'Nora',
    'Cagliari',
    'Notteri',
    'Capo Monte Santo',
  ],
  Sicily: [
    'Palermo',
    'Trapani',
    'Marsala',
    'Pozzallo',
    'Syracuse',
    'Catania',
    'Messina',
  ],
}

export const islandsBorders = Object.values({
  ...britishIsles,
  ...mediterraneanIslands,
}).map((names) => {
  return names.map((name) => {
    const latLon = latLonByName[name]
    const lat = latLon[0] || 0
    const lon = latLon[1] || 0
    return [lat, lon]
  })
})

// export const islands = Object.entries({
//   ...britishIsles,
//   ...mediterraneanIslands,
// }).reduce((acc, curr) => {
//   const [key, value] = curr

//   acc[key] =
// }, {})

const allIslands = {
  ...britishIsles,
  ...mediterraneanIslands,
}

export const islandBorders = Object.entries(allIslands).map(
  ([name, border]) => {
    return {
      id: name,
      path: border.map(getLatLonByName),
    }
  }
)

export const islandRegions = Object.keys(allIslands).map((key) => ({
  id: key,
  borders: [key],
}))
