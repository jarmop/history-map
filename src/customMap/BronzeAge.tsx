import { CustomMap } from "./CustomMap";
import { latLonByName as modernCities } from "./latLonByName";

const latLonByName = {
  ...modernCities,
};

const bronzeAgeNames: (keyof typeof latLonByName)[] = ["Ur", "Uruk", "Larsa"];

const bronzeAge = bronzeAgeNames.map((name) => latLonByName[name]);

export function BronzeAge() {
  return <CustomMap cities={bronzeAge} />;
}
