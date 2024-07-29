import { latLonByName } from "./latLonByName";

const leftLon = -180;
const topLat = 90;

const latLonRatio = 3 / 4;
const lonXRatio = 20;
const latYRatio = lonXRatio / latLonRatio;

export const maxWidth = lonXRatio * 360;
export const maxHeight = latYRatio * 180;

function lonToX(lon: number) {
  return (lon - leftLon) * lonXRatio;
}

function latToY(lat: number) {
  return (topLat - lat) * latYRatio;
}

export function latLonTupleToXYTuple(latLon: number[]): number[] {
  const lat = latLon[0];
  const lon = latLon[1];
  return [lonToX(lon), latToY(lat)];
}

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: (keyof typeof latLonByName)[][]) {
  return borders.flatMap((b) => b.slice(1));
}
