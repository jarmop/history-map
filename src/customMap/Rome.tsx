import { useEffect, useState } from 'react'
import { CustomMap } from './CustomMap'
import { LatLonName, latLonByName as modernCities } from './latLonByName'
import * as storage from '../storage'
import { mediterraneanIslands } from './islands'
import { africa, asia, europe } from './continents'
import { joinBorders } from './helpers'

const latLonByName = {
  ...modernCities,
  // Luceria: [],
}

type Nation = Record<number, { borders: LatLonName[][]; cities: LatLonName[] }>

// const romanKingdom: Nation = {
//   753: ['Rome'],
//   509: ['Rome'],
// }

const romanRepublic: Nation = {
  ['-500']: {
    borders: [],
    cities: ['Rome', 'Ostia'],
  },
  // ['-27']: ['Rome'],
}

// After the Latin war
romanRepublic['-338'] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Naples', 'Santa Severa'),
      ['Santa Severa', 'Nepi', 'Frosinone', 'Caserta', 'Naples'],
    ]),
  ],
  cities: [
    ...romanRepublic['-500'].cities,
    'Veii',
    'Antium',
    'Terracina',
    'Capua',
  ],
}
// Start of 3rd Samnite war
romanRepublic['-298'] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Amalfi', 'Santa Severa'),
      ['Santa Severa', 'Narni', "L'Aquila", 'Giulianova'],
      sliceBorder(europe, 'Giulianova', 'Trani'),
      [
        'Trani',
        'Minervino Murge',
        'Celano',
        'Cassino',
        'Caserta',
        'Avellino',
        'Amalfi',
      ],
    ]),
  ],
  cities: [
    ...romanRepublic['-338'].cities,
    'Naples',
    'Arpi',
    'Lucera',
    'Narni',
  ],
}
// End of 3rd Samnite war
romanRepublic['-290'] = {
  borders: [],
  cities: [...romanRepublic['-298'].cities, 'Spoleto', 'Benevento', 'Venosa'],
}
// End of the Pyrrhic war
romanRepublic['-272'] = {
  borders: [],
  cities: [
    ...romanRepublic['-290'].cities,
    'Salerno',
    'Agropoli' /*Paestum*/,
    'Thurii',
    'Taranto',
    'Brindisi',
    'Crotone',
    'Locri',
    'Reggio di Calabria',
  ],
}
// Start of 1st Punic war
romanRepublic['-264'] = {
  borders: [],
  cities: [
    ...romanRepublic['-272'].cities,
    'Cosa',
    'Tarquinia',
    'Volsinii',
    'Perugia',
    'Arezzo', // Arretium
    'Populonia',
    'Vetulonia',
    'Ancona',
    'Sentinum',
    'Fermo',
    'Rimini', // Ariminium
  ],
}
// Start of 2nd Punic war
romanRepublic['-218'] = {
  borders: [],
  cities: [
    ...romanRepublic['-264'].cities,
    // ...mediterraneanIslands.Corse,
    // ...mediterraneanIslands.Sardegna,
    // ...mediterraneanIslands.Sicily,
    'Pisa',
    'Padova', // Patavium
    'Verona',
    'Modena',
    'Parma',
    'Placentia',
    'Cremona',
    'Pavia',
    'Milan', // Mediolanium
  ],
}
// Start of 3rd Punic war
romanRepublic['-149'] = {
  borders: [],
  cities: [
    ...romanRepublic['-218'].cities,
    // ...mediterraneanIslands.Mallorca,
    // Spain
    'Barcelona',
    // 'Valencia', // 138 BC
    // 'Madrid',
    'Sevilla',
    // 'Huelva',
    'Cadiz',
    // 'Almeria',
    'Cartagena',
    // 'Benidorm',
    // 'Albacete',
    'Cordoba',
    // 'Merida',
    'Toledo',
    // 'Zaragoza',
    'Girona',
    // Italy
    'Genoa',
    'Venice',
    // 'Ludovico',
    'Trieste',
    // Balkans
    'Pula',
    'Rijeka',
    'Zadar',
    'Split',
    'Dubrovnik',
    'Durres',
    // 'Vlore',
    // Greek
    'Chalkida',
    'Thessaloniki',
    // 'Kavala',
  ],
}

