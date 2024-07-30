import { latLonByName } from "./latLonByName";

const veniceCityNames: (keyof typeof latLonByName)[] = [
  "Venice",
  "Treviso", // -1797
  "Padova", // (Padua) 1405-1797
  "Bassano del Grappa", // -1797
  "Vicenza", // -1797
  "Verona", // -1797
  "Brescia", // -1797

  // Overseas
  "Pula", // -1797
  "Zadar", // Zara 1358-1797
  "Split", // Spalato 1358-1797
  "Dubrovnik", // Republic of Ragusa 1205-1358 (lost influence in Treaty of Zadar)
  "Shkoder", // Scutari 1396-1479
  "Kotor", // Cattaro 1420-1797
  "Budva", // 1442/43-1797
  "Bar", // 1442/43-1571
  "Ulcinj", // 1442/43-1571
  "Durres", // Durazzo 1213(?), 1392-1501
  "Butrint", // 1204-1479 (controls Korfu?)
  "Methoni", // 1206-1500
  "Koroni", // 1206-1500
  "Thessaloniki", // 1423-1430
  "Edirne", // (Adrianople) 1212-1247
  // Venetian Albania 1205-1270, 1392-1797
  // Morea Peloponnes 1686 - 1715

  // Islands
  // "Korfu" 1207-1214, 1386-1797
  //   "Kefalonia", // 1386-1572
  // Crete (Candia) 1207-1669/1715
  // Cyprus 1489-1571
  // Euboea (Negroponte) 1209-1470
];

export const veniceCities = veniceCityNames.map((name) => latLonByName[name]);
