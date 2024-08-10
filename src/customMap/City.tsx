interface CityProps {
  city: number[]
  border: string
}

export function City({ city }: CityProps) {
  const [x, y] = city
  return <circle cx={x} cy={y} r="2" />
}