// Roman Republic after death of Julius Caesar
romanRepublic['-44'] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Kavala', 'Foz'),
      sliceBorder(europe, 'Foz', 'Dunkirk'),
      [
        'Dunkirk',
        'Brussels',
        'Nancy',
        'Dijon',
        'Lyon',
        'Geneva',
        'Montreux',
        'Innsbruck',
        'Skopje',
        'Kavala',
      ],
    ]),
    joinBorders([
      sliceBorder(asia, 'Haifa', 'Samsun'),
      [
        'Samsun',
        'Bolu',
        'Eskisehir',
        'Aksaray',
        'Kahramanmaras',
        'Gaziantep',
        'Damascus',
        'Haifa',
      ],
    ]),
    joinBorders([
      sliceBorder(africa, 'Jijel', 'Marsa Matruh'),
      [
        'Marsa Matruh',
        'Al Jaghbub',
        // 'Al Uqaylah',
        'Maradah',
        'Tozeur',
        'Biskra',
        'Barika',
        'Jijel',

        // 'Gabes',
        // 'Misrata',
        // 'Bin Jawad',
        // 'Benghazi',
      ],
    ]),
    ...Object.values(mediterraneanIslands),
  ],
  cities: [
    ...romanRepublic['-149'].cities,
    'Valencia',
    // ...mediterraneanIslands.Crete,
    // ...mediterraneanIslands.Cyprus,
    // Iberia
    // 'Lisbon',
    // 'A Coruna',
    // 'Bilbao',
    // 'Leon',
    // 'Salamanca',
    // 'Badajoz',
    // France
    // 'Bayonne',
    // 'Brest',
    // 'Le Havre',
    // 'Calais',
    // 'Nantes',
    // 'Bordeaux',
    'Paris',
    // 'Dunkirk',
    // 'Dijon',
    // 'Nice',
    'Marseille',
    'Montpellier',
    // 'Perpignan',
    'Toulouse',
    'Lyon',
    // 'Nancy',
    // 'Limoges',
    // Europe
    // 'Montreux',
    // 'Innsbruck',
    // 'Brussels',
    // 'Namur',
    // 'Skopje',
    // 'Plovdiv',
    // Greek
    'Athens',
    // 'Kalamata',
    'Corinth',
    // 'Missolonghi',
    // 'Ioannina',
    // 'Bitola',
    // Turkey
    // 'Istanbul',
    // 'Canakkale',
    'Izmir',
    // 'Antalya',
    // 'Bodrum',
    // 'Marmaris',
    // 'Bandirma',
    // 'Bursa',
    'Sinop',
    // 'Zonguldak',
    // 'Samsun',
    // 'Usak',
    // 'Mersin',
    // 'Adana',
    // 'Iskenderun',
    // 'Kahramanmaras',
    // Levant
    // 'Aleppo',
    'Latakia',
    // 'Beirut',
    // 'Haifa',
    'Damascus',
    // 'Irbid',
    // 'Homs',
    // Africa
    'Carthage',
    // 'Jijel',
    // 'Annaba',
    // 'Barika',
    // 'Biskra',
    // 'Tozeur',
    // 'Sfax',
    // 'Gabes',
    // 'Misrata',
    // 'Bin Jawad',
    // 'Benghazi',
    // 'Al Bayda',
    // 'Marsa Matruh',
    // 'Al Jaghbub',
  ],
}

function sliceBorder(
  latLonNames: LatLonName[],
  start: LatLonName,
  end: LatLonName
) {
  return latLonNames.slice(
    latLonNames.indexOf(start),
    latLonNames.indexOf(end) + 1
  )
}

// const romanEmpire: Nation = {
//   27: [],
//   395: []
// }

// const WesternRomanEmpire: Nation = {
//   395: [],
//   476: [],
// }

// const romanEmpire: Nation = {
//   395: [],
//   1453: [],
// }

export function Rome() {
  const [yearIndex, setYearIndex] = useState(storage.getYearIndex())
  const years = Object.keys(romanRepublic).map((year) => parseInt(year))
  const year = years[yearIndex]

  const romeCities = romanRepublic[year].cities.map(
    (name) => latLonByName[name]
  )
  const romeBorders = romanRepublic[year].borders?.map((border) =>
    border.map((name) => latLonByName[name])
  )

  useEffect(() => storage.setYearIndex(yearIndex), [yearIndex])

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap cities={romeCities} borders={romeBorders} />
      <button
        onClick={() => setYearIndex(yearIndex - 1)}
        disabled={yearIndex === 0}
      >
        {'<'}
      </button>
      <button
        onClick={() => setYearIndex(yearIndex + 1)}
        disabled={yearIndex === years.length - 1}
      >
        {'>'}
      </button>
    </div>
  )
}
