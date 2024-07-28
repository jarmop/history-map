import { latLonTupleToXYTuple } from "./helpers";

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

const italyCities = [
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

const italyFranceCoast = [43.791253, 7.535056];

const suez = [29.962027, 32.552262];
const eilat = [29.55017, 34.955171];
const rafah = [31.302005, 34.237816];

const Eurasia = {
  italyFranceCoast: italyFranceCoast,
  marseille: [43.301139, 5.364961],
  montpellier: [43.589216, 3.885377],
  narbonneCoast: [43.132443, 3.116872],
  gironaCoast: [41.907145, 3.166089],
  barcelona: [41.379422, 2.171693],
  malaga: [36.714566, -4.423486],
  lisbon: [38.694664, -9.16365],
  santiagoDeCompostela: [42.880007, -8.544075],
  bayonne: [43.492049, -1.492322],
  nantesCoast: [47.045631, -1.978425],
  amsterdam: [52.387852, 4.908314],
  copenhagen: [55.678228, 12.578743],
  bergen: [60.390477, 5.311828],
  kirkenes: [69.725293, 30.052708],
  // need to decrease x from 360 because it extends to the western half
  russiaBering: [65.997749, 360 - 170.51879],
  bangkok: [13.735643, 100.513924],
  muscat: [23.595846, 58.383281],
  aden: [12.84145, 44.992521],
  eilat,
  rafah,
  iskenderun: [36.585607, 36.172578],
  athens: [37.978668, 23.726529],
  trieste,
};

export const EurasiaBorder = Object.values(Eurasia).map(latLonTupleToXYTuple);

export const Africa = {
  mombasa: [-4.047369, 39.671803],
  capetown: [-33.923744, 18.45555],
  douala: [4.032666, 9.726461],
};

const romeCoast = [41.745331, 12.23065];

const italyBorderLatLon = [
  romeCoast,
  [43.004299, 10.555853],
  livorno,
  [43.97427, 10.155311],
  genoa,
  [44.427972, 8.742658],
  [44.198863, 8.372743],
  [43.880726, 7.98583],
  italyFranceCoast,
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

export const italyBorder = italyBorderLatLon.map(latLonTupleToXYTuple);

// export const worldCities = Object.values(cities)
//   .slice(1000, 1010)
//   .map((city) => {
//     // console.log(city);
//     const lat = (city[0] && parseFloat(city[0])) || 0;
//     const lon = (city[1] && parseFloat(city[1])) || 0;
//     return latLonTupleToXYTuple([lat, lon]);
//   });

// console.log(worldCities.length);

// console.log(Object.values(cities).length);
