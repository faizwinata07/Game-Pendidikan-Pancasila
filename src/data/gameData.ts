/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Game Data & Dialogue System for "Lorong Waktu Nusantara: Misi Sidang 1945"
 * Designed for SMA Kelas 11 (Pendidikan Pancasila - Bab 1: BPUPKI & PPKI)
 * Incorporating Culturally Responsive Teaching (CRT) & Discovery Learning.
 */

export interface HistoricalFigure {
  id: string;
  name: string;
  role: string;
  origin: string;
  island: 'Sumatera' | 'Jawa' | 'Sulawesi' | 'Maluku' | 'Bali-NusaTenggara' | 'Kalimantan';
  coordinates: { x: number; y: number }; // Relative percentage for map
  religionOrBackground: string;
  contribution: string;
  crtWisdom: {
    title: string;
    localConcept: string;
    meaning: string;
    pancasilaLink: string;
  };
  quote: string;
  avatarSeed: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  suspicionIncrease: number; // If wrong
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerRole: string;
  speakerSide: 'left' | 'right' | 'center';
  avatarType: 'player' | 'kempeitai' | 'soekarno' | 'hatta' | 'yamin' | 'soepomo' | 'utusanTimur' | 'kibagus';
  text: string;
  historicalContext?: string;
  options?: {
    text: string;
    subtext?: string;
    targetNodeId: string;
    impactScore?: number;
    consequenceDesc?: string;
    isGoldenPath?: boolean;
  }[];
}

