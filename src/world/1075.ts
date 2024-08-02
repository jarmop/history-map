import { europe } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { mediterraneanIslands } from '../customMap/islands'
import { byzantineEmpire } from './byzantineEmpire'
import {
  holyRomanEmpire,
  holyRomanEmpireKingdomOfSicily,
} from './holyRomanEmpire'
import { State } from './types'

const kingdomOfSicily: State = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Giulianova', 'Terracina'),
      holyRomanEmpireKingdomOfSicily.reverse(),
    ]),
    mediterraneanIslands.Sicily,
  ],
  cities: ['Naples', 'Benevento', 'Bari', 'Palermo'],
}

export const w1075 = [
  holyRomanEmpire[1075],
  kingdomOfSicily,
  byzantineEmpire[1075],
]
