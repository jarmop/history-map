export function useLatLonToXy(zoom = 1, containerSize: number[]) {
  const leftLon = -180;
  const topLat = 90;
  const lonSize = 360;
  const latSize = 180;

  const [containerX] = containerSize;

  const latLonRatio = 3 / 4;
  const lonXRatio = containerX / (lonSize - zoom);
  const latYRatio = lonXRatio / latLonRatio;

  const totalWidth = lonXRatio * lonSize;
  const totalHeight = latYRatio * latSize;

  function lonToX(lon: number) {
    return (lon - leftLon) * lonXRatio;
  }

  function xToLon(x: number) {
    return x / lonXRatio + leftLon;
  }

  function latToY(lat: number) {
    return (topLat - lat) * latYRatio;
  }

  function yToLat(y: number) {
    return topLat - y / latYRatio;
  }

  function latLonTupleToXYTuple(latLon: number[]): number[] {
    const lat = latLon[0];
    const lon = latLon[1];
    return [lonToX(lon), latToY(lat)];
  }

  function xYTupleToLatLonTuple(xy: number[]): number[] {
    const [x, y] = xy;
    return [yToLat(y), xToLon(x)];
  }

  return {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  };
}