export const NUSANTARA_FIGURES: HistoricalFigure[] = [
  {
    id: 'maramis',
    name: 'Mr. Alexander Andries Maramis',
    role: 'Anggota BPUPKI & Panitia Sembilan (Kelompok Nasionalis-Kristen)',
    origin: 'Manado, Sulawesi Utara',
    island: 'Sulawesi',
    coordinates: { x: 74, y: 32 },
    religionOrBackground: 'Kristen Protestan / Ahli Hukum',
    contribution: 'Satu-satunya anggota non-Muslim di Panitia Sembilan yang merumuskan Piagam Jakarta (22 Juni 1945). Bukti nyata bahwa dasar negara dirumuskan secara inklusif lintas keyakinan.',
    crtWisdom: {
      title: 'Falsafah Minahasa',
      localConcept: 'Si Tou Timou Tumou Tou',
      meaning: 'Manusia baru dapat dikatakan manusia sejati jika ia hidup untuk memanusiakan manusia yang lain.',
      pancasilaLink: 'Mencerminkan Sila ke-2 (Kemanusiaan yang Adil dan Beradab) serta semangat inklusivitas antarumat beragama.'
    },
    quote: '"Kemerdekaan ini bukan milik satu golongan saja, melainkan mahligai bersama seluruh suku dari Sabang hingga Merauke."',
    avatarSeed: 'maramis'
  },
  {
    id: 'latuharhary',
    name: 'Mr. Johannes Latuharhary',
    role: 'Anggota BPUPKI & Tokoh Perwakilan Indonesia Timur',
    origin: 'Saparua, Maluku',
    island: 'Maluku',
    coordinates: { x: 86, y: 54 },
    religionOrBackground: 'Kristen Protestan / Tokoh Serikat Ambon',
    contribution: 'Menyuarakan aspirasi masyarakat kepulauan Maluku & Indonesia Timur. Mengingatkan agar bentuk negara tidak menganaktirikan daerah luar Jawa dan menjamin kesetaraan sipil tanpa sekat agama.',
    crtWisdom: {
      title: 'Kearifan Maluku',
      localConcept: 'Pela Gandong & Masohi',
      meaning: 'Ikatan persaudaraan sejati lintas desa Muslim dan Kristen tanpa memandang perbedaan iman, serta tradisi gotong royong saling bantu.',
      pancasilaLink: 'Mendasari Sila ke-3 (Persatuan Indonesia) dan Sila ke-5 (Keadilan Sosial), bahwa persaudaraan mengatasi perbedaan dogma.'
    },
    quote: '"Bagi kami anak Maluku, laut bukanlah pemisah antar pulau, melainkan urat nadi persaudaraan yang merajut tanah tumpah darah."',
    avatarSeed: 'latuharhary'
  },
  {
    id: 'wachidhasyim',
    name: 'K.H. Abdul Wachid Hasyim',
    role: 'Anggota BPUPKI, Panitia Sembilan & Tokoh Utama Nahdlatul Ulama',
    origin: 'Jombang, Jawa Timur',
    island: 'Jawa',
    coordinates: { x: 49, y: 73 },
    religionOrBackground: 'Islam Tradisionalis / Ulama Pesantren Tebuireng',
    contribution: 'Mengedepankan moderasi beragama, menjembatani aspirasi syariat Islam dengan cita-cita negara persatuan kebangsaan. Menyetujui penghapusan 7 kata Piagam Jakarta demi keutuhan NKRI.',
    crtWisdom: {
      title: 'Prinsip Pesantren Nusantara',
      localConcept: 'Ukhuwah Wathaniyah & Tasamuh',
      meaning: 'Persaudaraan sesama anak bangsa setanah air dan sikap toleran lapang dada menghargai perbedaan demi kemaslahatan bersama.',
      pancasilaLink: 'Inti dari Sila ke-1 (Ketuhanan Yang Maha Esa) yang inklusif dan Sila ke-3 (Persatuan Indonesia).'
    },
    quote: '"Membela tanah air adalah bagian dari iman. Demi keselamatan bangsa yang baru lahir, kemaslahatan bersama harus didahulukan."',
    avatarSeed: 'wachid'
  },
  {
    id: 'yamin',
    name: 'Mr. Mohammad Yamin',
    role: 'Pelopor Sidang 1 BPUPKI (29 Mei 1945) & Perintis Sumpah Pemuda',
    origin: 'Sawahlunto, Sumatera Barat',
    island: 'Sumatera',
    coordinates: { x: 19, y: 46 },
    religionOrBackground: 'Budayawan, Sejarawan & Pakar Hukum Minangkabau',
    contribution: 'Menyampaikan pidato monumental 29 Mei 1945 tentang 5 asas dasar negara: Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan, Peri Kerakyatan, dan Kesejahteraan Rakyat.',
    crtWisdom: {
      title: 'Demokrasi Adat Minang',
      localConcept: 'Bulat air dek pambuluah, bulat kato dek mufakat',
      meaning: 'Keputusan bersama harus diambil melalui permusyawaratan yang tulus hingga mencapai kata mufakat, bukan paksaan kekuatan.',
      pancasilaLink: 'Pondasi utama Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan).'
    },
    quote: '"Cita-cita Indonesia Merdeka telah berurat berakar dalam sejarah peradaban Nusantara. Kita menggali mutiara dari bumi kita sendiri."',
    avatarSeed: 'yamin'
  },
  {
    id: 'soepomo',
    name: 'Prof. Dr. Soepomo',
    role: 'Pakar Hukum Adat & Perumus Teori Negara Integralistik (31 Mei 1945)',
    origin: 'Sukoharjo, Jawa Tengah',
    island: 'Jawa',
    coordinates: { x: 44, y: 75 },
    religionOrBackground: 'Ahli Hukum Adat Nusantara',
    contribution: 'Menolak paham individualisme barat dan paham kelas marxis. Mengusulkan negara kesatuan yang bersatu padu dengan seluruh rakyatnya (Staatsidee Integralistik) berlandaskan asas kekeluargaan.',
    crtWisdom: {
      title: 'Falsafah Guyub Jawa',
      localConcept: 'Manunggaling Kawula Gusti & Gotong Royong',
      meaning: 'Penyatuan batin antara pemimpin dan rakyat, di mana negara dipandang sebagai keluarga besar yang saling menjaga tanpa ada yang tertinggal.',
      pancasilaLink: 'Menjiwai Pembukaan UUD 1945 dan Sila ke-5 tentang Keadilan Sosial bagi Seluruh Rakyat Indonesia.'
    },
    quote: '"Negara Indonesia yang kita dirikan adalah negara yang bersatu dengan segenap rakyatnya, mengatasi segala golongan dan perseorangan."',
    avatarSeed: 'soepomo'
  },
  {
    id: 'mariaulfah',
    name: 'Raden Ayu Maria Ulfah Santoso',
    role: 'Anggota BPUPKI & Pejuang Hak Asasi Manusia & Emansipasi Perempuan',
    origin: 'Serang, Banten',
    island: 'Jawa',
    coordinates: { x: 34, y: 71 },
    religionOrBackground: 'Sarjana Hukum Perempuan Pertama Indonesia (Leiden)',
    contribution: 'Gigih memperjuangkan agar pasal-pasal UUD menjamin kesetaraan hak antara pria dan wanita, hak atas kebebasan berserikat, dan perlindungan anak serta buruh.',
    crtWisdom: {
      title: 'Kearifan Sunda & Emansipasi',
      localConcept: 'Silih Asih, Silih Asah, Silih Asuh',
      meaning: 'Saling mengasihi, saling mencerdaskan, dan saling melindungi sesama warga tanpa diskriminasi gender maupun strata sosial.',
      pancasilaLink: 'Pilar kemanusiaan beradab (Sila ke-2) dan keadilan sosial yang setara bagi seluruh rakyat (Sila ke-5).'
    },
    quote: '"Kemerdekaan ini tidak akan sempurna jika setengah dari rakyatnya, yakni kaum perempuan, masih dibelenggu ketidakadilan."',
    avatarSeed: 'maria'
  },
  {
    id: 'kibagus',
    name: 'Ki Bagus Hadikusumo',
    role: 'Anggota BPUPKI, PPKI & Pemimpin Pusat Muhammadiyah',
    origin: 'Yogyakarta',
    island: 'Jawa',
    coordinates: { x: 42, y: 76 },
    religionOrBackground: 'Ulama Pemikir Islam Berkemajuan',
    contribution: 'Sosok sentral dalam lobi bersejarah pagi hari 18 Agustus 1945. Atas ajakan Bung Hatta dan Teuku M. Hasan, beliau rela menghapus 7 kata Piagam Jakarta demi menyelamatkan persatuan Republik.',
    crtWisdom: {
      title: 'Keluhuran Jiwa Kenegaraan',
      localConcept: 'Lapang Dada Berjiwa Besar (Ikhlas Berkorban)',
      meaning: 'Kesediaan meredam ego kelompok demi keselamatan kapal besar bernama Republik Indonesia.',
      pancasilaLink: 'Wujud konkret Pancasila sebagai Meja Statis pemersatu dan Leitstar dinamis penuntun peradaban.'
    },
    quote: '"Bila demi persatuan Indonesia dan keselamatan bangsa ini kita harus bermusyawarah kembali, maka keutuhan Republik adalah amanah suci kita."',
    avatarSeed: 'kibagus'
  },
  {
    id: 'pudja',
    name: 'I Gusti Ketut Pudja',
    role: 'Anggota PPKI & Utusan Sunda Kecil (Bali & Nusa Tenggara)',
    origin: 'Singaraja, Bali',
    island: 'Bali-NusaTenggara',
    coordinates: { x: 57, y: 77 },
    religionOrBackground: 'Hindu / Tokoh Kepulauan Sunda Kecil',
    contribution: 'Menjembatani aspirasi kepulauan timur-selatan Nusantara dalam penetapan wilayah administrasi dan penerimaan dasar negara yang bersendikan kebhinekaan.',
    crtWisdom: {
      title: 'Kearifan Bali',
      localConcept: 'Tri Hita Karana & Tat Twam Asi',
      meaning: 'Harmoni antara manusia dengan Tuhan, sesama manusia, dan alam. "Aku adalah engkau" - menyakiti sesama berarti menyakiti diri sendiri.',
      pancasilaLink: 'Mempertegas nilai kemanusiaan universal dan persatuan kepulauan Nusantara.'
    },
    quote: '"Kekuatan Nusantara terletak pada keberagaman yang harmonis, bagai bunga beraneka rupa dalam satu taman sari kemerdekaan."',
    avatarSeed: 'pudja'
  }
];

