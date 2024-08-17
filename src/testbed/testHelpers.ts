function getPathWithLength(length: number): [number, number][] {
  return Array.from({ length }, () => [1, 1])
}

export function getBorderWithLength(length: number) {
  return {
    id: 'border1',
    path: getPathWithLength(length),
    startPoint: '',
    endPoint: '',
  }
}
