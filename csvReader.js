import fs from "node:fs";

fs.readFile("../data/worldcities.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const arr = data.split("\n");
  console.log(arr[0]);
  const row = arr[1].replace(/"/g, "").split(",");
  const obj = { [row[1]]: [row[2], row[3]] };
  console.log(obj);
  //   console.log(arr[1].replace(/"/g, "").split(","));
  //   console.log(arr[1].replace('"', "").split(","));

  const cities = {};
  const populations = {};
  const countries = {};
  const duplicates = [];
  arr.slice(1).forEach((row) => {
    const a = row.replace(/"/g, "").split(",");
    const name = a[1];
    const latLon = [parseFloat(a[2]), parseFloat(a[3])];
    const population = parseInt(a[9]);
    const country = a[6];
    if (cities[name]) {
      duplicates.push(name);
    }

    if (
      !cities[name] ||
      countries[name] === "USA" ||
      (country !== "USA" && population > populations[name])
    ) {
      // if (!cities[name] || a[6] !== "USA") {
      if (name === "Bayonne") {
        console.log(a);
      }
      populations[name] = population;
      countries[name] = country;
      cities[name] = latLon;
      // cities[name] = { latLon, country };
    }
  });

  console.log("duplicates", duplicates.length);

  fs.writeFile(
    "./src/assets/worldcities.json",
    JSON.stringify(cities),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    }
  );
});
