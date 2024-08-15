interface DrawPathProps {
  points: number[][]
  mouseXY: number[]
}
export function DrawPath({ points, mouseXY }: DrawPathProps) {
  const dPoints = [...points, mouseXY]
  return <path fill="none" stroke="black" d={`M${dPoints.join(' ')}`} />
}
