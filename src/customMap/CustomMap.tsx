import italy from "./italy.png";
import { africaBorder, asiaBorder, europeBorder } from "./continents";
import { mediterraneanIslandsBorders } from "./islands";

const width = 1000;
const height = 1000;

interface CityProps {
  city: number[];
  onClick: () => void;
}

function City({ city, onClick }: CityProps) {
  return <circle cx={city[0]} cy={city[1]} r="1" onClick={onClick} />;
}

interface BorderProps {
  border: number[][];
}

function Border({ border }: BorderProps) {
  return (
    <path
      fill="sandybrown"
      d={`M${border.join(" ")} z`}
      // d={`M${border[0].join(" ")} ${border.slice(1).flat().join(" ")} z`}
    />
  );
}

export function CustomMap() {
  return (
    <div>
      <svg width={width} height={height} style={{ background: "lightcyan" }}>
        {/* <Border border={EurasiaBorder} /> */}
        {/* <Border border={worldCities.map((city) => city.latLon)} /> */}
        <Border border={europeBorder} />
        <Border border={africaBorder} />
        <Border border={asiaBorder} />
        {mediterraneanIslandsBorders.map((border, i) => (
          <Border key={i} border={border} />
        ))}
        {/* <Border border={italyBorder} /> */}
        {/* {italyBorder.map((city) => ( */}
        {/* {worldCities.map((city, i) => (
          <City
            key={i}
            city={city.latLon}
            onClick={() => console.log(city.name)}
          />
        ))} */}
      </svg>
      <img src={italy} alt="italy" width={500} />
    </div>
  );
}
