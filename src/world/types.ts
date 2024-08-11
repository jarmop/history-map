export type NewPath = {
  start?: { borderId: string; i: number }
  end?: { borderId: string; i: number }
  points: [number, number][]
}
