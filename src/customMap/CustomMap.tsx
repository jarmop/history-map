import italy from "./italy.png";
import { africaBorder, asiaBorder, europeBorder } from "./continents";
import { islandsBorders } from "./islands";
import { cities } from "./cities";
import { france, iberia } from "./regions";
import { veniceCities } from "./venice";
import { useLatLonToXy } from "./useLatLonToXy";
import { useState } from "react";

const width = 1000;
const height = 1000;

interface CityProps {
  city: number[];
}

function City({ city }: CityProps) {
  const [x, y] = city;
  return <circle cx={x} cy={y} r="2" />;
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
  const [zoom, setZoom] = useState(1);

  return (
    <div>
      <div style={{ position: "fixed" }}>
        <button onClick={() => setZoom(zoom + 1)}>+</button>
        <button onClick={() => setZoom(zoom - 1)} disabled={zoom === 1}>
          -
        </button>
      </div>

      <svg
        // width={width}
        // width={"auto"}
        // height={height}
        // height={"auto"}
        // viewBox={`0 0 ${width} ${height}`}
        viewBox={`0 0 4000 4000`}
        style={{ background: "lightcyan" }}
      >
        <Border border={europeBorder} />
        {/* <Border border={iberia} /> */}
        {/* <Border border={france} /> */}
        <Border border={africaBorder} />
        <Border border={asiaBorder} />
        {islandsBorders.map((border, i) => (
          <Border key={i} border={border} />
        ))}
        {veniceCities.map((city, i) => (
          <City key={i} city={city} />
        ))}
      </svg>
      <img src={italy} alt="italy" width={500} />
    </div>
  );
}
