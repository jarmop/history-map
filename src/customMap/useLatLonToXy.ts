export function useLatLonToXy(zoom = 1, containerSize: number[]) {
  const leftLon = -180;
  const topLat = 90;
  const lonSize = 360;
  const latSize = 180;

  const [containerX] = containerSize;

  const latLonRatio = 3 / 4;
  //   const lonXRatio = 0 + 1 * zoom;
  const lonXRatio = (zoom * containerX) / lonSize;
  const latYRatio = lonXRatio / latLonRatio;

  const maxWidth = lonXRatio * lonSize;
  const maxHeight = latYRatio * latSize;

  function lonToX(lon: number) {
    return (lon - leftLon) * lonXRatio;
  }

  function latToY(lat: number) {
    return (topLat - lat) * latYRatio;
  }

  function latLonTupleToXYTuple(latLon: number[]): number[] {
    const lat = latLon[0];
    const lon = latLon[1];
    return [lonToX(lon), latToY(lat)];
  }

  return {
    latLonTupleToXYTuple,
    maxWidth,
    maxHeight,
  };
}
