import { Border, Connection } from './newTypes'

export function sum(a: number, b: number) {
  return a + b
}

export function sliceBorders(borders: Border[], index: number) {
  let startOfBorder = 0
  let sliceIndex = 0 // relative to the sliced border, 0 means connection point
  const sliceBorderIndex = borders.findIndex((border) => {
    const borderLength = 1 + border.path.length
    if (index >= startOfBorder && index < startOfBorder + borderLength) {
      sliceIndex = index - startOfBorder
      return true
    }
    startOfBorder += borderLength
    return false
  })

  if (sliceIndex === 0) {
    // slice index points to connection so new connections are not needed
    return {
      bordersBefore: borders.slice(0, sliceBorderIndex),
      bordersAfter: borders.slice(sliceBorderIndex),
    }
  }

  const sliceBorder = borders[sliceBorderIndex]
  // sliceIndex 1 means 0 index of the path
  const newConnectionIndex = sliceIndex - 1
  const newConnection = {
    id: 'newConnection',
    point: sliceBorder.path[newConnectionIndex],
  }

  const slice1: Border = {
    ...sliceBorder,
    path: sliceBorder.path.slice(0, newConnectionIndex),
    endPoint: newConnection.id,
  }
  const slice2: Border = {
    ...sliceBorder,
    path: sliceBorder.path.slice(newConnectionIndex + 1),
    startPoint: newConnection.id,
  }

  return {
    bordersBefore: [...borders.slice(0, sliceBorderIndex), slice1],
    bordersAfter: [slice2, ...borders.slice(sliceBorderIndex + 1)],
    newConnection,
  }
}

function getBordersLength(borders: Border[]) { 
  return borders.reduce((acc, curr) => { 
    return acc + 1 + curr.path.length
   }, 0)
}

export function sliceRegion(borders: Border[], start: number, end: number) {
  const result1 = sliceBorders(borders, start)
  // const borders1 = result1[0]
  // const newBorder1 = result1[1][0]
  // const newBorder2 = result1[1][1]

  // const startConnection: Connection = { id: 'start', point: newBorder2.path[0] }
  // newBorder2.path.splice(0, 1)

  // const reminder = [newBorder2, ...result1[2]]

  const newEnd = end - getBordersLength(result1.bordersBefore)

  const result2 = sliceBorders(result1.bordersAfter, newEnd)

  return {
    borders: [result1.bordersBefore, result2.bordersBefore, result2.bordersAfter],
    newConnections: [result1.newConnection, result2.newConnection]
  }

  // const borders2 = result2[0]
  // const newBorder21 = result2[1][0]
  // const newBorder22 = result2[1][1]
  // const borders3 = result2[2]

  // const newBorders = []
  // if (newBorders1.length === 1) {
  // }

  // return [
  //   borders1, // the borders here should be unchanged
  //   [newBorder1, newBorder2], // new connection created between if both have length > 0
  //   borders2, // the borders here should be unchanged
  //   [newBorder21, newBorder22], // new connection created between if both have length > 0
  //   borders3, // the borders here should be unchanged
  // ]
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
