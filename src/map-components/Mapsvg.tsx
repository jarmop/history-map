import { mapPath } from "./mapPath";

export function Mapsvg() {
  return (
    <svg
      version="1.1"
      // width="300"
      // height="200"
      width="4378.13"
      height="2434.94"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={mapPath}
        fill="#bcbcbc"
        // stroke="blue"
        // strokeWidth={10}
        onClick={(e) => console.log(e)}
      />
      {/* <rect width="100%" height="100%" fill="red" /> */}

      <circle cx="150" cy="100" r="80" fill="green" />

      <text x="150" y="125" fontSize="60" textAnchor="middle" fill="white">
        SVG
      </text>
    </svg>
  );
}
