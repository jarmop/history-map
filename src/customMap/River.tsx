interface RiverProps {
  river: number[][]
}

export function River({ river }: RiverProps) {
  return (
    <path
      fill="none"
      stroke="lightcyan"
      strokeWidth={2}
      strokeLinejoin="round"
      d={`M${river.join(' ')}`}
    />
  )
}
