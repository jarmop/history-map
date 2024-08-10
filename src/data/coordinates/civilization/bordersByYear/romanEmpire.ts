import { europe, asia, africa } from './coordinates/natural/continents'
import { joinBorders, sliceBorder } from '../helpers'
import {
  britishIsles,
  mediterraneanIslands,
} from './coordinates/natural/islands'
import { StateByYear } from './types'

export const romanEmpire: StateByYear = {}

romanEmpire[1] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Cardon', 'Zwin'),
      [
        'Zwin',
        'Brussels',
        'Rastatt',
        'Basel',
        'Munich',
        'Budapest',
        'Pecs',
        'Cardon',
      ],
    ]),
    joinBorders([
      sliceBorder(asia, 'Umluj', 'Rize'),
      ['Rize', 'Sanliurfa', 'Ar Raqqah', 'Al Mayadin', 'Al Qurayyat', 'Umluj'],
    ]),
    joinBorders([
      sliceBorder(africa, 'Suez', 'Berenice Troglodytica'),
      [
        'Berenice Troglodytica',
        "Wadi Halfa'",
        'Bawiti',
        'Al Jaghbub',
        'Maradah',
        'Tozeur',
        'Biskra',
        'Barika',
        'El Jadida',
      ],
      sliceBorder(africa, 'El Jadida', 'Port Said'),
    ]),
    ...Object.values(mediterraneanIslands),
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
    'Athens',
    'Corinth',
    'Izmir',
    'Sinop',
    'Latakia',
    'Damascus',
    'Carthage',
  ],
}

romanEmpire[117] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Cardon', 'The Hague'),
      [
        'The Hague',
        'Eindhoven',
        'Mannheim',
        'Heilbronn',
        'Memmingen',
        'Munich',
        'Vienna',
        'Budapest',
        'Bistrita',
        'Vatra Dornei',
        'Cardon',
      ],
    ]),
    joinBorders([
      sliceBorder(asia, 'Umluj', 'Sochi'),
      ['Sochi', 'Baku', 'Marand', 'Kalar', 'Shadegan'],
      sliceBorder(asia, 'Shadegan', 'Kuwait City'),

      ['Kuwait City', 'Ar Ramadi', 'Ar Rutbah', 'Dawmat al Jandal', 'Umluj'],
    ]),
    joinBorders([
      sliceBorder(africa, 'Suez', 'Berenice Troglodytica'),
      [
        'Berenice Troglodytica',
        "Wadi Halfa'",
        'Al Jaghbub',
        'Maradah',
        'Tozeur',
        'Biskra',
        'Barika',
        'Casablanca',
      ],
      sliceBorder(africa, 'Casablanca', 'Port Said'),
      ['Port Said', 'Suez'],
    ]),
    joinBorders([
      sliceBorder(britishIsles['Great Britain'], 'Dover', 'Annan'),
      ['Annan', 'Sunderland'],
      sliceBorder(britishIsles['Great Britain'], 'Sunderland', 'Southend'),
      ['Southend', 'Dover'],
    ]),
    ...Object.values(mediterraneanIslands),
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
    'Athens',
    'Corinth',
    'Izmir',
    'Sinop',
    'Latakia',
    'Damascus',
    'Carthage',
  ],
}
