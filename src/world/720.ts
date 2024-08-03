import { africa, asia, europe } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { caspianSea } from './seas'
import { State } from './types'

const umayyadCaliphate: State = {
  borders: [
    joinBorders([
      sliceBorder(asia, 'Mundra', 'Mersin'),
      [
        'Mersin',
        'Karaman',
        'Nigde',
        'Batman',
        'Bingol',
        'Batumi',
        'Makhachkala',
      ],
      sliceBorder(caspianSea.reverse(), 'Makhachkala', 'Rasht'),
      [
        'Rasht',
        'Tehran',
        'Ashgabat',
        'Akpetki',
        'Bishkek',
        'Islamabad',
        'Mundra',
      ],
    ]),
    joinBorders([
      sliceBorder(africa, 'Suez', 'Berenice Troglodytica'),
      ['Berenice Troglodytica', 'Tiznit'],
      sliceBorder(africa, 'Tiznit', 'Port Said'),
      ['Port Said', 'Suez'],
    ]),
    joinBorders([
      sliceBorder(europe, 'Montpellier', 'Foz'),
      [
        'Foz',
        'Leon',
        'Donostia',
        'Pamplona',
        'Girona',
        'Narbonne',
        'Montpellier',
      ],
    ]),
  ],
  cities: ['Verden', 'Fulda', 'Augsburg'],
}

export const w720 = [umayyadCaliphate]
