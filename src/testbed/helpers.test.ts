import { expect, describe, it } from '@jest/globals'
import { Border } from './newTypes'
import { sliceBorders } from './helpers'

function getPathWithLength(length: number): [number, number][] {
  return Array.from({ length }, () => [1, 1])
  // const arr = []
  // for (let i = 0; i < length; i++) {
  //   arr.push
  // }
}

function getBorderWithLength(length: number) { 
  return {
    id: 'border1',
    path: getPathWithLength(length),
    startPoint: '',
    endPoint: '',
  }
}

describe('sliceBorder', () => {
  it('slices single border', () => {
    const borders: Border[] = [
      {
        id: 'border1',
        path: getPathWithLength(5),
        startPoint: '',
        endPoint: '',
      },
    ]

    const result = sliceBorders(borders, 3)

    // console.log(
    //   result.map((borders) => borders.map((border) => border.path.length))
    // )

    expect(result[0]).toHaveLength(0)
    expect(result[1]).toHaveLength(2)
    expect(result[2]).toHaveLength(0)
  })

  it('slices two borders', () => {
    const borders: Border[] = [
      {
        id: 'border1',
        path: getPathWithLength(3),
        startPoint: '',
        endPoint: '',
      },
      {
        id: 'border1',
        path: getPathWithLength(2),
        startPoint: '',
        endPoint: '',
      },
    ]

    const result = sliceBorders(borders, 2)

    expect(result[0]).toHaveLength(0)
    expect(result[1]).toHaveLength(2)
    expect(result[2]).toHaveLength(1)
  })
})
