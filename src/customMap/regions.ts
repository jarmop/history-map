import { joinBorders, latLonTupleToXYTuple } from "./helpers";
import { latLonByName } from "./latLonByName";

const pyrenees: (keyof typeof latLonByName)[] = ["Irun", "Cerbere"];

export const iberiaCoast: (keyof typeof latLonByName)[] = [
  "Cerbere",
  "Girona",
  "Barcelona",
  "Tarragona",
  "Valencia",
  "Denia",
  "Alicante",
  "Cartagena",
  "Almeria",
  "Malaga",
  "Gibraltar",
  "Cadiz",
  "Huelva",
  "Faro",
  "Sagres",
  "Zambujeira",
  "Sines",
  "Setubal",
  "Cascais",
  "Peniche",
  "Porto",
  "Vigo",
  "Camarinas",
  "A Coruna",
  "Carino",
  "Foz",
  "Gijon",
  "Comillas",
  "Santander",
  "Sorrozuela",
  "Bilbao",
  "Donostia",
  "Irun",
];

export const iberia = joinBorders([iberiaCoast, pyrenees]).map((name) => {
  return latLonTupleToXYTuple(latLonByName[name]);
});

export const franceMediterranean: (keyof typeof latLonByName)[] = [
  "Ludovico",
  "Nice",
  "Toulon",
  "Marseille",
  "Montpellier",
  "Narbonne",
  "Cerbere",
];

export const franceAtlantic: (keyof typeof latLonByName)[] = [
  "Irun",
  "Bayonne",
  "La Rochelle",
  "Vannes",
  "Quimper",
  "Brest",
  "Lannion",
  "Saint-Brieuc",
  "Saint-Malo",
  "Granville",
  "Flamanville",
  "Cherbourg",
  "Barfleur",
  "Crasville",
  "Utah Beach",
  "Ouistreham",
  "Le Havre",
  "Etretat",
  "Treport",
  "Calais",
  "Dunkirk",
  "Perroquet",
];

const franceEast: (keyof typeof latLonByName)[] = [
  "Perroquet",
  "FranceEast",
  "Basel",
  "Geneva",
  "Montreux",
  "Dolent",
  "Ludovico",
];

export const france = joinBorders([
  franceMediterranean,
  pyrenees.reverse(),
  franceAtlantic,
  franceEast,
]).map((name) => {
  return latLonTupleToXYTuple(latLonByName[name]);
});
