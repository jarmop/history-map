import { Border, Region } from './newTypes'

export const borders: Border[] = [
  {
    id: 'border1',
    path: [
      [100, 50],
      [150, 50],
      [200, 50],
      [250, 50],
      [300, 50],
      [350, 50],
      [400, 50],
      [400, 100],
      [400, 150],
      [400, 200],
      [400, 250],
      [400, 300],
      [350, 300],
      [300, 300],
      [250, 300],
      [200, 300],
      [150, 300],
      [100, 300],
      [100, 250],
      [100, 200],
      [100, 200],
      [100, 150],
      [100, 100],
    ],
  },
]

export const regions: Region[] = [
  {
    id: 'region1',
    border: {
      borderId: 'border1',
    },
  },
]
