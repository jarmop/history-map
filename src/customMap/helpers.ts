import { latLonByName } from "./latLonByName";

// const leftLon = -15;
// const topLat = 60;

const leftLon = -180;
const topLat = 90;

// export type Coord = {
//   x: number;
//   y: number;
// };

const latLonRatio = 3 / 4;
const lonXRatio = 10;
const latYRatio = lonXRatio / latLonRatio;

function lonToX(lon: number) {
  return (lon - leftLon) * lonXRatio;
}

function latToY(lat: number) {
  return (topLat - lat) * latYRatio;
}

// export function latLonTupleToCoord(latLon: number[]): Coord {
//   const lat = latLon[0];
//   const lon = latLon[1];
//   return { x: lonToX(lon), y: latToY(lat) };
// }

export function latLonTupleToXYTuple(latLon: number[]): number[] {
  const lat = latLon[0];
  const lon = latLon[1];
  return [lonToX(lon), latToY(lat)];
}

// Remove overlap by slicing off the first item of each border
export function joinBorders(borders: (keyof typeof latLonByName)[][]) {
  return borders.flatMap((b) => b.slice(1));
}
