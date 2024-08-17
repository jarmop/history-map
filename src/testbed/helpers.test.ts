import { expect, describe, it } from '@jest/globals'
import { Border } from './newTypes'
import { sliceBorders } from './helpers'
import { getBorderWithLength } from './testHelpers'

describe('sliceBorder', () => {
  it('slices single border', () => {
    const borders: Border[] = [getBorderWithLength(5)]

    const result = sliceBorders(borders, 3)

    expect(result.bordersBefore).toHaveLength(1)
    expect(result.bordersBefore[0].path.length).toEqual(2)
    expect(result.bordersBefore[0].endPoint).toEqual(result.newConnection?.id)
    expect(result.bordersAfter).toHaveLength(1)
    expect(result.bordersAfter[0].path.length).toEqual(2)
    expect(result.bordersAfter[0].startPoint).toEqual(result.newConnection?.id)
  })

  it('slices two borders', () => {
    const borders: Border[] = [getBorderWithLength(3), getBorderWithLength(2)]

    const result = sliceBorders(borders, 2)

    expect(result.bordersBefore).toHaveLength(1)
    expect(result.bordersBefore[0].endPoint).toEqual(result.newConnection?.id)
    expect(result.bordersAfter).toHaveLength(2)
    expect(result.bordersAfter[0].startPoint).toEqual(result.newConnection?.id)
  })

  it('slices three borders', () => {
    const borders: Border[] = [
      getBorderWithLength(3),
      getBorderWithLength(2),
      getBorderWithLength(5),
    ]

    const result = sliceBorders(borders, 9)

    expect(result.bordersBefore).toHaveLength(3)
    expect(result.bordersBefore[2].endPoint).toEqual(result.newConnection?.id)
    expect(result.bordersAfter).toHaveLength(1)
    expect(result.bordersAfter[0].startPoint).toEqual(result.newConnection?.id)
  })

  it('slices three borders at the beginning of one border', () => {
    const borders: Border[] = [
      getBorderWithLength(3),
      getBorderWithLength(2),
      getBorderWithLength(5),
    ]

    const result = sliceBorders(borders, 4)

    expect(result.bordersBefore).toHaveLength(1)
    expect(result.bordersAfter).toHaveLength(2)
    expect(result.newConnection).toBeUndefined()
  })
})
