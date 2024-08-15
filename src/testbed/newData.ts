import { Border, Connection, Region } from './newTypes'

const connections: Connection[] = [{ id: 'connection1', point: [100, 50] }]

export const connectionById = connections.reduce<Record<string, Connection>>(
  (acc, curr) => {
    acc[curr.id] = curr
    return acc
  },
  {}
)

const borders: Border[] = [
  {
    id: 'border1',
    path: [
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
    startPoint: connections[0].id,
    endPoint: connections[0].id,
  },
]

export const borderById = borders.reduce<Record<string, Border>>(
  (acc, curr) => {
    acc[curr.id] = curr
    return acc
  },
  {}
)

export const regions: Region[] = [
  {
    id: 'region1',
    borderIds: [borders[0].id],
  },
]
