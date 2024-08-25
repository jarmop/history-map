import { Border, Region } from './newTypes'

export const borders: Border[] = [
  {
    id: 1,
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
  {
    id: 2,
    path: [
      [272, 111],
      [242, 161],
      [277, 203],
      [236, 249],
    ],
    startPoint: {
      borderId: 1,
      index: 3,
    },
    endPoint: {
      borderId: 1,
      index: 14,
    },
    startYear: -10,
    endYear: 20,
  },
  {
    id: 3,
    path: [
      [348, 150],
      [290, 140],
    ],
    startPoint: {
      borderId: 1,
      index: 8,
    },
    endPoint: {
      borderId: 2,
      index: 1,
      reverse: true,
    },
    startYear: 2,
    endYear: 17,
  },
  {
    id: 4,
    path: [[328, 96]],
    startPoint: {
      borderId: 1,
      index: 5,
      reverse: false,
    },
    endPoint: {
      borderId: 3,
      index: 0,
    },
    startYear: 5,
    endYear: 10,
  },
]

export const regions: Region[] = [
  {
    id: 1,
    border: {
      borderId: 1,
    },
    dividers: [2],
  },
  {
    id: 2,
    border: {
      borderId: 2,
    },
  },
  {
    id: 3,
    border: {
      borderId: 2,
      reverse: true,
    },
    dividers: [3],
  },
  {
    id: 4,
    border: {
      borderId: 3,
    },
    dividers: [4],
  },
  {
    id: 5,
    border: {
      borderId: 3,
      reverse: true,
    },
  },
  {
    id: 6,
    border: {
      borderId: 4,
    },
  },
  {
    id: 7,
    border: {
      borderId: 4,
      reverse: true,
    },
  },
]
