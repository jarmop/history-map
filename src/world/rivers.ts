import { getLatLonByName, sliceBorder } from '../customMap/helpers'

export const adige: string[] = [
  'Source of Adige',
  // 'Mals', The true source?
  'Sluderno',
  'Prato Allo Stelvio',
  'Merano',
  // 'Bressanone',
  'Bolzano',
  'Trento',
  'Rovereto',
  'Verona',
  'Zevio',
  "Albaredo d'Adige",
  'Legnago',
  'Badia Polesine',
  'Cavarzere',
  'Mouth of Adige',
]

export const amuDarya: string[] = [
  'Source of Amu Darya',
  // '37.451111, 73.5725',
  '36.690330, 71.862824',
  '36.780461, 71.562785',
  '37.060632, 71.431004',
  '37.926954, 71.584698',
  '38.455940, 70.771555',
  '37.940601, 70.178403',
  '37.526743, 70.167018',
  '37.311318, 68.963439',
  '36.927473, 68.032804',
  '37.691511, 65.326285',
  'Turkmenabat',
  '39.779507, 62.571865',
  '40.976649, 61.996504',
  'Nukus',
  '42.586653, 59.276345',
  '43.196600, 59.129100',
  'Mouth of Amu Darya',
]

export const chenabRiver: string[] = [
  'Source of Chenab River',
  // '32.287182, 77.513752',
  '33.388535, 75.767189', // first big bend start
  '33.342321, 75.721148', // first big bend end
  '32.888936, 74.733488', // gets bigger, less swirling
  '32.225121, 73.396308',
  '31.720704, 72.923523',
  '31.692385, 72.624297',
  'Mouth of Chenab River',
]

export const congoRiver: string[] = [
  'Source of Congo River',
  'Likasi',
  'Kongolo',
  'Kindu',
  'Kisangani',
  'Bumba',
  'Lisala',
  'Makanza',
  'Mbandaka',
  'Bolobo',
  'Kinshasa',
  'Matadi',
  // 'Matadi',
  'Mouth of Congo River',
]

export const danube: string[] = [
  'Donaueschingen',
  // 'Geisingen',
  'Tuttlingen',
  'Sigmaringen',
  'Mengen',
  'Riedlingen',
  'Ehingen an der Donau',
  // 'Erbach',
  'Ulm',
  'Gunzburg',
  // 'Offingen',
  'Lauingen',
  // 'Dillingen',
  'Donauworth',
  'Neuburg',
  'Ingolstadt',
  'Kelheim',
  'Regensburg',
  'Frengkofen',
  'Deggendorf',
  'Linz',
  'Krems',
  'Vienna',
  'Bratislava',
  'Gonyu',
  'Veroce',
  'Vac',
  'Budapest',
  'Mohacs',
  'Vucovar',
  'Novi Sad',
  'Belgrade',
  'Panchevo',
  'Grocka',
  'Smederevo',
  'Kovin',
  'Veliko Gradiste',
  'Golubac',
  // 'Dubova',
  'Orsova',
  'Drobeta-Turnu Severin',
  'Negotin',
  'Vidin',
  'Lom',
  'Corabia',
  'Svishtov',
  'Ruse',
  'Tutrakan',
  'Silistra',
  'Rasova',
  'Cernavoda',
  'Harsova',
  'Braila',
  'Galati',
  'Reni',
  'Cardon',
]

export const dnieper: string[] = [
  //
  'Source of Dnieper',
  'Smolensk',
  'Orsha',
  'Mahilyow',
  'Rahachow',
  'Kyiv',
  'Cherkasy',
  'Kremenchuk',
  'Dnipro',
  'Zaporizhzhia',
  'Nikopol',
  'Nova Kakhovka',
  'Kherson',
  'Mouth of Dnieper',
]

export const dniester: string[] = [
  'Chaicovychi',
  'Sambir',
  'Staryi Sambir',
  'Verkhniy Luzhok',
  'Dnistryk',
  'Source of Dniester', // This starts to go in rounds???
  'Berezyna',
  'Kamyane',
  'Zhuravno',
  'Burshtyn',
  'Khotyn',
  'Novodnistrovsk',
  'Mohyliv-Podilskyi',
  'Yampil',
  'Ribnita',
  'Dubasari',
  'Tiraspol',
  'Mouth of Dniester',
]

