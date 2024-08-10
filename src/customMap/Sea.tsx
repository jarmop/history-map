interface SeaProps {
  border: number[][]
  fill?: string
}
export function Sea({ border }: SeaProps) {
  return <path fill="lightcyan" d={`M${border.join(' ')} z`} />
}
