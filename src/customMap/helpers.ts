const xC = 6;
const yC = 48;

export type Coord = {
  x: number;
  y: number;
};

const cxRatio = 46;
const cyRatio = 66;

function cxToX(cx: number) {
  return (cx - xC) * cxRatio;
}

function cyToY(cy: number) {
  return (yC - cy) * cyRatio;
}

export function cityToCoord(city: number[]): Coord {
  const cx = city[1];
  const cy = city[0];
  return { x: cxToX(cx), y: cyToY(cy) };
}

export function cityToCoordArr(city: number[]): number[] {
  const cx = city[1];
  const cy = city[0];
  return [cxToX(cx), cyToY(cy)];
}