export const don: string[] = [
  'Source of Don',
  'Voronezh',
  'Liski',
  'Volgodonsk',
  'Rostov',
  'Mouth of Don',
]

export const elbe: string[] = [
  'Pramen Labe',
  'Spindleruv Mlyn',
  // 'Labska',
  'Vrchlabi',
  // 'Kunice nad Labem',
  // 'Hostinne',
  // 'Nemojov',
  'Jaromer',
  'Hradec Kralove',
  // 'Opatovice nad Labem',
  // 'Sesemice',
  'Pardubice',
  'Prelouc',
  'Kolin',
  'Nymburk',
  'Celakovice',
  'Neratovice',
  'Melnik',
  'Kresice',
  'Lovosice',
  'Usti nad Labem',
  'Povrly',
  'Techlovice',
  'Malsovice',
  'Decin',
  'Muhlgrundbach',
  'Dresden',
  // 'Nunchritz',
  'Riesa',
  // 'Muhlberg',
  'Greudnitz',
  'Elster',
  'Wittenberg',
  // 'Anhalt',
  'Aken',
  'Magdeburg',
  'Ferchland',
  'Tangermunde',
  'Werben',
  'Wittenberge',
  'Hamburg',
  'Stadersand',
  'Brunsbuttel',
  'Cuxhaven',
]

export const ganges: string[] = [
  //
  'Source of Ganges',
  'Kanpur',
  'Prayagraj',
  'Mirzapur',
  'Varanasi',
  'Ballia',
  'Patna',
  'Bhagalpur',
  'Sahibganj',
  'Farakka',
  'Rajshahi',
  'Daulatdia',
  'Chandpur',
  // 'Kolkata',
  'Mouth of Ganges',
]

export const brahmaputra: string[] = [
  'Source of Brahmaputra',
  'Zuobudun',
  'Zhelong',
  'Tangguocun',
  'Lhatse',
  'Xaitongmoin',
  'Nang County',
  'Mainling',
  'Sedongpu',
  'Duoka Village',
  'Lengduo',
  'Gelling',
  'Migging',
  'Boleng',
  'Pasighat',
  'Jorhat',
  'Tezpur',
  'Guwahati',
  'Mouth of Brahmaputra',
  ...sliceBorder(ganges, 'Daulatdia'),
]

export const garonne: string[] = [
  'Source of Garonne',
  'Saint-Gaudens',
  // 'Carbonne',
  'Toulouse',
  'Moissac',
  'Agen',
  // 'Aiguillon',
  'Marmande',
  // 'Langon',
  'Bordeaux',
  'Royan',
]

export const indusRiver: string[] = [
  'Source of Indus River',
  '35.850666, 74.736996',
  // '35.827367, 74.655383',
  '35.429548, 73.198175',
  // '33.908346, 72.235519', // Peshawar junction
  // '33.021098, 71.720938', // joins larger indus stream
  '31.427219, 70.786728', // bend
  // '29.115727, 70.700160', // joins the main indus stream
  'Mouth of Chenab River', // joins the main indus stream
  // 'Lahore',
  'Larkana',
  'Sehwan',
  'Hyderabad (Pakistan)',
  'Mouth of Indus River',
]

export const jordanRiver: string[] = [
  'Source of Jordan River',
  'Mouth of Jordan River',
]

export const kizilirmak: string[] = [
  'Source of Kizilirmak',
  'Mouth of Kizilirmak',
]

export const loire: string[] = [
  'Sources de la Loire',
  // 'Sainte-Eulalie',
  'Rieuford',
  'Pont de la Loire',
  'Issarles',
  'Arlempdes',
  // 'Goudet',
  // 'Coubon',
  'Brives-Charensac',
  'Chadrac',
  'Vorey',
  'Pont de Lignon',
  'Roanne',
  'Digoin',
  // 'Decize',
  'Nevers',
  // 'Briare',
  'Gien',
  'Orleans',
  'Tours',
  'Angers',
  'Nantes',
  'Saint-Nazaire',
]

