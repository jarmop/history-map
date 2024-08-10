import {
  europe,
  asia,
  africa,
  eurasiaAfricaNames,
} from '../../natural/continents/eurasiaAfrica'
import { getLatLonByName, joinBorders, sliceBorder } from '../../../../helpers'
import { mediterraneanIslands } from '../../natural/islands/islands'
import { State } from '../../../data'
import { StateByYear } from '../../../types'

// const romanKingdom: Nation = {
//   753: ['Rome'],
//   509: ['Rome'],
// }

export const romanRepublic: StateByYear = {
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
  borders: [
    joinBorders([
      sliceBorder(europe, 'Amalfi', 'Santa Severa'),
      ['Santa Severa', 'Narni', 'Sansepolcro', 'Giulianova'],
      sliceBorder(europe, 'Giulianova', 'Trani'),
      ['Trani', 'Minervino Murge', 'Amalfi'],
    ]),
  ],
  cities: [...romanRepublic['-298'].cities, 'Spoleto', 'Benevento', 'Venosa'],
}
// End of the Pyrrhic war
romanRepublic['-272'] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Giulianova', 'Santa Severa'),
      ['Santa Severa', 'Narni', 'Sansepolcro', 'Giulianova'],
    ]),
  ],
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
  borders: [
    joinBorders([sliceBorder(europe, 'Rimini', 'Pisa'), ['Pisa', 'Rimini']]),
  ],
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
  borders: [
    joinBorders([
      sliceBorder(europe, 'Monfalcone', 'Pisa'),
      [
        'Pisa',
        'Maranello',
        'Pavia',
        'Novara',
        'Legnano',
        'Bergamo',
        'Verona',
        'Conegliano',
        'Monfalcone',
      ],
    ]),
    mediterraneanIslands.Corse,
    mediterraneanIslands.Sardegna,
    mediterraneanIslands.Sicily,
  ],
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
    'Syracuse',
    'Messina',
    'Palermo',
    'Agrigento',
    'Gela',
    'Aleria',
    'Olbia',
    'Cagliari',
    'Mazara del Vallo', // Lilybaeum
  ],
}
// Start of 3rd Punic war
romanRepublic['-149'] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Monfalcone', 'Pisa'),
      [
        'Pisa',
        'Maranello',
        'Pavia',
        'Novara',
        'Legnano',
        'Bergamo',
        'Verona',
        'Conegliano',
        'Monfalcone',
      ],
    ]),
    mediterraneanIslands.Corse,
    mediterraneanIslands.Sardegna,
    mediterraneanIslands.Sicily,
  ],
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
      ['Foz', 'Leon', 'Burgos', 'Bilbao'],
      sliceBorder(europe, 'Bilbao', 'Dunkirk'),
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

export const romanRepublicObject: State = {
  name: 'Roman Republic',
  regionsByYear: {
    ['-338']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Naples'),
          end: eurasiaAfricaNames.indexOf('Santa Severa'),
        },
        ['Nepi', 'Frosinone', 'Caserta'].map(getLatLonByName),
      ],
    ],
    ['-298']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Amalfi'),
          end: eurasiaAfricaNames.indexOf('Santa Severa'),
        },
        ['Narni', "L'Aquila"].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Giulianova'),
          end: eurasiaAfricaNames.indexOf('Trani'),
        },
        ['Minervino Murge', 'Celano', 'Cassino', 'Caserta', 'Avellino'].map(
          getLatLonByName
        ),
      ],
    ],
    ['-290']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Amalfi'),
          end: eurasiaAfricaNames.indexOf('Santa Severa'),
        },
        ['Santa Severa', 'Narni', 'Sansepolcro', 'Giulianova'].map(
          getLatLonByName
        ),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Giulianova'),
          end: eurasiaAfricaNames.indexOf('Trani'),
        },
        ['Minervino Murge'].map(getLatLonByName),
      ],
    ],
    ['-272']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Giulianova'),
          end: eurasiaAfricaNames.indexOf('Santa Severa'),
        },
        ['Narni', 'Sansepolcro'].map(getLatLonByName),
      ],
    ],
    ['-264']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Rimini'),
          end: eurasiaAfricaNames.indexOf('Pisa'),
        },
      ],
    ],
    ['-218']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Monfalcone'),
          end: eurasiaAfricaNames.indexOf('Pisa'),
        },
        [
          'Maranello',
          'Pavia',
          'Novara',
          'Legnano',
          'Bergamo',
          'Verona',
          'Conegliano',
        ].map(getLatLonByName),
      ],
    ],
    ['-44']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Kavala'),
          end: eurasiaAfricaNames.indexOf('Foz'),
        },
        ['Leon', 'Burgos'].map(getLatLonByName),
        // ],
        // [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Bilbao'),
          end: eurasiaAfricaNames.indexOf('Dunkirk'),
        },
        [
          'Brussels',
          'Nancy',
          'Dijon',
          'Lyon',
          'Geneva',
          'Montreux',
          'Innsbruck',
          'Skopje',
        ].map(getLatLonByName),
      ],
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Haifa'),
          end: eurasiaAfricaNames.indexOf('Samsun'),
        },
        [
          'Bolu',
          'Eskisehir',
          'Aksaray',
          'Kahramanmaras',
          'Gaziantep',
          'Damascus',
        ].map(getLatLonByName),
      ],
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Jijel'),
          end: eurasiaAfricaNames.indexOf('Marsa Matruh'),
        },
        ['Al Jaghbub', 'Maradah', 'Tozeur', 'Biskra', 'Barika'].map(
          getLatLonByName
        ),
      ],
      ...Object.values(mediterraneanIslands).map((borders) => [
        borders.map(getLatLonByName),
      ]),
    ],
  },
}
