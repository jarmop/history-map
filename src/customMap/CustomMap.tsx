import italy from "./italy.png";
import { italyBorder, cities } from "./data";
import { Coord, cityToCoordArr, cityToCoord } from "./helpers";

const width = 600;
const height = 800;

interface CityProps {
  coord: Coord;
}

function City({ coord: { x, y } }: CityProps) {
  return <circle cx={x} cy={y} r="5" />;
}

interface BorderProps {
  border: number[][];
}

function Border({ border }: BorderProps) {
  return (
    <path fill="sandybrown" d={`M${border.map(cityToCoordArr).join(" ")} z`} />
  );
}

export function CustomMap() {
  return (
    <div>
      <svg width={width} height={height} style={{ background: "lightcyan" }}>
        <Border border={italyBorder} />
        {/* {italyBorder.map((city) => ( */}
        {cities.map((city) => (
          <City key={city[0]} coord={cityToCoord(city)} />
        ))}
      </svg>
      <img src={italy} alt="italy" width={500} />
    </div>
  );
}