export const KEMPEITAI_QUIZZES: QuizQuestion[] = [
  {
    id: 1,
    question: 'Siapakah nama perdana menteri Jepang yang menjanjikan "Kemerdekaan di kemudian hari" kepada bangsa Indonesia pada September 1944, yang memicu dibentuknya Dokuritsu Junbi Cosakai (BPUPKI)?',
    options: [
      { id: 'A', text: 'Jenderal Kuniaki Koiso', isCorrect: true },
      { id: 'B', text: 'Letnan Jenderal Kumakichi Harada', isCorrect: false },
      { id: 'C', text: 'Laksamana Muda Tadashi Maeda', isCorrect: false },
      { id: 'D', text: 'Jenderal Hideki Tojo', isCorrect: false }
    ],
    explanation: 'Pada 7 September 1944 di depan Parlemen Teikoku Gikai, PM Kuniaki Koiso mengumumkan Janji Koiso. Menindaklanjuti janji tersebut di tengah desakan Sekutu, Letjen Kumakichi Harada kemudian mengumumkan pembentukan BPUPKI pada 1 Maret 1945.',
    suspicionIncrease: 25
  },
  {
    id: 2,
    question: 'Pada sidang pertama BPUPKI (29 Mei – 1 Juni 1945), Bung Karno berpidato pada 1 Juni 1945 memperkenalkan lima dasar falsafah negara. Atas petunjuk siapa nama "Pancasila" dipilih?',
    options: [
      { id: 'A', text: 'Atas petunjuk seorang teman ahli bahasa kita', isCorrect: true },
      { id: 'B', text: 'Diambil langsung dari Kitab Negarakertagama karangan Mpu Prapanca', isCorrect: false },
      { id: 'C', text: 'Disarankan langsung oleh Ketua BPUPKI Dr. Radjiman Wedyodiningrat', isCorrect: false },
      { id: 'D', text: 'Diusulkan oleh Mr. Mohammad Yamin dalam naskah tertulisnya', isCorrect: false }
    ],
    explanation: 'Dalam pidatonya 1 Juni 1945, Soekarno menegaskan: "Namanya bukan Panca Dharma, tetapi saya namakan ini dengan petunjuk seorang teman kita ahli bahasa, namanya ialah Pancasila. Sila artinya azas atau dasar, dan di atas kelima dasar itulah kita mendirikan Negara Indonesia yang kekal dan abadi."',
    suspicionIncrease: 25
  },
  {
    id: 3,
    question: 'Panitia Sembilan dibentuk pada masa reses BPUPKI untuk menjembatani perbedaan pendapat antara golongan kebangsaan dan golongan Islam. Dokumen monumental apakah yang mereka hasilkan pada 22 Juni 1945?',
    options: [
      { id: 'A', text: 'Rancangan Piagam Jakarta (Jakarta Charter / Mukaddimah)', isCorrect: true },
      { id: 'B', text: 'Naskah Proklamasi Kemerdekaan Indonesia Otentik', isCorrect: false },
      { id: 'C', text: 'Maklumat Pemerintah No. X tentang Multi-Partai', isCorrect: false },
      { id: 'D', text: 'Dekrit Presiden tentang Pemberlakuan Kembali UUD 1945', isCorrect: false }
    ],
    explanation: 'Pada 22 Juni 1945 di Jalan Pegangsaan Timur 56, Panitia Sembilan menyepakati naskah preambule yang oleh Mr. Muh. Yamin dijuluki "Piagam Jakarta". Naskah inilah yang memuat rumusan lima dasar negara pertama yang disepakati secara formal.',
    suspicionIncrease: 30
  }
];

