import { describe, expect, it } from "@jest/globals"
import { getBorderWithLength } from "./testHelpers"
import { sliceRegion } from "./helpers"

describe('sliceRegion', () => {
  it('slice single border BASIC', () => {
    const borders = [getBorderWithLength(12)]

    const result = sliceRegion(borders, 3, 7)

    // console.log(JSON.stringify(result.borders[2]))

    expect(result.borders.length).toEqual(3)
    expect(result.borders[0][0].path.length).toEqual(2)
    expect(result.borders[1][0].path.length).toEqual(3)
    expect(result.borders[2][0].path.length).toEqual(5)
    expect(result.newConnections.length).toEqual(2)
  })
})
