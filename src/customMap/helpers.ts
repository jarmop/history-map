import { latLonByName, LatLonName } from './latLonByName'

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: string[][]) {
  return borders.flatMap((b) => b.slice(1))
}

export function sliceBorder(
  latLonNames: string[],
  start: string,
  end?: string
) {
  return end
    ? latLonNames.slice(
        latLonNames.indexOf(start),
        latLonNames.indexOf(end) + 1
      )
    : latLonNames.slice(latLonNames.indexOf(start))
}

function isLatLonName(name: string): name is LatLonName {
  return name in latLonByName
}

export function getLatLonByName(name: string): number[] {
  return isLatLonName(name)
    ? latLonByName[name]
    : name.split(', ').map((str) => parseFloat(str))
}

export function toFixedNumber(value: number, digits: number) {
  return parseFloat(value.toFixed(digits))
}
