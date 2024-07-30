import { CustomMap } from "./CustomMap";
import { latLonByName as modernCities } from "./latLonByName";

const latLonByName = {
  ...modernCities,
};

const romeCityNames: (keyof typeof latLonByName)[] = ["Rome"];

const romeCities = romeCityNames.map((name) => latLonByName[name]);

export function Rome() {
  return <CustomMap cities={romeCities} />;
}
