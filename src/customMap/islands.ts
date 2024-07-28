import { latLonByName } from "./latLonByName";
import { latLonTupleToXYTuple } from "./helpers";

const mediterraneanIslands: Record<string, (keyof typeof latLonByName)[]> = {
  Corse: ["Ajaccio", "Bonifacio", "Aleria", "Bastia", "Calvi"],
  Crete: [
    "Heraklion",
    "Chania",
    "Kissamos",
    "Gialos",
    "Lerapetra",
    "Kato Zakros",
  ],
  Cyprus: ["Paphos", "Limassol", "Ayja Napa", "Cidilesek", "Poli Crysochous"],
  Mallorca: ["Palma", "Salines", "Agulla", "Vicenc", "Sant_Elm"],
  Sardegna: [
    "Capo Comino",
    "Olbia",
    "Palau",
    "Santa Teresa Gallura",
    "Alghero",
    "Oristano",
    "Portoscuso",
    "Capo Spartivento",
    "Nora",
    "Cagliari",
    "Notteri",
    "Capo Monte Santo",
  ],
  Sicily: [
    "Palermo",
    "Trapani",
    "Marsala",
    "Pozzallo",
    "Syracuse",
    "Catania",
    "Messina",
  ],
};

export const mediterraneanIslandsBorders = Object.values(
  mediterraneanIslands
).map((names) => {
  return names.map((name) => {
    const latLon = latLonByName[name];
    const lat = latLon[0] || 0;
    const lon = latLon[1] || 0;
    return latLonTupleToXYTuple([lat, lon]);
  });
});
