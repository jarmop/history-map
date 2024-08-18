import { Border, Region } from './newTypes'

export const borders: Border[] = [
  {
    id: 'border1',
    path: [
      [100, 50],
      [100, 100],
      [100, 150],
      [100, 200],
      [100, 200],
      [100, 250],
      [100, 300],
      [150, 300],
      [200, 300],
      [250, 300],
      [300, 300],
      [350, 300],
      [400, 300],
      [400, 250],
      [400, 200],
      [400, 150],
      [400, 100],
      [400, 50],
      [350, 50],
      [300, 50],
      [250, 50],
      [200, 50],
      [150, 50],
    ],
  },
  {
    id: 'border2',
    path: [
      [211, 219],
      [301, 159],
    ],
    startPoint: {
      borderId: 'border1',
      index: 2,
    },
    endPoint: {
      borderId: 'border1',
      index: 14,
    },
  },
]

export const regions: Region[] = [
  {
    id: 'region1',
    borders: [
      {
        borderId: 'border1',
      },
    ],
  },
  {
    id: 'region2',
    borders: [
      {
        borderId: 'border2',
      },
    ],
  },
  {
    id: 'region3',
    borders: [
      {
        borderId: 'border2',
        reverse: true,
      },
    ],
  },
]
