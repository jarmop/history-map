import { getLatLonByName } from '../../../helpers'

export const americasNames: string[] = [
  // 'Portsmouth',
  // 'Boston',
  // 'Quito',
  '32.729486, -117.246801', // San Diego
  '34.027365, -118.522263', // Santa Monica, Los Angeles
  '34.447324, -120.461595',
  '34.577783, -120.646315',
  '35.115103, -120.633768', // Pismo Beach
  '36.304705, -121.892617', // Big Sur
  '37.780984, -122.514020', // San Francisco
  '37.901910, -122.651712', // Stinson Beach
  '37.995369, -123.023430', // Point Reyes Lighthouse
  '38.154539, -122.948775', // Kehoe Beach
  '38.321963, -123.077318',
  '38.354953, -123.067538', // Salmon Creek Beach
  '38.450761, -123.129583', // Jenner
  '38.569761, -123.336056', // Salt Point State Park
  '38.712854, -123.456585',
  '38.918840, -123.727128',
  '38.953601, -123.738644',
  '39.032718, -123.690769',
  '39.348144, -123.826962',
  '39.552415, -123.770014',
  '40.259289, -124.362215',
  '40.437246, -124.410449',
  '40.952965, -124.129624', // McKinleyville
  '42.833434, -124.547106',
  // Portland
  'Astoria',

  '48.359532, -124.722152', // Vancouver
  '50.717420, -128.394388',
  '50.614681, -126.662701',
  '58.292431, -136.675188',
  '59.048584, -138.353252',
  '59.984899, -141.485640',
  '60.456980, -145.737967',
  // Anchorage
  '59.166907, -151.677667',
  '60.456980, -145.737967',
  '52.904514, -168.890758',
  '54.919245, -164.471622',
  '57.584145, -157.795399',
  '58.847918, -157.106394',
  '58.588850, -161.834395',
  '61.547124, -166.060262',
  '68.865993, -166.190467',
  '71.316323, -156.728900',
  '68.975262, -136.330107',
  '70.569389, -128.158723',
  '67.901940, -115.399178', // Kugluktuk
  '67.708547, -113.294745',
  '68.919189, -106.156569',
  '68.066594, -104.247345',
  '67.800883, -98.559538',
  '69.004650, -99.473123',
  '71.797562, -95.288312',
  '73.987887, -95.258841',
  '74.173558, -93.419795',
  '73.893950, -90.131986',
  '72.719159, -92.196871',
  '72.079024, -94.067051',
  '67.217633, -87.327344',
  '69.812258, -85.386590',
  '69.119191, -81.363938',
  '67.421723, -81.187505',
  '62.803123, -92.370375',
  '58.756481, -94.320550',
  '58.760558, -93.207456',
  '57.010829, -92.286666', // York Factory
  '57.253763, -90.723804',
  '54.825998, -82.181109',
  '52.958786, -82.248333',
  '51.170181, -79.837841',
  '52.190169, -78.554915',
  '54.652849, -79.536165',
  '56.165902, -76.650499', // Punngaviapik
  '58.754718, -78.666991',
  '62.309125, -78.120485',
  '62.573063, -77.428990',
  '62.468420, -73.689095',
  '60.807551, -69.351189',
  '59.296470, -69.615771', // Aupaluk
  '58.265829, -67.398613', // mouth of Riviere-Koksoak
  '59.500124, -65.395485',
  '60.495198, -64.668413',
  '53.395560, -55.904063',
  '52.063776, -55.755453',
  '50.246947, -59.968949',
  '50.203721, -66.388689', // Sept-Iles
  '49.218123, -68.150650', // Bail-Comeau
  '48.130623, -69.716242',
  'Quebec City',
  '46.993443, -70.551464',
  '48.617313, -68.220391',
  '49.153531, -66.433988',
  '49.220674, -65.028677',
  '48.856862, -64.204348',
  '48.420501, -64.324440', // Cap-d'Espoir
  '48.002541, -65.334429', // New Carlisle
  '46.228674, -64.553442', // Shedlac
  '45.630945, -62.474464',
  '47.026208, -60.381542',
  '46.013736, -59.703948',
  '43.400854, -65.641615',
  '44.253747, -66.370789',
  '45.358747, -63.378910', // Truro
  'Saint John',
  '43.657749, -70.247758', // Portland
  '42.360810, -71.046162', // Boston
  '42.207132, -70.715581',
  '41.766719, -70.478683', // Sandwich
  '41.803369, -70.007131',
  '42.043436, -70.063057',
  '41.805293, -69.940018',
  '41.680426, -69.947123',
  '41.372618, -71.483720',
  '41.246478, -72.906988', // New Haven
  '40.910082, -73.769374', // New Rochelle
  '41.071093, -71.856294', // Montauk Point
  '40.543495, -73.940096', // Breezy Point Tip, New York
  'Atlantic City',
  // 'Chincoteague',
  // 'Washington',
  'Norfolk',
  'Charleston',
  'Savannah',
  'Jacksonville',
  'West Palm Beach',
  'Fort Lauderdale',
  'Miami',
  'Key West',
  'Tampa',
  'Panama City Beach',
  'New Orleans',
  '27.658023, -97.171458',
  '25.920835, -97.128982',
  '24.459883, -97.704209',
  'Tampico',
  '19.169766, -96.114738', // 'Heroica Veracruz',
  '18.156080, -94.514312',
  '18.614970, -91.872551',
  'Campeche',
  '20.981567, -90.348703',
  // 'Merida',
  '21.600616, -88.158216', // Rio Lagartos
  'Cancun',
  '15.965701, -88.615774', // Punta Manabique
  '15.810292, -84.298040',
  '14.997275, -83.137505', // Cayo Troncoso
  '10.940005, -83.698191', // Mouth of San Juan de Nicaragua
  '8.833942, -81.556179',
  '8.767913, -81.222105',
  '9.606510, -79.609006',
  '9.446483, -78.492245',
  '7.914300, -76.764833', // Apartado
  '10.401812, -75.529106', // 'Cartagena',
  'Barranquilla',
  '12.458326, -71.664584',
  'Caracas',
  '10.535024, -62.764210',
  '5.946868, -57.049234',
  'Paramaribo',
  '4.182563, -51.267248',
  '0.365862, -49.906948',
  // 'Sao Luis',
  '-2.830147, -40.015332',
  '-5.181173, -35.466798',
  'Recife',
  'Salvador',
  '-17.702732, -39.162775',
  '-22.030713, -41.022908',
  '-22.816211, -42.000765',
  'Rio de Janeiro',
  '-23.957831, -46.325140', // Sao Paulo
  '-25.546689, -48.363128', // Curitiba
  '-28.544624, -48.783955',
  // 'Porto Alegre',
  '-32.245320, -52.205024', // Rio Grande
  '-33.098098, -52.609087',
  '-33.756599, -53.386595', // 'Barra del Chuy',
  '-34.405867, -53.777423',
  'La Paloma',
  'Punta del Este',
  'Montevideo',
  'Buenos Aires',
  '-35.427530, -57.127875',
  '-36.861031, -56.652610',
  'Mar del Plata',
  '-39.002221, -61.622742',
  'Bahia Blanca',
  '-39.448242, -62.034206',
  '-40.618381, -62.177307',
  '-42.765725, -63.634327', // Punta Delgada
  '-47.029184, -66.719727',
  '-47.098534, -65.860575',
  '-47.319508, -65.716555',
  '-48.099226, -65.911994',
  '-50.607798, -69.078230',
  '-53.337345, -68.109811',
  '-54.663081, -65.759791',
  '-54.657959, -65.111512',
  '-55.732354, -67.980092',
  '-55.520914, -69.559944',
  '-52.889228, -74.725103',
  '-46.662469, -75.724534',
  '-39.411485, -73.231836',
  '-37.222200, -73.661776',
  '-33.585671, -71.633206',
  '-30.359081, -71.746051',
  '-23.330595, -70.357863',
  '-18.393813, -70.366305',
  '-15.279140, -75.212712',
  // 'Lima',
  '-6.111474, -81.068206',
  '-1.036103, -80.852450',
  '-1.059569, -80.912109',
  '0.782900, -80.083116',
  '3.640988, -77.367014',
  '6.573905, -77.367014',
  '7.990432, -78.412421',
  '8.608256, -78.534423',
  '8.920339, -78.950667',
  'Panama City',
  '7.476160, -79.995208',
  '7.193607, -80.890762',
  '8.094091, -81.742146',
  '8.307905, -82.669774',
  '9.926372, -85.662328',
  '11.054991, -85.702806',
  '12.901565, -87.689537',
  // San Salvador
  '13.973994, -91.349668',
  '15.943538, -93.832411',
  '16.210229, -95.081370',
  '15.649767, -96.302574',
  // 'Acapulco',
  'Manzanillo',
  '20.390946, -105.694070',
  '21.468309, -105.196152',
  '31.117725, -113.126764',
  '31.725456, -114.689588',
  '29.993412, -114.551110',
  // La Paz
  '23.302156, -109.401785',
  '22.874065, -109.927928', // Cabo san Lucas
  '27.789522, -115.010558',
]

export const americas = americasNames.map(getLatLonByName)