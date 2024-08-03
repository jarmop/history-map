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
  'Mouth of Dniester',
  'Cardon',
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
  'Divjake',
  'Durres',
  'Lezhe',
  'Ulcinj',
  'Bar',
  'Budva',
  'Dubrovnik',
  'Split',
  'Sibenik',
  'Zadar',
  'Senj',
  'Rijeka',
  'Pula',
  'Umag',
  'Trieste',
  'Monfalcone',
  'Venice',
  'Mouth of Adige',
  'Mouth of Po',
  'Ravenna',
  'Rimini',
  'Ancona',
  'Giulianova',
  'Pescara',
  'Vasto',
  'Termoli',
  'Vieste',
  'Manfredonia',
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
  'Palumbo',
  'Roghudi',
  'Reggio di Calabria',
  'Cafarone',
  'Amantea',
  'Paola',
  'Scalea',
  'Sapri',
  'Agropoli',
  'Amalfi',
  'Naples',
  'Pozzuoli',
  'Castel Volturno',
  'Minturno',
  'Terracina',
  'San Felice Circeo',
  'Antium',
  'Mouth of Tiber',
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
  'Breskens',
  'The Hague',
  'Den Helder',
  'Norden',
  'Wilhelmshaven',
  'Varel',
  'Bremerhaven',
  'Cuxhaven',
  'Husum',
  'Nordpunkt',
  'Esbjerg',
  'Agger',
  'Hanstholm',
  'Hirtshals',
  'Frederikshavn',
  'Aarhus',
  'Fredericia',
  'Kalundborg',
  'Helsingor',
  'Copenhagen',
  'Nykobing Falster',
  'Svendborg',
  'Middelfart',
  'Flensburg',
  'Kappeln',
  'Eckernforde',
  'Wismar',
  'Stralsund',
  'Mouth of Oder',
  'Wladyslawowo',
  'Gdansk',
  'Mouth of Vistula',
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
  'Mouth of Yellow River',
  'Qingdao',
  // 'Lianyungang',
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
  'Mouth of Ganges',
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
  'Mundra',
  'Karachi',
  'Gwadar',
  'Chabahar',
  'Kooh',
  'Kolahi',
  'Bandar `Abbas',
  'Mollu',
  'Bushehr',
  'Shadegan',
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
  'Umluj',
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
  // 'Tripoli',
  'Latakia',
  'Iskenderun',
  'Mersin',
  'Silifke',
  'Anamur',
  'Gazipasa',
  'Alanya',
  'Antalya',
  'Kumluca',
  'Kas',
  // 'Oludeniz',
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
  'Berenice Troglodytica',
  'Djibouti',
  'Berbera',
  // 'Bosaso',
  'Caluula',
  'Tohen',
  'Mogadishu',
  'Mombasa',
  'Dar es Salaam',
  'Mtwara',
  'Pemba',
  'Nacala',
  'Angoche',
  'Mouth of Zambezi',
  'Beira',
  // 'Vilankulos',
  'Inhambane',
  'Maputo',
  'Richards Bay',
  'Durban',
  'Gqeberha',
  'Cape Town',
  'Mocamedes',
  'Benguela',
  'Luanda',
  'Mouth of Congo River',
  'Okumbiri',
  'Lagos',
  'Monrovia',
  'Dakar',
  'Tiznit',
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
  'Damanhur',
  'Tanta',
  'Cairo',
  'Al Mansurah',
  'Damietta',
  'Port Said',
]

export const europeBorder = europe.map((name) => latLonByName[name])

export const africaBorder = africa.map((name) => latLonByName[name])

export const asiaBorder = asia.map((name) => latLonByName[name])
