import { CustomMap } from "./CustomMap";
import { latLonByName as modernCities } from "./latLonByName";

const latLonByName = {
  ...modernCities,
  "Jebel Irhoud": [31.855, -8.8725],
  "Göbekli Tepe": [37.223611, 38.921667],
  Jarmo: [35.555833, 44.930278],
};

const prehistoryNames: (keyof typeof latLonByName)[] = [
  "Jebel Irhoud", // 360k
  "Jericho", // -10k
  "Göbekli Tepe", // -9500 - -8000
  "Jarmo", // -7500 - -5000
];

const prehistory = prehistoryNames.map((name) => latLonByName[name]);

console.log(prehistory);

export function Prehistory() {
  return <CustomMap cities={prehistory} />;
}
