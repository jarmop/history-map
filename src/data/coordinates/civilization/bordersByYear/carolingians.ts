import { getLatLonByName } from '../../../../helpers'
import { State } from '../../../data'
import { eurasiaAfricaNames } from '../../natural/continents/eurasiaAfrica'
import { franciaMiddleEast, franciaWestMiddle } from './843'

export const westFrancia: State = {
  name: 'West Francia',
  endYear: 987,
  regionsByYear: {
    ['843']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Montpellier'),
          end: eurasiaAfricaNames.indexOf('Barcelona'),
        },
        ['Huesca', 'Logrono'].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Donostia'),
          end: eurasiaAfricaNames.indexOf('Saint-Nazaire'),
        },
        ['Rennes'].map(getLatLonByName),
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Saint-Malo'),
          end: eurasiaAfricaNames.indexOf('Perroquet'),
        },
        {
          borderId: 'FranciaWestMiddle843',
          start: 0,
          end: franciaWestMiddle.length - 1,
        },
      ],
    ],
  },
}

export const middleFrancia: State = {
  name: 'Middle Francia',
  endYear: 855,
  regionsByYear: {
    ['843']: [
      [
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Terracina'),
          end: eurasiaAfricaNames.indexOf('Montpellier'),
        },
        {
          borderId: 'FranciaWestMiddle843',
          start: franciaWestMiddle.length - 1,
          end: 0,
        },
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Perroquet'),
          end: eurasiaAfricaNames.indexOf('Varel'),
        },
        {
          borderId: 'FranciaMiddleEast843',
          start: 0,
          end: franciaMiddleEast.length - 1,
        },
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Rijeka'),
          end: eurasiaAfricaNames.indexOf('Vasto'),
        },
      ],
      [
        {
          borderId: 'Corse',
          start: 0,
          end: franciaWestMiddle.length - 1,
        },
      ],
    ],
  },
}

export const eastFrancia: State = {
  name: 'East Francia',
  endYear: 962,
  regionsByYear: {
    ['843']: [
      [
        {
          borderId: 'FranciaMiddleEast843',
          start: franciaMiddleEast.length - 1,
          end: 0,
        },
        {
          borderId: 'eurasiaAfrica',
          start: eurasiaAfricaNames.indexOf('Varel'),
          end: eurasiaAfricaNames.indexOf('Husum'),
        },
        [
          'Eckernforde',
          'Hamburg',
          'Wittenberge',
          'Havelberg',
          'Magdeburg',
          'Jena',
          'Bayreuth',
          'Linz',
          'Vienna',
          'Zagreb',
        ].map(getLatLonByName),
      ],
    ],
  },
}
