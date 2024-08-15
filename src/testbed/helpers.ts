import { Border } from './newTypes'

export function sum(a: number, b: number) {
  return a + b
}

export function sliceBorders(borders: Border[], index: number) {
  let startOfBorder = 0
  let sliceIndex = 0
  const sliceBorderIndex = borders.findIndex((border) => {
    const borderLength = border.path.length
    if (index >= startOfBorder && index < startOfBorder + borderLength) {
      sliceIndex = index - startOfBorder
      return true
    }
    startOfBorder += borderLength
    return false
  })

  const bordersBefore = borders.slice(0, sliceBorderIndex)
  const sliceBorder = borders[sliceBorderIndex]
  const bordersAfter = borders.slice(sliceBorderIndex + 1)

  const slice1 = {...sliceBorder, path: sliceBorder.path.slice(0, sliceIndex)}
  const slice2 = {...sliceBorder, path: sliceBorder.path.slice(sliceIndex)}

  return [bordersBefore, [slice1, slice2], bordersAfter]
}

// function sliceBorders(borders: Border[], start: number, end: number) {
//   // const border1 =
// }

// function splitRegion(
//   borders: Region['borders'],
//   start: number,
//   end: number,
//   divider: Border,
//   borderById: Record<string, Border>
// ) {
//   const regionIndexToSliceIndex: Recort<number, number> { }
//   borders.forEach((borderSlice, i) => {
//     const sliceLength =
//       borderSlice.start === 0 && borderSlice.end === -1
//         ? border.path.length
//         : borderSlice.end - borderSlice.start
//     regionIndexToSliceIndex
//   })
// }

// function splitRegion(
//   borders: Region['borders'],
//   start: number,
//   end: number,
//   divider: Border,
//   borderById: Record<string, Border>
// ) {
//   let startOfBorder = 0
//   // const region1Borders: BorderSlice[] = [{borderId: divider.id, start: 0, end: -1}]
//   const region1Borders: BorderSlice[] = []
//   // const region2Borders: BorderSlice[] = [{borderId: divider.id, start: -1, end: 0}]
//   const region2Borders: BorderSlice[] = []
//   borders.forEach((borderSlice, i) => {
//     const border = borderById[borderSlice.borderId]
//     const sliceLength =
//       borderSlice.start === 0 && borderSlice.end === -1
//         ? border.path.length
//         : borderSlice.end - borderSlice.start
//     const startOfNextBorder = startOfBorder + sliceLength
//     if (startOfBorder < start && start < startOfNextBorder) {
//       region1Borders.unshift({ ...borderSlice, end: start })
//       region2Borders.push({ ...borderSlice, start: start })
//     }
//     startOfBorder = startOfNextBorder
//   })
// }

// function sliceRegion(borders: Region['borders'], start: number, end: number, borderById: Record<string, Border>) {
//   const borderPaths = borders.map((borderData) => {
//     if (isBorderSlice(borderData)) {
//       const border = borderById[borderData.borderId]
//       return sliceBorder(border.path, borderData.start, borderData.end)
//     } else {
//       return borderById[borderData].path
//     }
//   })
//   if (start < end) {
//     const slice: (BorderSlice | Border['id'])[] = []

//     let j = 0
//     for (let i = 0; i < borderPaths.length; i++) {
//       const borderPath = borderPaths[i]
//       if (start < j + borderPath.length) {
//         if (start > j) {
//           // starts with this border
//           const borderData = borders[i]
//           // const borderId = isBorderSlice(borderData) ? borderData.borderId : borderData
//           // const border
//           // if ()
//           // const startBorder = isBorderSlice(borderData)
//           //   ? sliceBorder(borderById[borderData.borderId].path, borderData.start, borderData.end)
//           //   : slice.push(borderData)
//         }
//       }
//     }
//   }
// }
