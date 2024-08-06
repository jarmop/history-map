import { LatLon } from '../world/data'
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

export function getLatLonByName(name: string): LatLon {
  return isLatLonName(name)
    ? (latLonByName[name] as LatLon)
    : (name.split(', ').map((str) => parseFloat(str)) as LatLon)
}

export function toFixedNumber(value: number, digits: number) {
  return parseFloat(value.toFixed(digits))
}
