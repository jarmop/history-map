import { europe } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { mediterraneanIslands } from '../customMap/islands'
import { LatLonName } from '../customMap/latLonByName'
import { State } from './types'

const westMiddle: LatLonName[] = [
  'Perroquet',
  'Zelzate',
  'Saint-Quentin',
  /* 'Rethel', */ 'Dijon',
  'Lyon',
  'Saint-Etienne',
  'Nimes',
  'Montpellier',
]

const middleEast: LatLonName[] = [
  'Varel',
  'Veendam',
  'Almelo',
  'Deventer',
  'Nijmegen',
  'Duisburg',
  'Dusseldorf',
  'Mannheim',
  'Karlsruhe',
  'Lucerne',
  'Bolzano',
  'Villach',
  'Rijeka',
]

const franciaOccidentalis: State = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Montpellier', 'Barcelona'),
      ['Barcelona', 'Huesca', 'Logrono', 'Donostia'],
      sliceBorder(europe, 'Donostia', 'Saint-Nazaire'),
      ['Saint-Nazaire', 'Rennes', 'Saint-Malo'],
      sliceBorder(europe, 'Saint-Malo', 'Perroquet'),
      westMiddle,
    ]),
  ],
  cities: ['Paris', 'Montpellier', 'Toulouse', 'Lyon'],
}

const franciaMedia: State = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Terracina', 'Montpellier'),
      westMiddle.reverse(),
      sliceBorder(europe, 'Perroquet', 'Varel'),
      middleEast,
      sliceBorder(europe, 'Rijeka', 'Vasto'),
      ['Vasto', 'Terracina'],
    ]),
    mediterraneanIslands.Corse,
  ],
  cities: ['Aachen', 'Rome', 'Ostia', 'Marseille'],
}

const franciaOrientalis: State = {
  borders: [
    joinBorders([
      middleEast.reverse(),
      sliceBorder(europe, 'Varel', 'Husum'),
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
    ]),
  ],
  cities: ['Verden', 'Fulda', 'Augsburg'],
}

export const w843 = [franciaOccidentalis, franciaMedia, franciaOrientalis]