export const nigerRiver: string[] = [
  //
  'Source of Niger River',
  'Faranah',
  'Kouroussa',
  'Bamako',
  'Mopti',
  'Timbuktu',
  'Gourma Rharous',
  'Bourem',
  'Niamey',
  'Tondi',
  'Jebba',
  'Lokoja',
  'Onitsha',
  'Mouth of Niger River', // splits into two sub streams right before ocean
  'Okumbiri', // beach between the substreams
]

export const nile: string[] = [
  'Source of Nile',
  'Juba',
  'Khartoum',
  'Aswan',
  'Luxor',
  'Cairo',
]

export const raviRiver: string[] = [
  'Source of Ravi River',
  '32.620522, 76.078494',
  '32.615573, 75.922146',
  'Lahore',
  'Mouth of Ravi River',
]

export const rhine: string[] = [
  'Stein am Rhein',
  'Neuhausen am Rheinfall',
  'Eglisau',
  'Waldshut',
  'Bad Sackingen',
  'Basel',
  'Neuenburg am Rhein',
  'Breisach am Rhein',
  // Strasbourg
  'Kehl',
  'Worth am Rhein',
  'Speyer',
  'Mannheim',
  // 'Wiesbaden',
  'Mainz',
  'Bingen am Rhein',
  // 'Rudesheim',
  'Koblenz',
  'Neuwied',
  'Andernach',
  'Bad Honnef am Rhein',
  'Bonn',
  'Cologne',
  'Dusseldorf',
  'Duisburg',
  'Wesel',
  'Nijmegen',
  'Tiel',
  'Zaltbommel',
  'Werkendam',
  'Willemstad',
  'Rockanje',
]

export const meuse: string[] = [
  'Source of Meuse',
  'Verdun',
  'Namur',
  'Liege',
  'Maastricht',
  'Roermond',
  'Venlo',
  ...sliceBorder(rhine, 'Nijmegen'),
]

export const oder: string[] = [
  'Source of Oder',
  'Ostrava',
  'Opole',
  'Wroclaw',
  'Zielona Gora',
  'Frankfurt (Oder)',
  'Szczecin',
  'Mouth of Oder',
]

export const po: string[] = [
  'Source of Po',
  'Saluzzo',
  'Turin',
  'Chivasso',
  'Casale Monferrato',
  'Valenza',
  'Pavia',
  'Placentia',
  'Cremona',
  'Guastalla',
  'Suzzara',
  'Bergantino',
  'Santa Maria Maddalena',
  'Mouth of Po',
]

export const rhone: string[] = [
  'Rhone Glacier',
  'Sion',
  'Martigny',
  'Montreux',
  'Lausanne',
  'Geneva',
  'Valserhone',
  'Seyssel',
  'Belley',
  'Tremurs',
  'Lagnieu',
  'Lyon',
  'Vienne',
  'Valence',
  'Montelimar',
  'Avignon',
  'Arles',
]

export const seine: string[] = [
  'Sources de la Seine',
  // 'Chatillon',
  'Troyes',
  'Paris',
  'Rouen',
  'Le Havre',
]

export const syrDarya: string[] = [
  //'Source of Syr Darya',
  '40.900833, 71.7575', // source (confluence of some rivers)
  '40.816180, 70.990926',
  '40.357547, 70.278855', // mouth to Kairakum Reservoir
  '40.187972, 69.321868',
  '40.213978, 69.164745',
  '40.565783, 69.104002',
  '41.246491, 67.967738', // exiting Shardara Reservoir
  '42.951073, 68.163474',
  '44.835137, 65.492703', // 'Kyzylorda',
  '45.089514, 64.441644',
  '45.751201, 63.779741',
  '45.648789, 61.966498',
  '46.068458, 61.628876',
  '46.154167, 60.873611', // mouth to North Aral

  // 'Mouth of Syr Darya'
]