export const ASSEMBLY_DIALOGUES: Record<string, DialogueNode> = {
  // START OF STAGE 3
  'intro_assembly': {
    id: 'intro_assembly',
    speaker: 'Detektif Sejarah (Pemain)',
    speakerRole: 'Wartawan Muda Menyamar - Koran Asia Raja',
    speakerSide: 'left',
    avatarType: 'player',
    text: 'Kita berhasil menembus penjagaan Kempeitai dan masuk ke Gedung Chuo Sangi In (sekarang Gedung Pancasila di Pejambon)! Hawa ruangan ini begitu khidmat. Para pendiri bangsa sedang berdiskusi panas mengenai pondasi tumpah darah Nusantara.',
    historicalContext: 'Gedung Chuo Sangi In (Pejambon, Jakarta), Mei - Juli 1945. Di ruangan ini 67 anggota BPUPKI sedang merumuskan jiwa bangsa.',
    options: [
      {
        text: 'Dengarkan perdebatan pokok mengenai dasar negara di meja depan',
        subtext: 'Bung Karno dan Prof. Soepomo sedang membedah struktur kedaulatan',
        targetNodeId: 'debate_foundations'
      }
    ]
  },

  'debate_foundations': {
    id: 'debate_foundations',
    speaker: 'Prof. Dr. Soepomo',
    speakerRole: 'Pakar Hukum Adat & Perumus Asas Integralistik',
    speakerSide: 'right',
    avatarType: 'soepomo',
    text: 'Saudara-saudara sekalian! Jika kita hendak mendirikan negara Indonesia yang sejati, kita tidak boleh meniru individualisme Barat di mana rakyat saling bersaing berebut hak pribadi. Kita juga menolak negara kelas komunis! Negara kita haruslah Negara Integralistik—negara kekeluargaan di mana pemimpin dan rakyat bersatu padu laksana badan dan jiwa!',
    historicalContext: 'Pidato Soepomo 31 Mei 1945 tentang Teori Negara Integralistik yang berakar pada hukum adat gotong royong.',
    options: [
      {
        text: 'Ajukan pandangan: "Bagaimana menjamin hak-hak kepulauan di luar Jawa dalam negara integralistik ini, Prof?"',
        subtext: 'Membawa wawasan kepulauan & desentralisasi yang adil',
        targetNodeId: 'soepomo_response_inclusive',
        impactScore: 10
      },
      {
        text: 'Beri catatan: "Apakah model integralistik tidak berisiko menjadi otoriter jika kekuasaan terpusat mutlak?"',
        subtext: 'Menyoroti pentingnya pembatasan kekuasaan dan hak asasi warga',
        targetNodeId: 'maria_ulfah_supports',
        impactScore: 10
      }
    ]
  },

  'soepomo_response_inclusive': {
    id: 'soepomo_response_inclusive',
    speaker: 'Prof. Dr. Soepomo',
    speakerRole: 'Pakar Hukum Adat',
    speakerSide: 'right',
    avatarType: 'soepomo',
    text: 'Pertanyaan tajam dari jurnalis muda! Negara kekeluargaan tidak memusatkan hak pada satu pulau atau satu golongan saja. Dalam masyarakat adat kita, keadilan didasarkan pada rasa kebersamaan. Tiap daerah kepulauan dari Sabang sampai Merauke harus diakui keaslian dan martabat budayanya!',
    options: [
      {
        text: 'Lanjutkan mendengarkan pidato Bung Karno tentang dasar filosofis (Philosofische Grondslag)',
        targetNodeId: 'soekarno_address'
      }
    ]
  },

  'maria_ulfah_supports': {
    id: 'maria_ulfah_supports',
    speaker: 'Mr. Mohammad Yamin',
    speakerRole: 'Pelopor Sidang 1 BPUPKI',
    speakerSide: 'right',
    avatarType: 'yamin',
    text: 'Wartawan muda itu benar! Itulah mengapa saya dan kawan-kawan mengusulkan peri kemanusiaan dan kedaulatan rakyat. Negara harus menjamin perlindungan hukum dan hak berserikat bagi seluruh tumpah darah, bukan menindas kebebasan individu demi dogma negara semata!',
    options: [
      {
        text: 'Lanjutkan mendengarkan pidato Bung Karno tentang Pancasila',
        targetNodeId: 'soekarno_address'
      }
    ]
  },

  'soekarno_address': {
    id: 'soekarno_address',
    speaker: 'Ir. Soekarno',
    speakerRole: 'Ketua Panitia Sembilan / Proklamator',
    speakerSide: 'center',
    avatarType: 'soekarno',
    text: 'Saudara-saudara! Apakah yang kita cari? Suatu Philosofische Grondslag—suatu fundamen, filsafat, jiwa, hasrat sedalam-dalamnya untuk di atasnya didirikan gedung Indonesia Merdeka yang kekal dan abadi! Dasar itu bukan didatangkan dari langit Eropa atau gurun asing. Dasar itu kita gali dari bumi Indonesia sendiri: Gotong Royong! Jikalau saya peras lima sila itu menjadi satu, maka dapatlah saya satu perkataan Indonesia yang tulen: Gotong Royong!',
    historicalContext: 'Pidato 1 Juni 1945: Lahirnya Pancasila. Soekarno memeras lima sila menjadi Trisila lalu Ekasila (Gotong Royong).',
    options: [
      {
        text: 'Kagumi visi gotong royong ini dan bersiap melompat ke fase krusial pasca-proklamasi!',
        targetNodeId: 'warp_to_august_18'
      }
    ]
  },

  // THE CLIMAX: 18 AUGUST 1945 MORNING
  'warp_to_august_18': {
    id: 'warp_to_august_18',
    speaker: 'Detektif Sejarah (Pemain)',
    speakerRole: 'Alat Detektor Waktu Bergetar Kencang!',
    speakerSide: 'left',
    avatarType: 'player',
    text: 'PERINGATAN WAKTU! Detektor waktu berbunyi nyaring! Kita telah melompat ke tanggal 18 AGUSTUS 1945, pukul 07.30 WIB di Pejambon—hanya sehari setelah Proklamasi 17 Agustus dibacakan. Suasana sangat tegang di sudut serambi sidang PPKI. Bung Hatta tampak berdiri cemas berbicara dengan seorang perwira.',
    historicalContext: 'Pagi 18 Agustus 1945: Titik genting penentuan nasib Piagam Jakarta sebelum sidang pleno PPKI mengesahkan UUD.',
    options: [
      {
        text: 'Dekati Bung Hatta dengan tenang untuk mencari tahu ancaman paradoks sejarah!',
        targetNodeId: 'hatta_emergency_meeting'
      }
    ]
  },

  'hatta_emergency_meeting': {
    id: 'hatta_emergency_meeting',
    speaker: 'Drs. Mohammad Hatta',
    speakerRole: 'Wakil Ketua PPKI & Negosiator Ulung Bangsa',
    speakerSide: 'right',
    avatarType: 'hatta',
    text: 'Ah, Saudara wartawan! Syukurlah kau di sini. Kita menghadapi ujian persatuan paling gawat dalam hitungan menit! Kemarin sore, seorang opsir Angkatan Laut Jepang (Kaigun) dan utusan dari wilayah Indonesia Timur—wilayah yang didominasi saudara kita beragama Kristen dan Katolik—datang menyampaikan pesan tegas.',
    historicalContext: 'Pemberitahuan Opsir Kaigun kepada Hatta tanggal 17 Agustus malam mengenai keberatan para pemimpin Indonesia Timur.',
    options: [
      {
        text: '"Pesan apakah itu Bung Hatta? Mengapa situasi terlihat begitu genting?"',
        targetNodeId: 'eastern_delegate_protest'
      }
    ]
  },

  'eastern_delegate_protest': {
    id: 'eastern_delegate_protest',
    speaker: 'Utusan Indonesia Bagian Timur',
    speakerRole: 'Perwakilan Maluku, Sulawesi & Kepulauan Nusa Tenggara',
    speakerSide: 'center',
    avatarType: 'utusanTimur',
    text: 'Bung Hatta! Jika kalimat dalam Piagam Jakarta itu tetap berbunyi: "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya", maka kami merasa didiskriminasikan dalam Republik yang baru merdeka! Rakyat Maluku, Minahasa, Bali, Timor, dan kepulauan timur lainnya merasa dianggap warga kelas dua! Jika kalimat ini dipaksakan, lebih baik kami berdiri sendiri di luar Republik Indonesia!',
    historicalContext: 'Fakta sejarah: Keberatan atas 7 kata Piagam Jakarta mengancam terjadinya disintegrasi wilayah timur sebelum Republik resmi terbentuk.',
    options: [
      {
        text: '"Bung Hatta, apa langkah yang sedang Anda rencanakan menghadapi keberatan ini?"',
        targetNodeId: 'hatta_seeks_advice'
      }
    ]
  },

  'hatta_seeks_advice': {
    id: 'hatta_seeks_advice',
    speaker: 'Drs. Mohammad Hatta',
    speakerRole: 'Wakil Ketua PPKI',
    speakerSide: 'right',
    avatarType: 'hatta',
    text: 'Rancangan pembukaan UUD ini sudah disepakati Panitia Sembilan berbulan-bulan lalu. Para tokoh Islam seperti Ki Bagus Hadikusumo, Wahid Hasyim, dan Kasman Singodimedjo telah berjuang keras untuk 7 kata tersebut. Namun jika wilayah timur memisahkan diri, Republik yang baru berumur satu hari ini akan pecah dan mudah dihancurkan kembali oleh Belanda yang sedang membonceng Sekutu! Saudara wartawan... menurut naluri kebangsaanmu, apa saranmu?',
    options: [
      {
        text: 'PILIHAN A: "Pertahankan 7 kata itu, Bung! Mayoritas rakyat Indonesia adalah Muslim, golongan minoritas harus patuh pada mayoritas!"',
        subtext: 'Menolak kompromi & mengedepankan ego kelompok (Akan memicu perpecahan)',
        targetNodeId: 'branch_bad_refusal',
        impactScore: -50,
        consequenceDesc: 'Mendorong Bung Hatta menolak tuntutan utusan timur.',
        isGoldenPath: false
      },
      {
        text: 'PILIHAN B (REKOMENDASI): "Dengarkan suara saudara kita! Usulkan kepada Bung Hatta untuk melobi Ki Bagus Hadikusumo menggantinya menjadi: \'Ketuhanan Yang Maha Esa\' demi keutuhan segenap bangsa!"',
        subtext: 'Mengedepankan musyawarah, toleransi luhur, dan persatuan tumpah darah Nusantara',
        targetNodeId: 'branch_golden_compromise',
        impactScore: 100,
        consequenceDesc: 'Mendukung lobi kebangsaan 15 menit yang menyelamatkan Republik Indonesia.',
        isGoldenPath: true
      }
    ]
  },

  // BRANCH A: BAD ROUTE
  'branch_bad_refusal': {
    id: 'branch_bad_refusal',
    speaker: 'Utusan Indonesia Bagian Timur',
    speakerRole: 'Utusan Kepulauan Timur Terpukul',
    speakerSide: 'center',
    avatarType: 'utusanTimur',
    text: 'Jika demikian sikap kalian terhadap kami yang sama-sama berdarah Nusantara, maka sia-sialah perjuangan kita bersama mengusir penjajah! Kami menyatakan menarik diri dari Republik Indonesia! Kepulauan Maluku, Minahasa, dan Nusa Tenggara akan menentukan nasibnya sendiri!',
    options: [
      {
        text: 'Lihat dampak fatal keputusan ini terhadap garis waktu sejarah!',
        targetNodeId: 'to_bad_ending'
      }
    ]
  },

  'to_bad_ending': {
    id: 'to_bad_ending',
    speaker: 'Detektif Sejarah (Pemain)',
    speakerRole: 'ALARM PARADOKS WAKTU TINGKAT MERAH!',
    speakerSide: 'left',
    avatarType: 'player',
    text: 'TIDAK! Garis waktu retak! Karena ketiadaan kompromi, Indonesia Timur memisahkan diri. Saat tentara NICA/Sekutu mendarat, mereka dengan mudah memecah belah pulau-pulau yang terpisah. Republik Indonesia yang kita kenal hari ini sirna dari peta bumi...',
    options: [
      {
        text: 'Buka Arsip Paradoks Waktu (Bad Ending)',
        targetNodeId: 'bad_ending_screen'
      }
    ]
  },

  // BRANCH B: GOLDEN ROUTE (HISTORICAL TRUTH)
  'branch_golden_compromise': {
    id: 'branch_golden_compromise',
    speaker: 'Drs. Mohammad Hatta',
    speakerRole: 'Wakil Ketua PPKI',
    speakerSide: 'right',
    avatarType: 'hatta',
    text: 'Tepat sekali bisikan nuranimu, wahai anak muda! Bangsa ini didirikan bukan untuk satu golongan, melainkan untuk seluruh tumpah darah Indonesia! Saya akan segera menemui Ki Bagus Hadikusumo, Kasman Singodimedjo, Wahid Hasyim, dan Teuku M. Hasan sebelum sidang pleno dibuka pukul 08.00 pagi!',
    options: [
      {
        text: 'Saksikan musyawarah 15 menit Bung Hatta bersama Ki Bagus Hadikusumo',
        targetNodeId: 'kibagus_compromise_scene'
      }
    ]
  },

  'kibagus_compromise_scene': {
    id: 'kibagus_compromise_scene',
    speaker: 'Ki Bagus Hadikusumo',
    speakerRole: 'Tokoh Utama Pemimpin Islam / PP Muhammadiyah',
    speakerSide: 'right',
    avatarType: 'kibagus',
    text: 'Bung Hatta dan Saudara Hasan telah menjelaskan dengan gamblang betapa gentingnya nasib kemerdekaan kita. Demi persatuan tanah air dan persaudaraan kita dengan saudara-saudara dari timur... dengan ikhlas dan lapang dada lillahi ta\'ala, kami setujui 7 kata itu diganti dengan: "Ketuhanan Yang Maha Esa". Kalimat ini tetap menegaskan ketauhidan sekaligus menaungi seluruh umat beragama di Nusantara!',
    historicalContext: 'Lobi 15 menit tanggal 18 Agustus 1945 pagi adalah tonggak kenegarawanan terbesar dalam sejarah konstitusi modern Indonesia.',
    options: [
      {
        text: 'Dengarkan palu sidang Bung Karno mengetuk pengesahan Pembukaan UUD 1945!',
        targetNodeId: 'gavel_ratification'
      }
    ]
  },

  'gavel_ratification': {
    id: 'gavel_ratification',
    speaker: 'Ir. Soekarno',
    speakerRole: 'Presiden Republik Indonesia Pertama',
    speakerSide: 'center',
    avatarType: 'soekarno',
    text: '*TOK! TOK! TOK! (Palu sidang diketukkan)*\nDengan disepakatinya rumusan Pancasila dan Pembukaan Undang-Undang Dasar 1945, serta ditetapkannya Presiden dan Wakil Presiden, maka berdirilah Negara Kesatuan Republik Indonesia yang merdeka, bersatu, berdaulat, adil, dan makmur! MERDEKA!',
    options: [
      {
        text: 'Saksikan Kemenangan Sejarah & Refleksi Gotong Royong (Golden Ending)',
        targetNodeId: 'golden_ending_screen'
      }
    ]
  }
};

