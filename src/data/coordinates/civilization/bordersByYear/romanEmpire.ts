import { getLatLonByName} from '../../../../helpers'
import { State } from '../../../data'
import { eurasiaAfricaNames } from '../../natural/continents/eurasiaAfrica'
import {
  mediterraneanIslands,
  britishIsles,
} from '../../natural/islands/islands'

export const romanEmpire: State = {
  name: 'Roman Empire',
  endYear: 394,
  regionsByYear: {
    ['1']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Cardon'),
          end: eurasiaAfricaNames.indexOf('Zwin'),
        },
        ['Brussels', 'Rastatt', 'Basel', 'Munich', 'Budapest', 'Pecs'].map(
          getLatLonByName
        ),
      ],
      [
        ['Sanliurfa', 'Ar Raqqah', 'Al Mayadin', 'Al Qurayyat'].map(
          getLatLonByName
        ),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Umluj'),
          end: eurasiaAfricaNames.indexOf('Berenice Troglodytica'),
        },
        [
          "Wadi Halfa'",
          'Bawiti',
          'Al Jaghbub',
          'Maradah',
          'Tozeur',
          'Biskra',
          'Barika',
        ].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('El Jadida'),
          end: eurasiaAfricaNames.indexOf('Rize'),
        },
      ],
      ...Object.values(mediterraneanIslands).map((borders) => [
        borders.map(getLatLonByName),
      ]),
    ],
    ['117']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Cardon'),
          end: eurasiaAfricaNames.indexOf('The Hague'),
        },
        [
          'Eindhoven',
          'Mannheim',
          'Heilbronn',
          'Memmingen',
          'Munich',
          'Vienna',
          'Budapest',
          'Bistrita',
          'Vatra Dornei',
        ].map(getLatLonByName),
      ],
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Umluj'),
          end: eurasiaAfricaNames.indexOf('Berenice Troglodytica'),
        },
        [
          "Wadi Halfa'",
          'Al Jaghbub',
          'Maradah',
          'Tozeur',
          'Biskra',
          'Barika',
        ].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Casablanca'),
          end: eurasiaAfricaNames.indexOf('Sochi'),
        },
        ['Baku', 'Marand', 'Kalar'].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Shadegan'),
          end: eurasiaAfricaNames.indexOf('Kuwait City'),
        },
        ['Ar Ramadi', 'Ar Rutbah', 'Dawmat al Jandal'].map(getLatLonByName),
      ],
      [
        {
          borderId: 'Great Britain',
          start: britishIsles['Great Britain'].indexOf('Dover'),
          end: britishIsles['Great Britain'].indexOf('Annan'),
        },
        {
          borderId: 'Great Britain',
          start: britishIsles['Great Britain'].indexOf('Sunderland'),
          end: britishIsles['Great Britain'].indexOf('Southend'),
        },
      ],
      ...Object.values(mediterraneanIslands).map((borders) => [
        borders.map(getLatLonByName),
      ]),
    ],
  },
}
