import { BorderSlice, LatLon, Path } from './data/data'
import { latLonByName, LatLonName } from './data/coordinates/latLonByName'

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: string[][]) {
  return borders.flatMap((b) => b.slice(1))
}

// export function sliceBorder(
//   latLonNames: string[],
//   start: string,
//   end?: string
// ) {
//   return end
//     ? latLonNames.slice(
//         latLonNames.indexOf(start),
//         latLonNames.indexOf(end) + 1
//       )
//     : latLonNames.slice(latLonNames.indexOf(start))
// }

export function sliceBorder(path: Path, start: number, end: number) {
  if (start < end) {
    return path.slice(start, end + 1)
  } else {
    // return path.toReversed().slice(end, start + 1)
    return path.slice(end, start + 1).reverse()
  }
}

function isLatLonName(name: string): name is LatLonName {
  return name in latLonByName
}

export function getLatLonByName(name: string): LatLon {
  return isLatLonName(name)
    ? (latLonByName[name] as LatLon)
    : (name.split(', ').map((str) => parseFloat(str)) as LatLon)
}

export function toFixedNumber(value: number, digits: number) {
  return parseFloat(value.toFixed(digits))
}

export function isEqualPoint(p1: [number, number], p2: [number, number]) {
  return p1[0] === p2[0] && p1[1] === p2[1]
}

export function isBorderSlice(border: unknown): border is BorderSlice {
  // eslint-disable-next-line no-prototype-builtins
  return (border as BorderSlice).hasOwnProperty('borderId')
}
