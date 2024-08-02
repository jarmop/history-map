import { europe, asia, africa } from '../customMap/continents'
import { joinBorders, sliceBorder } from '../customMap/helpers'
import { mediterraneanIslands } from '../customMap/islands'
import { danube } from './rivers'
import { StateByYear } from './types'

export const byzantineEmpire: StateByYear = {}

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

byzantineEmpire[480] = byzantineEmpire[395]

byzantineEmpire[888] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Burgas', 'Divjake'),
      ['Divjake', 'Prosilia', 'Trikala', 'Petrich', 'Burgas'],
    ]),
    joinBorders([
      sliceBorder(asia, 'Mersin', 'Rize'),
      ['Rize', 'Erzurum', 'Malatya', 'Mersin'],
    ]),
    joinBorders([
      sliceBorder(europe, 'Lezhe', 'Sibenik'),
      ['Sibenik', 'Sinj', 'Shkoder', 'Lezhe'],
    ]),
    joinBorders([
      sliceBorder(europe, 'Termoli', 'Scalea'),
      ['Scalea', 'Potenza', 'Termoli'],
    ]),
  ],
  cities: [
    'Zadar',
    'Venice',
    'Pula',
    'Naples',
    'Terracina',
    'Messina',
    'Istanbul',
    'Athens',
    'Corinth',
    'Izmir',
    'Sinop',
  ],
}

byzantineEmpire[1075] = {
  borders: [
    joinBorders([
      sliceBorder(europe, 'Cardon', 'Rijeka'),
      ['Rijeka', 'Zagreb', 'Belgrade'],
      sliceBorder(danube, 'Belgrade', 'Cardon'),
    ]),
    joinBorders([
      sliceBorder(asia, 'Latakia', 'Rize'),
      [
        'Rize',
        'Gumushane',
        'Kastamonu',
        'Eskisehir',
        'Altintas',
        'Isparta',
        'Karaman',
        'Kahramanmaras',
        'Gaziantep',
        'Latakia',
      ],
    ]),
  ],
  cities: ['Istanbul', 'Athens', 'Corinth', 'Izmir', 'Sinop'],
}