export interface ImagePromptItem {
  id: string;
  title: string;
  stage: string;
  aspectRatio: string;
  prompt: string;
  negativePrompt: string;
  canvaUsage: string;
}

export const AI_IMAGE_PROMPTS: ImagePromptItem[] = [
  {
    id: 'prompt-stage1',
    title: 'Peta Interaktif Kepulauan Nusantara 1945',
    stage: 'Tahap 1: Orientasi Peta Nusantara & CRT',
    aspectRatio: '16:9',
    prompt: 'Vintage archival cartography map of Indonesian Archipelago archipelago in 1945, aged parchment paper texture, sepia and warm ochre tones, intricate compass rose, vintage ocean currents lines, glowing brass pins on Sumatra, Java, Sulawesi, Maluku, Bali, labeled with elegant Dutch-Indonesian typography "Peta Tokoh Pendiri Bangsa BPUPKI", cinematic historical atmosphere, photorealistic antique document style, 8k resolution.',
    negativePrompt: 'modern digital interface, neon glowing cyberpunk, low quality, cartoon, blurry, distorted geography, futuristic holograms.',
    canvaUsage: 'Gunakan sebagai background hero peta interaktif di Canva atau slide pembuka presentasi kelompok.'
  },
  {
    id: 'prompt-stage2',
    title: 'Pos Penjagaan Kempeitai Malam Hari Pejambon',
    stage: 'Tahap 2: Kuis Penyelidikan & Interogasi',
    aspectRatio: '16:9',
    prompt: 'A tense checkpoint in Batavia Jakarta 1945 outside colonial stone building Chuo Sangi In Pejambon at twilight, Japanese Kempeitai military officer in authentic World War II uniform holding an interrogation clipboard, vintage military spotlight casting dramatic shadows, a young Indonesian undercover journalist in vintage safari outfit holding a leather notebook, film noir lighting, cinematic historical drama, mist and vintage lamppost, hyper-detailed, photorealistic.',
    negativePrompt: 'anime, 3d render, modern cars, neon signs, lowres, deformed hands, smiling faces, anachronistic gear.',
    canvaUsage: 'Cocok untuk latar belakang kartu pertanyaan kuis interogasi dan modul investigasi siswa.'
  },
  {
    id: 'prompt-stage3a',
    title: 'Ruang Sidang BPUPKI Gedung Pejambon 1945',
    stage: 'Tahap 3: Simulasi Sidang BPUPKI & Landasan Negara',
    aspectRatio: '16:9',
    prompt: 'Interior of the historic Chuo Sangi In council hall Pejambon Jakarta in May 1945, dignified Indonesian founding fathers in vintage peci and colonial linen suits seated on curved wooden benches, Soekarno delivering an impassioned speech at the central wooden rostrum, warm sunlight filtering through high colonial arched windows with dust motes, rich mahogany wood textures, authentic sepia documentary aesthetic, emotional gravitas, 8k.',
    negativePrompt: 'modern suits, microphones on pedestals, plastic furniture, flat 2d illustration, blurry faces, low contrast.',
    canvaUsage: 'Gunakan sebagai latar belakang dialog Bung Karno, Prof. Soepomo, dan Mr. Muh. Yamin.'
  },
  {
    id: 'prompt-stage3b',
    title: 'Momen Genting Serambi Sidang PPKI 18 Agustus 1945',
    stage: 'Tahap 3: Klimaks 7 Kata Piagam Jakarta',
    aspectRatio: '16:9',
    prompt: 'Historical tense diplomatic gathering on the veranda corridor of colonial Pejambon building on early morning August 18 1945, Mohammad Hatta in round spectacles and crisp white safari suit leaning in earnest discussion with Ki Bagus Hadikusumo in traditional Javanese blangkon and surjan, accompanied by delegates from Eastern Indonesia in vintage attire, solemn dramatic expressions of high-stakes consensus, morning golden sunbeams, authentic documentary realism.',
    negativePrompt: 'smiling tourists, modern smartphones, vibrant neon colors, bad anatomy, cartoon caricature.',
    canvaUsage: 'Sangat ideal untuk visualisasi saat siswa dihadapkan pada tombol pilihan branching Bung Hatta.'
  },
  {
    id: 'prompt-golden-ending',
    title: 'Fajar Konsensus Luhur: Pancasila Pemersatu Bangsa',
    stage: 'Tahap 4: Golden Ending & Refleksi Gotong Royong',
    aspectRatio: '16:9',
    prompt: 'Triumphant and majestic historical tableau of Indonesian founding fathers standing united inside the ratified council hall on August 18 1945, Soekarno and Hatta proudly smiling, diverse delegates from Sumatra, Java, Maluku, Sulawesi, and Bali embracing with deep mutual respect, an ethereal golden crest of Garuda Pancasila glowing softly above the hall symbolizing eternal unity in diversity (Bhinneka Tunggal Ika), warm cinematic morning light, uplifting national pride, ultra-realistic painting style.',
    negativePrompt: 'conflict, weapons, sadness, dark gloomy tone, disfigured faces, cartoon style.',
    canvaUsage: 'Jadikan banner utama sertifikat kelulusan "Detektif Sejarah" dan poster dinding kelas.'
  },
  {
    id: 'prompt-bad-ending',
    title: 'Paradoks Garis Waktu: Perpecahan Nusantara',
    stage: 'Tahap 4: Bad Ending (Timeline Paradox)',
    aspectRatio: '16:9',
    prompt: 'A surreal dystopian temporal fracture scene, 1945 historical Batavia building cracking into floating temporal shards, an old map of Indonesia burning and disintegrating into isolated island fragments surrounded by dark stormy temporal vortex, red warning glitch anomalies, dramatic atmospheric disaster lighting, poignant historical tragedy of failed consensus, high cinematic fantasy drama.',
    negativePrompt: 'cheerful happy atmosphere, bright sunny day, comedy, low quality.',
    canvaUsage: 'Visualisasi peringatan konsekuensi jika egoisme mengalahkan musyawarah untuk mufakat.'
  }
];

