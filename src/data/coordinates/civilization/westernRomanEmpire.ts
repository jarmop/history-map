import { europe, africa } from '../natural/continents'
import { joinBorders, sliceBorder } from '../../../helpers'
import {
  britishIsles,
  mediterraneanIslands,
} from '../natural/islands'
import { StateByYear } from '../../types'

export const westernRomanEmpire: StateByYear = {}

westernRomanEmpire[395] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Budva', 'The Hague'),
      [
        'The Hague',
        'Eindhoven',
        'Mannheim',
        'Heilbronn',
        'Memmingen',
        'Munich',
        'Vienna',
        'Budapest',
        'Belgrade',
        'Budva',
      ],
    ]),
    joinBorders([
      sliceBorder(britishIsles['Great Britain'], 'Dover', 'Dumbarton'),
      ['Dumbarton', 'Falkirk'],
      sliceBorder(britishIsles['Great Britain'], 'Falkirk', 'Southend'),
      ['Southend', 'Dover'],
    ]),
    joinBorders([
      ['Al Uqaylah', 'Maradah', 'Tozeur', 'Biskra', 'Casablanca'],
      sliceBorder(africa, 'Casablanca', 'Al Uqaylah'),
    ]),
    mediterraneanIslands.Mallorca,
    mediterraneanIslands.Corse,
    mediterraneanIslands.Sardegna,
    mediterraneanIslands.Sicily,
  ],
  cities: [
    'Rome',
    'Ostia',
    'Naples',
    'Syracuse',
    'Valencia',
    'Paris',
    'Marseille',
    'Montpellier',
    'Toulouse',
    'Lyon',
    'Carthage',
  ],
}
