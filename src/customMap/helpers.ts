import { latLonByName } from "./latLonByName";

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: (keyof typeof latLonByName)[][]) {
  return borders.flatMap((b) => b.slice(1));
}
