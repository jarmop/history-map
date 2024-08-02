import { europe } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { mediterraneanIslands } from '../customMap/islands'
import { StateByYear } from './types'

export const franks: StateByYear = {}

franks[814] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Terracina', 'Barcelona'),
      ['Barcelona', 'Huesca', 'Logrono', 'Donostia'],
      sliceBorder(europe, 'Donostia', 'Saint-Nazaire'),
      ['Saint-Nazaire', 'Rennes', 'Saint-Malo'],
      sliceBorder(europe, 'Saint-Malo', 'Husum'),
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
      sliceBorder(europe, 'Rijeka', 'Vasto'),
      ['Vasto', 'Terracina'],
    ]),
    mediterraneanIslands.Corse,
  ],
  cities: [
    'Rome',
    'Ostia',
    'Paris',
    'Marseille',
    'Montpellier',
    'Toulouse',
    'Lyon',
  ],
}
