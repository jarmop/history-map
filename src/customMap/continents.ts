import { latLonByName } from './latLonByName'
import { joinBorders } from './helpers'
import { franceAtlantic, franceMediterranean, iberiaCoast } from './regions'

const europe1: (keyof typeof latLonByName)[] = [
  'Tanais',
  'Mariupol',
  'Henichesk',
  'Kerch',
  'Sevastopol',
  'Yevpatoriya',
  'Olenivka',
  'Krasnoperekopsk',
  'Kherson',
  'Odesa',
  'Varna',
  'Burgas',
  'Rumelifeneri',
  'Istanbul',
  'Tekirdag',
  'Sarkoy',
  'Seddulbahir',
  'Anzak',
  'Kocacesme',
  'Sultanice',
  'Alexandroupoli',
  'Kavala',
  'Stavros',
  'Katounakia',
  'Kalamitsi',
  'Loutra',
  'Thessaloniki',
  'Limenas',
  'Volos',
  'Phthia',
  'Nea Makri',
  'Sounion',
  'Piraeus',
  'Isthmias',
  'Korfos',
  'Mpiseika',
  'Kranidi',
  'Nafplion',
  'Myloi',
  'Myloi',
  'Ariana',
  'Xifias',
  'Eklisia',
  'Korakas',
  'Archangelos',
  'Kokkinia',
  'Trinisa',
  'Gytheio',
  'Kotronas',
  'Kokkinogia',
  'Gerolimenas',
  'Oitylo',
  'Kalamata',
  'Tzanes',
  'Koroni',
  'Methoni',
  'Kyllini',
  'Patras',
  'Corinth',
  'Psatha',
  'Galaxidi',
  'Missolonghi',
  'Butrint',
  'Vlore',
  'Durres',
  'Lezhe',
  'Ulcinj',
  'Bar',
  'Budva',
  'Dubrovnik',
  'Split',
  'Zadar',
  'Senj',
  'Rijeka',
  'Pula',
  'Umag',
  'Trieste',
  'Venice',
  'Ravenna',
  'Ancona',
  'Giulianova',
  'Pescara',
  'Trani',
  'Bari',
  'Monopoli',
  'Brindisi',
  'Otranto',
  'Santa Maria di Leuca',
  'Gallipoli',
  'Taranto',
  'Trebisacce',
  'Ciro Marina',
  'Crotone',
  'Galati',
  'Roghudi',
  'Reggio di Calabria',
  'Cafarone',
  'Sapri',
  'Agropoli',
  'Amalfi',
  'Naples',
  'Antium',
  'Ostia',
  'Santa Severa',
  'Cosa',
  'Populonia',
  'Pisa',
  'Genoa',
  'Savona',
  'Imperia',
  'Ludovico',
]

const europe2: (keyof typeof latLonByName)[] = [
  'Perroquet',
  'Zwin',
  'The Hague',
  'Den Helder',
  'Cuxhaven',
  'Husum',
  'Nordpunkt',
  'Esbjerg',
  'Agger',
  'Hanstholm',
  'Hirtshals',
  'Frederikshavn',
  'Aarhus',
  'Odense',
  'Helsingor',
  'Copenhagen',
  'Lubeck',
  'Stralsund',
  'Gdansk',
  'Kaliningrad',
  'Klaipeda',
  'Ventspils',
  'Riga',
  'Parnu',
  'Haapsalu',
  'Tallinn',
  'Saint Petersburg',
  'Vyborg',
  'Kotka',
  'Helsinki',
  'Hanko',
  'Turku',
  'Uusikaupunki',
  'Rauma',
  'Pori',
  'Narpes',
  'Vaasa',
  'Kokkola',
  'Raahe',
  'Oulu',
  'Olhava',
  'Kemi',
  'Tornio',
  'Tore',
  'Lulea',
  'Pitea',
  'Skelleftea',
  'Bjuroklubb',
  'Umea',
  'Bjasta',
  'Sundsvall',
  'Hudiksvall',
  'Gavle',
  'Osthammar',
  'Norrtalje',
  'Stockholm',
  'Nykoping',
  'Kalmar',
  'Malmo',
  'Halmstad',
  'Gothenburg',
  'Fredrikstad',
  'Oslo',
  'Sandefjord',
  'Kristiansand',
  'Hauge',
  'Bryne',
  'Stavanger',
  'Bergen',
  'Alesund',
  'Trondheim',
  'Bodo',
  'Harstad',
  'Tromso',
  'Hammerfest',
  'Mehamn',
  'Kirkenes',
  'Teriberka',
  'Lumbovka',
  'Mayak',
  'Sosnovka',
  'Strelna',
  'Kandalaksha',
  'Kem',
  'Onega',
  'Arkhangelsk',
  'Tanais',
]

