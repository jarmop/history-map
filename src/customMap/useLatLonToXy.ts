export function useLatLonToXy(zoom = 1) {
  const leftLon = 5;
  const topLat = 50;

  // export type Coord = {
  //   x: number;
  //   y: number;
  // };

  const latLonRatio = 3 / 4;
  const lonXRatio = 2 + 8 * zoom;
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

  return function latLonTupleToXYTuple(latLon: number[]): number[] {
    const lat = latLon[0];
    const lon = latLon[1];
    return [lonToX(lon), latToY(lat)];
  };
}
