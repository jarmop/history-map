import italy from "./assets/italy.png";

const width = 600;
const height = 800;

const rome = [41.8967, 12.4822];
const venice = [45.4404, 12.316];
const milan = [45.4685, 9.1824];
const genoa = [44.4071, 8.9347];
const florence = [43.77, 11.2577];
const pisa = [43.7228, 10.4018];
const naples = [40.8518, 14.2681];
const palermo = [38.1157, 13.3615];
const syracuse = [37.0754, 15.2867];
const bari = [41.1171, 16.8719];
const livorno = [43.5485, 10.3106];
const trieste = [45.6495, 13.7768];
const ravenna = [44.4184, 12.2035];
const ancona = [43.6071, 13.5102];
const pescara = [42.4618, 14.216];

const cities = [
  rome,
  venice,
  milan,
  genoa,
  florence,
  pisa,
  naples,
  palermo,
  syracuse,
  bari,
];

const romeCoast = [41.745331, 12.23065];

const italyBorder = [
  romeCoast,
  [43.004299, 10.555853],
  livorno,
  [43.97427, 10.155311],
  genoa,
  [44.427972, 8.742658],
  [44.198863, 8.372743],
  [43.880726, 7.98583],
  [43.791253, 7.535056],
  [44.983227, 6.813212],
  [45.760248, 6.898297],
  [47.015428, 12.054105],
  [46.504668, 13.576999],
  trieste,
  [45.786421, 13.512446],
  venice,
  ravenna,
  ancona,
  pescara,
  [41.915541, 15.147966],
  [41.940167, 16.073244],
  [41.878982, 16.17479],
  [41.775331, 16.188018],
  [41.608198, 15.894422],
  [41.43084, 15.993851],
  bari,
  [40.643563, 17.971887],
  [40.134465, 18.508782],
  [39.797787, 18.361235],
  [39.861016, 18.163829],
  [39.984131, 18.014056],
  [40.26942, 17.88829],
  [40.521855, 17.018786],
  [39.717987, 16.493167],
  [39.391975, 17.131443],
  [38.964287, 17.140648],
  [38.757062, 16.556888],
  [38.43725, 16.571196],
  [37.933425, 16.064699],
  [38.041681, 15.635465],
  [38.959954, 16.158717],
  [40.065084, 15.63209],
  naples,
];

// x min = 7, max = 19
// y min = 47 , max = 35
// rome x 13, y 41
const xC = 6;
const yC = 48;

type Coord = {
  x: number;
  y: number;
};

const cxRatio = 46;
const cyRatio = 66;
console.log(cxRatio);
console.log(cyRatio);

function cxToX(cx: number) {
  return (cx - xC) * cxRatio;
}

function cyToY(cy: number) {
  return (yC - cy) * cyRatio;
}

function cityToCoord(city: number[]): Coord {
  const cx = city[1];
  const cy = city[0];
  return { x: cxToX(cx), y: cyToY(cy) };
}

function cityToCoordArr(city: number[]): number[] {
  const cx = city[1];
  const cy = city[0];
  return [cxToX(cx), cyToY(cy)];
}

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
