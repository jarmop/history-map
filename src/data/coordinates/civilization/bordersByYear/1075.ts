import { europe } from '../../natural/continents/eurasiaAfrica'
import { joinBorders, sliceBorder } from '../../../../helpers'
import { mediterraneanIslands } from '../../natural/islands/islands'
import { byzantineEmpire } from './byzantineEmpire'
import {
  holyRomanEmpire,
  holyRomanEmpireKingdomOfSicily,
} from './holyRomanEmpire'
import { State } from '../../../types'

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