export const REFLECTION_ANALOGY = {
  title: 'Gotong Royong 1945 di Hadapan Banjir Pemukiman Hari Ini',
  concept: 'Culturally Responsive Teaching (CRT) Contextualization',
  story: `Tahukah kamu? Semangat kerelaan berkorban para bapak bangsa pada pagi hari 18 Agustus 1945 bukanlah dongeng masa lalu yang usang di buku teks. Jiwa itu mengalir langsung dalam darah masyarakat kita hari ini!

Bayangkan ketika musibah banjir musiman merendam pemukiman warga di lingkunganmu:
Air bah setinggi satu meter tidak pernah menanyakan apa suku, agama, atau bahasa ibu orang yang rumahnya terendam. 

Di saat darurat itu, warga yang rumahnya berlantai dua seketika membuka pintu lebar-lebar menampung keluarga tetangga yang kedinginan. Ibu-ibu di posko darurat balai RW segera menyalakan kompor bersama, menanak nasi dan membagi mi instan hangat tanpa pernah memperdebatkan siapa pemeluk agama apa. Pemuda-pemuda menerjang derasnya arus banjir dengan ban dalam dan perahu karet untuk mengevakuasi balita dan kakek-nenek.

Itulah wujud paling murni dari Pancasila:
Sila ke-1 menuntun welas asih kemanusiaan di hadapan Tuhan Yang Maha Esa;
Sila ke-2 menggerakkan empati menolong sesama yang menderita;
Sila ke-3 meluruhkan sekat perbedaan menjadi satu rumpun keluarga tumpah darah;
Sila ke-4 menghidupkan musyawarah cepat di posko warga menentukan pembagian logistik;
Dan Sila ke-5 memastikan tak ada seorang pun warga yang dibiarkan kelaparan di tengah musibah.

Sebagaimana Ki Bagus Hadikusumo, K.H. Wahid Hasyim, Mr. Kasman Singodimedjo, dan para tokoh Islam berlapang dada merelakan 7 kata demi merangkul saudara-saudara dari kawasan timur Nusantara, kita pun diajak untuk meredam ego pribadi demi keselamatan dan keharmonisan bersama di sekolah, rumah, dan masyarakat.`
};
