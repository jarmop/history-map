import { europe, asia, africa } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { mediterraneanIslands } from '../customMap/islands'
import { State } from './types'

export const byzantineEmpire: State = {}

byzantineEmpire[395] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Cardon', 'Budva'),
      [
        'Budva',
        'Belgrade',
        'Knjazevac',
        'Veliko Tarnovo',
        'Ruse',
        'Calarasi',
        'Braila',
        'Cardon',
      ],
    ]),
    joinBorders([
      sliceBorder(asia, 'Umluj', 'Rize'),
      [
        'Rize',
        'Bayburt',
        'Kelkit',
        'Tunceli',
        'Bingol',
        'Batman',
        'Al Mayadin',
        'Al Qurayyat',
        'Umluj',
      ],
    ]),
    joinBorders([
      sliceBorder(africa, 'Suez', 'Berenice Troglodytica'),
      [
        'Berenice Troglodytica',
        "Wadi Halfa'",
        'Bawiti',
        'Al Jaghbub',
        'Maradah',
        'Al Uqaylah',
      ],
      sliceBorder(africa, 'Al Uqaylah', 'Port Said'),
      ['Port Said', 'Suez'],
    ]),
    mediterraneanIslands.Crete,
    mediterraneanIslands.Cyprus,
  ],
  cities: [
    'Istanbul',
    'Athens',
    'Corinth',
    'Izmir',
    'Sinop',
    'Latakia',
    'Damascus',
  ],
}
