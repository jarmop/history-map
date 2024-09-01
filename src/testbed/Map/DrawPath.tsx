interface DrawPathProps {
  points: number[][]
  mouseXY: number[]
}

export function DrawPath({ points, mouseXY }: DrawPathProps) {
  // Make the endpoint not be exactly mouseXY to not interfere with hover
  const dPoints = [...points, [mouseXY[0] - 1, mouseXY[1]]]
  return <path fill="none" stroke="black" d={`M${dPoints.join(' ')}`} />
}