export const tiber: string[] = [
  'Source of Tiber',
  'Sansepolcro',
  'Perugia',
  'Todi',
  'Baschi Scalo',
  'Passo Corese',
  'Rome',
  'Mouth of Tiber',
]

export const tigris: string[] = [
  //
  'Source of Tigris',
  'Diyarbakir',
  'Batman',
  'Cizre',
  'Mosul',
  'Tikrit',
  "Samarra'",
  'Baghdad',
  'Al Kut',
  'Al `Amarah',
  // 'Mouth of Tigris',
  'Al Qurnah',
  'Al Basrah',
  'Abadan',
]

export const euphrates: string[] = [
  //
  'Source of Euphrates',
  'Keban',
  'Egribuk',
  'Gecitkoy',
  'Kayalar',
  'Jarabulus',
  'Ar Raqqah',
  // 'Madan',
  "Al Qa'im",
  'Hadithah',
  'Ar Ramadi',
  'Al Fallujah',
  'An Najaf',
  'Muthanna',
  'As Samawah',
  'An Nasiriyah',
  // 'Mouth of Euphrates',
  ...sliceBorder(tigris, 'Al Qurnah'),
]

export const vistula: string[] = [
  //
  'Source of Vistula',
  'Krakow',
  'Sandomierz',
  'Warsaw',
  'Plock',
  'Wloclawek',
  'Torun',
  // 'Bygdoszcz',
  // 'Grudziadz',
  // 'Gdansk',
  'Mouth of Vistula',
]

export const vltava: string[] = [
  'Pramen Vltavy',
  'Kvilda',
  'Borova Lada',
  'Horni Vltavice',
  'Lenora',
  'Chlumsky Potok',
  'Vyssi Brod',
  'Parkoviste',
  'Cesky Krumlov',
  'Ceske Budejovice',
  'Prague',
  'Kralupy nad Vltavou',
  'Melnik',
  ...sliceBorder(elbe, 'Melnik'),
]

export const volga: string[] = [
  'Source of Volga',
  'Rzhev',
  'Tver',
  'Dubna',
  'Rybinsk',
  'Yaroslavl',
  'Nizhniy Novgorod',
  'Kazan',
  'Ulyanovsk',
  'Samara',
  'Saratov',
  'Volgograd',
  'Astrakhan',
  'Mouth of Volga',
]

export const yangtse: string[] = [
  //
  'Source of Yangtse',
  'Lijiang',
  'Chongqing',
  'Fengdu County',
  'Yunyang County',
  'Yichang',
  // 'Jingzhou',
  'Yueyang',
  'Wuhan',
  'Jiujiang',
  'Anqing',
  'Chizhou',
  // 'Tongling',
  'Wuhu',
  // 'Maanshan',
  'Nanjing',
  'Zhenjiang',
  'Nantong',
  'Shanghai',
  'Mouth of Yangtse',
]

export const yellowRiver: string[] = [
  //
  'Source of Yellow River',
  'Changna',
  'Jiarihai',
  'Longyang',
  'Lanzhou',
  'Yinchuan',
  'Byannur',
  'Baotou',
  'Yushuwan',
  'Sanmenxia',
  'Zhengzhou',
  'Jiahetan',
  'Jinan',
  'Mouth of Yellow River',
]

export const zambezi: string[] = [
  'Source of Zambezi',
  'Cazombo',
  'Mongu',
  'Livingstone',
  'Kariba',
  'Tete',
  'Mouth of Zambezi',
]

export const rivers = [
  adige,
  amuDarya,
  brahmaputra,
  chenabRiver,
  congoRiver,
  danube,
  dnieper,
  dniester,
  don,
  elbe,
  euphrates,
  ganges,
  garonne,
  indusRiver,
  jordanRiver,
  kizilirmak,
  loire,
  meuse,
  nigerRiver,
  nile,
  oder,
  po,
  raviRiver,
  rhine,
  rhone,
  seine,
  syrDarya,
  tiber,
  tigris,
  vistula,
  vltava,
  volga,
  yangtse,
  yellowRiver,
  zambezi,
].map((river) => river.map(getLatLonByName))
