import { europe } from '../../natural/continents'
import { joinBorders, sliceBorder } from '../../../../helpers'
import { mediterraneanIslands } from '../../natural/islands'
import { byzantineEmpire } from './byzantineEmpire'
import { State } from '../../../types'

const Italy: State = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Terracina', 'Ludovico'),
      ['Ludovico', 'Briancon', 'Aosta', 'Villach', 'Rijeka'],
      sliceBorder(europe, 'Rijeka', 'Vasto'),
      ['Vasto', 'Terracina'],
    ]),
  ],
  cities: ['Milan', 'Rome', 'Ostia', 'Pavia', 'Aquileia', 'Pisa'],
}

const duchyOfBenevento: State = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Vasto', 'Termoli'),
      ['Termoli', 'Potenza', 'Scalea'],
      sliceBorder(europe, 'Scalea', 'Terracina'),
      ['Terracina', 'Vasto'],
    ]),
  ],
  cities: ['Benevento'],
}

const muslimStates: State = {
  borders: Object.values(mediterraneanIslands),
  cities: ['Syracuse'],
}

export const w888 = [
  Italy,
  duchyOfBenevento,
  muslimStates,
  byzantineEmpire[888],
]
