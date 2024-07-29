import italy from "./italy.png";
import { africaBorder, asiaBorder, europeBorder } from "./continents";
import { islandsBorders } from "./islands";
import { cities } from "./cities";
import { france, iberia } from "./regions";

const width = 1000;
const height = 1000;

interface CityProps {
  city: number[];
}

function City({ city }: CityProps) {
  return <circle cx={city[0]} cy={city[1]} r="2" />;
}

interface BorderProps {
  border: number[][];
}

function Border({ border }: BorderProps) {
  return (
    <path
      fill="lightgrey"
      // stroke="black"
      // strokeWidth={1}
      // strokeLinejoin="round"
      d={`M${border.join(" ")} z`}
      // d={`M${border[0].join(" ")} ${border.slice(1).flat().join(" ")} z`}
    />
  );
}

export function CustomMap() {
  return (
    <div>
      <svg width={width} height={height} style={{ background: "lightcyan" }}>
        <Border border={europeBorder} />
        <Border border={iberia} />
        <Border border={france} />
        <Border border={africaBorder} />
        <Border border={asiaBorder} />
        {islandsBorders.map((border, i) => (
          <Border key={i} border={border} />
        ))}
        {cities.map((city, i) => (
          <City key={i} city={city} />
        ))}
      </svg>
      <img src={italy} alt="italy" width={500} />
    </div>
  );
}
