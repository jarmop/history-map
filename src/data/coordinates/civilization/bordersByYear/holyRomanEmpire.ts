import { europe } from '../../natural/continents/eurasiaAfrica'
import { joinBorders, sliceBorder } from '../../../../helpers'
import { mediterraneanIslands } from '../../natural/islands/islands'
import { LatLonName } from '../../latLonByName'
import { StateByYear } from '../../../types'

export const holyRomanEmpire: StateByYear = {}

export const holyRomanEmpireKingdomOfSicily: LatLonName[] = [
  'Giulianova',
  'Rieti',
  'Sora',
  'Terracina',
]

holyRomanEmpire[1075] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Terracina', 'Saintes-Maries-de-la-Mer'),
      [
        'Saintes-Maries-de-la-Mer',
        'Nimes',
        'Saint-Etienne',
        'Lyon',
        'Dijon',
        'Rethel',
        'Saint-Quentin',
        'Antwerp',
        'Breskens',
      ],
      sliceBorder(europe, 'Perroquet', 'Husum'),
      [
        'Husum',
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
        'Rijeka',
      ],
      sliceBorder(europe, 'Rijeka', 'Giulianova'),
      holyRomanEmpireKingdomOfSicily,
    ]),
    mediterraneanIslands.Corse,
    mediterraneanIslands.Sardegna,
  ],
  cities: ['Milan', 'Rome', 'Ostia', 'Pavia', 'Aquileia', 'Pisa'],
}