export const europe = joinBorders([
  europe1,
  franceMediterranean,
  iberiaCoast,
  franceAtlantic,
  europe2,
])

export const asia: (keyof typeof latLonByName)[] = [
  'Arkhangelsk',
  'Chizha',
  'Tiksi',
  'Naukan',
  'Ozernovskiy',
  'Manily',
  'Yamsk',
  'Magadan',
  'Okhotks',
  'Chumikan',
  'Makarovka',
  'Koppi',
  'Olga',
  'Nakhodka',
  'Vladivostok',
  'Wonsan',
  'Kosong',
  'Yewon',
  'Pohang',
  'Busan',
  'Mokpo',
  'Incheon',
  'Pyongyang',
  'Dandong',
  'Dalian',
  'Yingkou',
  'Huludao',
  'Qinhuangdao',
  'Qingdao',
  'Shanghai',
  'Taizhou',
  'Quanzhou',
  'Hong Kong',
  'Zhanjiang',
  'Beihai',
  'Haiphong',
  'Vinh',
  'Quang Ngai',
  'Nha Trang',
  'Can Tho',
  'Bangkok',
  'Surat Thani',
  'Kuala Terengganu',
  'Kuantan',
  'Kampung Gambut',
  'Singapore',
  'Muar',
  'Port Dickson',
  'George Town',
  'Alot Setar',
  'Talat Yai',
  'Myeik',
  'Mawlamyine',
  'Chattogram',
  'Digha',
  'Vishakhapatnam',
  'Ongole',
  'Chennai',
  'Puducherry',
  'Nagapattinam',
  'Thoothukudi',
  'Kanniyakumari',
  'Thiruvananthapuram',
  'Kochi',
  'Mumbai',
  'Surat',
  'Diu',
  'Karachi',
  'Gwadar',
  'Chabahar',
  'Kooh',
  'Kolahi',
  'Bandar `Abbas',
  'Mollu',
  'Bushehr',
  'Abadan',
  'Kuwait City',
  'Dammam',
  'Al Mirfa',
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ras Al-Khaimah',
  'Khasab',
  'Sall Ala',
  'Fujairah',
  'Sohar',
  'Muscat',
  'Al Hadd',
  'Ras Madrakah',
  'Salalah',
  'Al Mukalla',
  'Aden',
  'Jeddah',
  'Sharma',
  'Ras Gasabah',
  'Aqaba',
  'Sharm El-Sheikh',
  'Suez',
  'Port Said',
  'Rafah',
  'Gaza',
  'Tel Aviv-Yafo',
  'Haifa',
  'Beirut',
  'Iskenderun',
  'Mersin',
  'Anamur',
  'Alanya',
  'Antalya',
  'Fethiye',
  'Bodrum',
  // "Izmir",
  'Cesme',
  'Babakale',
  'Canakkale',
  'Adatepe',
  'Bandirma',
  // "Bursa",
  'Yalova',
  'Golcuk',
  'Izmit',
  'Gebze',
  'Istanbul',
  'Riva',
  'Sile',
  'Babali',
  'Karasu',
  'Akcakoca',
  'Alapli',
  'Eregli',
  'Zonguldak',
  'Ilyasbey',
  'Ayancik',
  'Sinop',
  'Gerze',
  'Yakakent',
  'Samsun',
  'Trabzon',
  'Rize',
  'Batumi',
  'Sochi',
  'Novorossiysk',
  'Yeysk',
  'Azov',
  'Tanais',
]

export const africa: (keyof typeof latLonByName)[] = [
  'Suez',
  'Djibouti',
  'Tohen',
  'Mogadishu',
  'Mombasa',
  'Nampula',
  'Durban',
  'Gqeberha',
  'Cape Town',
  'Luanda',
  'Lagos',
  'Monrovia',
  'Dakar',
  'Agadir',
  'Essaouira',
  'El Jadida',
  'Casablanca',
  'Rabat',
  'Tangier',
  'Ceuta',
  'Tetouan',
  'Nador',
  'Oran',
  'Algiers',
  'Jijel',
  'Annaba',
  'Carthage',
  'Sousse',
  'Monastir',
  'Chebba',
  'Sfax',
  'Skhira',
  'Gabes',
  'Zuwara',
  'Tripoli',
  'Misrata',
  'Buerat',
  'Sirte',
  'Bin Jawad',
  'Ras Lanuf',
  'Al Uqaylah',
  'Sultan',
  'Benghazi',
  'Al Bayda',
  'Sidi Barrani',
  'Marsa Matruh',
  'Marina El Alamein',
  'Alexandria',
  'Damietta',
  'Port Said',
]

export const europeBorder = europe.map((name) => latLonByName[name])

export const africaBorder = africa.map((name) => latLonByName[name])

export const asiaBorder = asia.map((name) => latLonByName[name])
