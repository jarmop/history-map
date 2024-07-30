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
const maxZoom = 350;

export function CustomMap() {
  const [zoom, setZoom] = useState(1);
  const [containerSize, setContainersize] = useState([1, 1]);
  const {
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
    totalWidth,
    totalHeight,
  } = useLatLonToXy(zoom, containerSize);
  const [isMousedown, setMousedown] = useState(false);
  const [latLon, setLatLon] = useState([90, -180]);
  const [mouseOnZoom, setMouseOnZoom] = useState<
    | {
        clientXY: number[];
        clientLatLon: number[];
      }
    | undefined
  >(undefined);

  const xy = latLonTupleToXYTuple(latLon);

  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mouseOnZoom) {
      return;
    }
    const mouseLatOnZoomDiff = 90 - mouseOnZoom.clientLatLon[0];
    const mouseLatOnZoom = latLon[0] - mouseLatOnZoomDiff;

    const mouseLonOnZoomDiff = mouseOnZoom.clientLatLon[1] + 180;
    const mouseLonOnZoom = latLon[1] + mouseLonOnZoomDiff;
    const mouseXYOnZoom = latLonTupleToXYTuple([
      mouseLatOnZoom,
      mouseLonOnZoom,
    ]);

    const newX = mouseXYOnZoom[0] - mouseOnZoom.clientXY[0];
    const newY = mouseXYOnZoom[1] - mouseOnZoom.clientXY[1];

    const newLatLon = xYTupleToLatLonTuple([newX, newY]);

    setMouseOnZoom(undefined);
    setLatLon(newLatLon);
  }, [latLonTupleToXYTuple, xYTupleToLatLonTuple, setLatLon]);

  const width = containerSize[0];
  const height = containerSize[1];
  const maxX = width < totalWidth ? totalWidth - width : 0;
  const maxY = height < totalHeight ? totalHeight - height : 0;

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
        const [dx, dy] = [e.movementX, e.movementY];
        setLatLon((latLon) => {
          const xy = latLonTupleToXYTuple(latLon);
          const newX = xy[0] - dx;
          const newY = xy[1] - dy;
          return xYTupleToLatLonTuple([newX, newY]);
        });
      }
    }
    function mouseup() {
      setMousedown(false);
    }
    function wheel(e: WheelEvent) {
      e.preventDefault();
      const zoomD = -e.deltaY;
      setMouseOnZoom({
        clientXY: [e.clientX, e.clientY],
        clientLatLon: xYTupleToLatLonTuple([e.clientX, e.clientY]),
      });
      setZoom((zoom) => {
        const newZoom = zoom + zoomD;
        return newZoom > 0 && newZoom <= maxZoom ? newZoom : zoom;
      });
    }
    const dom = domRef.current;
    if (!dom) {
      return;
    }

    dom.addEventListener("mousedown", mousedown);
    dom.addEventListener("mousemove", mousemove);
    dom.addEventListener("mouseup", mouseup);
    dom.addEventListener("wheel", wheel);

    return () => {
      dom.removeEventListener("mousedown", mousedown);
      dom.removeEventListener("mousemove", mousemove);
      dom.removeEventListener("mouseup", mouseup);
      dom.removeEventListener("wheel", wheel);
    };
  }, [
    isMousedown,
    setLatLon,
    maxX,
    maxY,
    latLonTupleToXYTuple,
    xYTupleToLatLonTuple,
  ]);

  return (
    <div>
      <div ref={domRef}>
        {/* <div style={{ position: "fixed" }}>
          <button onClick={() => setZoom(zoom + 1)}>+</button>
          <button onClick={() => setZoom(zoom - 1)} disabled={zoom === 1}>
            -
          </button>
        </div> */}

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
