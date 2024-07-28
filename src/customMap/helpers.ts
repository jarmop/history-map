const leftLon = -15;
const topLat = 60;

export type Coord = {
  x: number;
  y: number;
};

const latLonRatio = 3 / 4;
const lonXRatio = 12;
const latYRatio = lonXRatio / latLonRatio;

function lonToX(lon: number) {
  return (lon - leftLon) * lonXRatio;
}

function latToY(lat: number) {
  return (topLat - lat) * latYRatio;
}

export function latLonTupleToCoord(latLon: number[]): Coord {
  const lat = latLon[0];
  const lon = latLon[1];
  return { x: lonToX(lon), y: latToY(lat) };
}

export function latLonTupleToXYTuple(latLon: number[]): number[] {
  const lat = latLon[0];
  const lon = latLon[1];
  return [lonToX(lon), latToY(lat)];
}
