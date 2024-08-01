import { latLonByName, LatLonName } from "./latLonByName";

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: (keyof typeof latLonByName)[][]) {
  return borders.flatMap((b) => b.slice(1));
}

export function sliceBorder(
  latLonNames: LatLonName[],
  start: LatLonName,
  end: LatLonName
) {
  return latLonNames.slice(
    latLonNames.indexOf(start),
    latLonNames.indexOf(end) + 1
  )
}
