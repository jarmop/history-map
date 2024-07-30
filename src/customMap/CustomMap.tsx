import italy from "./italy.png";
import { africaBorder, asiaBorder, europeBorder } from "./continents";
import { islandsBorders } from "./islands";
import { veniceCities } from "./venice";
import { useEffect, useRef, useState } from "react";
import { useLatLonToXy } from "./useLatLonToXy";

interface CityProps {
  city: number[];
}

function City({ city }: CityProps) {
  const [x, y] = city;
  return <circle cx={x} cy={y} r="3" />;
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

const aspectRatio = 16 / 9;

export function CustomMap() {
  const [zoom, setZoom] = useState(1);
  const [containerSize, setContainersize] = useState([1, 1]);
  const { latLonTupleToXYTuple, maxWidth, maxHeight } = useLatLonToXy(
    zoom,
    containerSize
  );
  const [isMousedown, setMousedown] = useState(false);
  const [xy, setXy] = useState(latLonTupleToXYTuple([90, -180]));

  const domRef = useRef<HTMLDivElement>(null);

  // const multiplier = 1;
  const width = containerSize[0];
  const height = containerSize[1];

  // console.log("containerSize", containerSize);
  // console.log("width, height", width, height);
  const maxX = width < maxWidth ? maxWidth - width : 0;
  const maxY = height < maxHeight ? maxHeight - height : 0;

  useEffect(() => {
    const width = domRef.current?.offsetWidth || 1;
    setContainersize([width, width / aspectRatio]);
  }, []);

  useEffect(() => {
    function mousedown() {
      setMousedown(true);
    }
    function mousemove(e: MouseEvent) {
      if (isMousedown) {
        // const [dx, dy] = latLonTupleToXYTuple([e.movementX, e.movementY]);
        const [dx, dy] = [e.movementX, e.movementY];
        setXy((xy) => {
          const newX = xy[0] - dx;
          const newY = xy[1] - dy;
          // return [
          //   newX < 0 ? 0 : newX > maxX ? maxX : newX,
          //   newY < 0 ? 0 : newY > maxY ? maxY : newY,
          // ];
          return [newX, newY];
        });
      }
    }
    function mouseup() {
      setMousedown(false);
    }
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    return () => {
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  }, [isMousedown, setXy, maxX, maxY]);

  return (
    <div>
      <div ref={domRef}>
        <div style={{ position: "fixed" }}>
          <button onClick={() => setZoom(zoom + 1)}>+</button>
          <button onClick={() => setZoom(zoom - 1)} disabled={zoom === 1}>
            -
          </button>
        </div>

        <svg
          viewBox={`${xy[0]} ${xy[1]} ${width} ${height}`}
          style={{ background: "lightcyan" }}
        >
          {[europeBorder, africaBorder, asiaBorder, ...islandsBorders].map(
            (border: number[][], i) => (
              <Border
                key={i}
                border={border.map((latlon) => latLonTupleToXYTuple(latlon))}
              />
            )
          )}
          {veniceCities.map((city, i) => (
            <City key={i} city={latLonTupleToXYTuple(city)} />
          ))}
        </svg>
      </div>
      <img src={italy} alt="italy" width={500} />
    </div>
  );
}
