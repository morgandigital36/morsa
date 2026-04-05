export interface Wirid {
  id: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
  count?: number;
}

export const wiridData: Wirid[] = [
  {
    id: 1,
    title: 'Istighfar',
    arabic: 'أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِيْ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ',
    latin: 'Astaghfirullaahal-\'azhiim, alladzii laa ilaaha illaa huwal hayyul qoyyuumu wa atuubu ilaih',
    translation: 'Aku mohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya.',
    category: 'Wirid Harian',
    count: 3
  },
  {
    id: 2,
    title: 'Tasbih',
    arabic: 'سُبْحَانَ اللهِ',
    latin: 'Subhanallah',
    translation: 'Maha Suci Allah',
    category: 'Wirid Harian',
    count: 33
  },
  {
    id: 3,
    title: 'Tahmid',
    arabic: 'اَلْحَمْدُ ِللهِ',
    latin: 'Alhamdulillah',
    translation: 'Segala puji bagi Allah',
    category: 'Wirid Harian',
    count: 33
  },
  {
    id: 4,
    title: 'Takbir',
    arabic: 'اَللهُ أَكْبَرُ',
    latin: 'Allahu Akbar',
    translation: 'Allah Maha Besar',
    category: 'Wirid Harian',
    count: 33
  },
  {
    id: 5,
    title: 'Tahlil',
    arabic: 'لاَ إِلَهَ إِلاَّ اللهُ',
    latin: 'Laa ilaaha illallah',
    translation: 'Tiada Tuhan selain Allah',
    category: 'Wirid Harian',
    count: 100
  },
  {
    id: 6,
    title: 'Hauqolah',
    arabic: 'لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ الْعَلِيِّ الْعَظِيْمِ',
    latin: 'Laa hawla wa laa quwwata illaa billaahil-\'aliyyil-\'azhiim',
    translation: 'Tiada daya dan kekuatan kecuali dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.',
    category: 'Wirid Harian',
    count: 10
  },
  {
    id: 7,
    title: 'Shalawat Nabi',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allahumma shalli \'alaa sayyidinaa Muhammadin wa \'alaa aali sayyidinaa Muhammad',
    translation: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan kepada keluarga junjungan kami Nabi Muhammad.',
    category: 'Shalawat',
    count: 10
  },
  {
    id: 8,
    title: 'Shalawat Nariyah',
    arabic: 'اَللّٰهُمَّ صَلِّ صَلاَةً كَامِلَةً وَسَلِّمْ سَلاَمًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍنِ الَّذِى تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيْمِ وَعَلَى آلِهِ وَصَحْبِهِ فِى كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُوْمٍ لَكَ',
    latin: 'Allahumma shalli sholaatan kaamillatan wa sallim salaaman taaman \'alaa sayyidinaa Muhammadinin-ladzii tanhallu bihil-\'uqodu wa tanfuriju bihil-kurobu wa tuqdhoo bihil-hawaa-iju wa tunalu bihir-roghoo-ibu wa husnul-khowaa-timi wa yustasqol-ghomaamu biwajhihil kariimi wa \'alaa aalihi wa shohbihi fii kulli lamhatin wa nafasin bi\'adadi kulli ma\'luumin laka',
    translation: 'Ya Allah, limpahkanlah shalawat yang sempurna dan curahkanlah salam yang penuh kepada junjungan kami Nabi Muhammad yang dengan sebab beliau dapat terurai segala kesulitan, dapat terbuka segala kesusahan, dapat terpenuhi segala keperluan, dapat tercapai segala yang diinginkan dan husnul khatimah, dan dengan wajahnya yang mulia dapat diturunkan hujan, dan kepada keluarganya dan sahabatnya, disetiap kedipan mata dan hembusan nafas sebanyak bilangan segala yang Engkau ketahui.',
    category: 'Shalawat',
    count: 11
  },
  {
    id: 9,
    title: 'Shalawat Fatih',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍنِ الْفَاتِحِ لِمَا أُغْلِقَ وَالْخَاتِمِ لِمَا سَبَقَ نَاصِرِ الْحَقِّ بِالْحَقِّ وَالْهَادِى إِلَى صِرَاطِكَ الْمُسْتَقِيْمِ وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيْمِ',
    latin: 'Allahumma shalli \'alaa sayyidinaa Muhammadinin-faatihi limaa ughliqo wal-khaatimi limaa sabaqa naashiril-haqqi bil-haqqi wal-haadii ilaa shiraatikal-mustaqiimi wa \'alaa aalihi haqqa qodrihii wa miqdaarihil-\'azhiim',
    translation: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad pembuka bagi yang tertutup, penutup bagi yang terdahulu, penolong kebenaran dengan kebenaran, dan pemberi petunjuk ke jalan-Mu yang lurus, dan kepada keluarganya sesuai dengan keagungan kedudukan dan kebesarannya.',
    category: 'Shalawat',
    count: 11
  },
  {
    id: 10,
    title: 'Shalawat Ibrahim',
    arabic: 'اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيْمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيْمَ فِى الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ',
    latin: 'Allahumma shalli \'alaa sayyidinaa Muhammadin wa \'alaa aali sayyidinaa Muhammadin kamaa shollaita \'alaa sayyidinaa Ibraahiima wa \'alaa aali sayyidinaa Ibraahiima wa baarik \'alaa sayyidinaa Muhammadin wa \'alaa aali sayyidinaa Muhammadin kamaa baarokta \'alaa sayyidinaa Ibraahiima wa \'alaa aali sayyidinaa Ibraahiima fil-\'aalamiina innaka hamiidun majiid',
    translation: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan kepada keluarga junjungan kami Nabi Muhammad sebagaimana Engkau telah melimpahkan rahmat kepada junjungan kami Nabi Ibrahim dan kepada keluarga junjungan kami Nabi Ibrahim. Dan limpahkanlah berkah kepada junjungan kami Nabi Muhammad dan kepada keluarga junjungan kami Nabi Muhammad sebagaimana Engkau telah melimpahkan berkah kepada junjungan kami Nabi Ibrahim dan kepada keluarga junjungan kami Nabi Ibrahim di seluruh alam. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    category: 'Shalawat',
    count: 1
  },
  {
    id: 11,
    title: 'Asmaul Husna - 99 Nama Allah',
    arabic: 'هُوَ اللهُ الَّذِي لاَ إِلٰهَ إِلاَّ هُوَ الرَّحْمٰنُ الرَّحِيمُ الْمَلِكُ الْقُدُّوسُ السَّلاَمُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ الْغَفَّارُ الْقَهَّارُ الْوَهَّابُ الرَّزَّاقُ الْفَتَّاحُ الْعَلِيمُ الْقَابِضُ الْبَاسِطُ الْخَافِضُ الرَّافِعُ الْمُعِزُّ الْمُذِلُّ السَّمِيعُ الْبَصِيرُ الْحَكَمُ الْعَدْلُ اللَّطِيفُ الْخَبِيرُ الْحَلِيمُ الْعَظِيمُ الْغَفُورُ الشَّكُورُ الْعَلِيُّ الْكَبِيرُ الْحَفِيظُ الْمُقِيتُ الْحَسِيبُ الْجَلِيلُ الْكَرِيمُ الرَّقِيبُ الْمُجِيبُ الْوَاسِعُ الْحَكِيمُ الْوَدُودُ الْمَجِيدُ الْبَاعِثُ الشَّهِيدُ الْحَقُّ الْوَكِيلُ الْقَوِيُّ الْمَتِينُ الْوَلِيُّ الْحَمِيدُ الْمُحْصِي الْمُبْدِئُ الْمُعِيدُ الْمُحْيِي الْمُمِيتُ الْحَيُّ الْقَيُّومُ الْوَاجِدُ الْمَاجِدُ الْوَاحِدُ الصَّمَدُ الْقَادِرُ الْمُقْتَدِرُ الْمُقَدِّمُ الْمُؤَخِّرُ الأَوَّلُ الآخِرُ الظَّاهِرُ الْبَاطِنُ الْوَالِي الْمُتَعَالِي الْبَرُّ التَّوَّابُ الْمُنْتَقِمُ الْعَفُوُّ الرَّءُوفُ مَالِكُ الْمُلْكِ ذُو الْجَلاَلِ وَالإِكْرَامِ الْمُقْسِطُ الْجَامِعُ الْغَنِيُّ الْمُغْنِي الْمَانِعُ الضَّارُّ النَّافِعُ النُّورُ الْهَادِي الْبَدِيعُ الْبَاقِي الْوَارِثُ الرَّشِيدُ الصَّبُورُ',
    latin: 'Huwallahul-ladzi laa ilaaha illa huwar-Rohmaanur-Rohiimul-Malikul-Quddusus-Salaamul-Mu\'minul-Muhaiminul-\'Aziizul-Jabbaarul-Mutakabbirul-Kholiqul-Baari\'ul-Mushowwirul-Ghoffaarul-Qohhaarul-Wahhaabur-Rozzaaqul-Fattaahul-\'Aliimul-Qoobishul-Baasithul-Khoofidlur-Roofi\'ul-Mu\'izzul-Mudzillus-Samii\'ul-Bashiirul-Hakamul-\'Adlul-Lathiiful-Khobirul-Haliimul-\'Azhiimul-Ghofuurusy-Syakuurul-\'Aliyyul-Kabirul-Hafhizhul-Muqiitul-Hasiibul-Jaliilul-Kariimur-Roqiibul-Mujiibul-Waasi\'ul-Hakiimul-Waduudul-Majidul-Baa\'itsus-Syahiidul-Haqqul-Wakiilul-Qowiyyul-Matiinul-Waliyyul-Hamidul-Muhshil-Mubdi\'ul-Mu\'iidul-Muhyil-Mumiitul-Hayyul-Qoyyumul-Waajidil-Maajidul-Waahidush-Shomadol-Qoodirul-Muqtodirul-Muqoddimul-Mu\'akhkhirul-Awwalul-Aakhiruz-Zhoohirul-Baathinul-Waalil-Muta\'aalil-Barrut-Tawwaabul-Muntaqimul-\'Afuwwur-Ro\'uufu Maalikul-Mulki Dzul-Jalaali wal-Ikroomil-Muqsithul-Jaami\'ul-Ghaniyyul-Mughnii-Maani\'udh-Dhoorrun-Naafi\'un-Nuurul-Haadil-Badii\'ul-Baaqil-Waaritsur-Rosyiidul-Shobuur',
    translation: 'Dialah Allah yang tiada Tuhan selain Dia. Yang Maha Pengasih, Maha Penyayang, Maha Raja, Maha Suci, Maha Sejahtera, Maha Mengamankan, Maha Memelihara, Maha Perkasa, Maha Kuasa, Maha Memiliki Keagungan, Maha Pencipta, Maha Mengadakan, Maha Membentuk Rupa, Maha Pengampun, Maha Memaksa, Maha Pemberi, Maha Pemberi Rezeki, Maha Pembuka, Maha Mengetahui, Maha Menyempitkan, Maha Melapangkan, Maha Merendahkan, Maha Meninggikan, Maha Memuliakan, Maha Menghinakan, Maha Mendengar, Maha Melihat, Maha Hakim, Maha Adil, Maha Lembut, Maha Mengetahui Rahasia, Maha Penyantun, Maha Agung, Maha Pengampun, Maha Pembalas Budi, Maha Tinggi, Maha Besar, Maha Memelihara, Maha Memberi Kecukupan, Maha Penghisab, Maha Mulia, Maha Pemurah, Maha Mengawasi, Maha Memperkenankan, Maha Luas, Maha Bijaksana, Maha Mencintai, Maha Mulia, Maha Membangkitkan, Maha Menyaksikan, Maha Benar, Maha Memelihara, Maha Kuat, Maha Kokoh, Maha Melindungi, Maha Terpuji, Maha Menghitung, Maha Mengawali, Maha Mengembalikan, Maha Menghidupkan, Maha Mematikan, Maha Hidup, Maha Berdiri Sendiri, Maha Menemukan, Maha Mulia, Maha Esa, Maha Dibutuhkan, Maha Kuasa, Maha Berkuasa, Maha Mendahulukan, Maha Mengakhirkan, Maha Awal, Maha Akhir, Maha Zhahir, Maha Bathin, Maha Memerintah, Maha Tinggi, Maha Berbuat Baik, Maha Penerima Taubat, Maha Pemberi Balasan, Maha Pemaaf, Maha Pengasih, Penguasa Kerajaan, Yang Mempunyai Keagungan dan Kemuliaan, Maha Pemberi Keadilan, Maha Mengumpulkan, Maha Kaya, Maha Memberi Kekayaan, Maha Mencegah, Yang Memberi Mudarat, Yang Memberi Manfaat, Maha Cahaya, Maha Pemberi Petunjuk, Maha Pencipta yang Indah, Maha Kekal, Maha Pewaris, Maha Menunjuki, Maha Penyabar.',
    category: 'Asmaul Husna',
    count: 1
  },
  {
    id: 12,
    title: 'Ayat Kursi',
    arabic: 'اللَّهُ لاَ إِلَٰهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ ۚ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلاَ يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allahu laa ilaaha illa huwal-hayyul-qoyyuum, laa ta\'khudzuhu sinatuw-walaa naum, lahu maa fissamaawaati wamaa fil-ardh, man dzal-ladzii yasyfa\'u \'indahu illaa bi-idznih, ya\'lamu maa baina aidiihim wamaa kholfahum, walaa yuhiithuuna bisyai\'im-min \'ilmihi illaa bimaa syaa\', wasi\'a kursiyyuhus-samaawaati wal-ardh, walaa ya\'uuduhu hifzhuhumaa, wahuwal-\'aliyyul-\'azhiim',
    translation: 'Allah, tidak ada Tuhan selain Dia. Yang Mahahidup, Yang terus menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar.',
    category: 'Wirid Harian',
    count: 1
  },
  {
    id: 13,
    title: 'Surat Al-Ikhlas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    latin: 'Qul huwallahu ahad. Allahush-shomad. Lam yalid walam yuulad. Walam yakul-lahu kufuwan ahad',
    translation: 'Katakanlah: "Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan, dan tidak ada seorangpun yang setara dengan Dia."',
    category: 'Wirid Harian',
    count: 3
  },
  {
    id: 14,
    title: 'Surat Al-Falaq',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ. مِنْ شَرِّ مَا خَلَقَ. وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ. وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ. وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: 'Qul a\'uudzu birobbil-falaq. Min syarri maa kholaq. Wamin syarri ghosiqin idzaa waqob. Wamin syarrin-naffaatsaati fil-\'uqod. Wamin syarri haasidin idzaa hasad',
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan yang menguasai Shubuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki."',
    category: 'Wirid Harian',
    count: 3
  },
  {
    id: 15,
    title: 'Surat An-Nas',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ. مَلِكِ النَّاسِ. إِلَهِ النَّاسِ. مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ. الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: 'Qul a\'uudzu birobbin-naas. Malikin-naas. Ilaahin-naas. Min syarril-waswaasil-khannaas. Alladzii yuwaswisu fii shuduurin-naas. Minal-jinnati wannaas',
    translation: 'Katakanlah: "Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia."',
    category: 'Wirid Harian',
    count: 3
  },
  {
    id: 16,
    title: 'Dzikir Subhanallahi Wabihamdihi',
    arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيْمِ',
    latin: 'Subhanallahi wabihamdihi subhanallahil-\'azhiim',
    translation: 'Maha Suci Allah, segala puji bagi-Nya. Maha Suci Allah Yang Maha Agung.',
    category: 'Wirid Harian',
    count: 100
  },
  {
    id: 17,
    title: 'La Ilaha Illallah Wahdahu',
    arabic: 'لاَ إِلٰهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin: 'Laa ilaaha illallahu wahdahu laa syariikalahu, lahul-mulku walahul-hamdu wahuwa \'alaa kulli syai\'in qodiir',
    translation: 'Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    category: 'Wirid Harian',
    count: 10
  },
  {
    id: 18,
    title: 'Ratib Al-Haddad',
    arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ. اَلْحَمْدُ للهِ حَمْدًا يُوَافِى نِعَمَهُ وَيُكَافِئُ مَزِيْدَهُ. يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِى لِجَلاَلِ وَجْهِكَ وَلِعَظِيْمِ سُلْطَانِكَ',
    latin: 'Bismillahir-rohmaanir-rohiim. Alhamdulillahi hamdan yuwaafii ni\'amahu wa yukaafi\'u maziidahu. Yaa robbanaa lakal-hamdu kamaa yanbaghii lijalaali wajhika wali\'azhiimi sulthoonik',
    translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah dengan pujian yang sesuai dengan nikmat-nikmat-Nya dan sepadan dengan tambahan-Nya. Ya Tuhan kami, bagi-Mu segala puji sebagaimana layak bagi keagungan wajah-Mu dan kebesaran kekuasaan-Mu.',
    category: 'Ratib',
    count: 1
  },
  {
    id: 19,
    title: 'Hizib Nasr',
    arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ. اَللّٰهُمَّ يَا نُوْرَ النُّوْرِ، يَا مُدَبِّرَ الْاُمُوْرِ، يَا بَاعِثَ مَنْ فِى الْقُبُوْرِ، اَنْتَ اللهُ لاَ إِلٰهَ إِلاَّ اَنْتَ',
    latin: 'Bismillahir-rohmaanir-rohiim. Allahumma yaa nuuron-nuur, yaa mudabbirol-umuur, yaa baa\'itsa man fil-quubuur, antal-laahu laa ilaaha illaa anta',
    translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Ya Allah wahai Cahaya segala cahaya, wahai Pengatur segala urusan, wahai Pembangkit siapa yang ada di dalam kubur, Engkau adalah Allah tiada Tuhan selain Engkau.',
    category: 'Hizib',
    count: 1
  },
  {
    id: 20,
    title: 'Istighotsah',
    arabic: 'يَا اَللهُ يَا رَحْمٰنُ يَا رَحِيْمُ يَا ذَا الْجَلاَلِ وَاْلاِكْرَامِ، اَغِثْنَا اَغِثْنَا اَغِثْنَا، خَلِّصْنَا، اُنْصُرْنَا، اِرْحَمْنَا، اِرْحَمْنَا، اِرْحَمْنَا يَا اَرْحَمَ الرَّاحِمِيْنَ',
    latin: 'Yaa Allaahu yaa Rohmaanu yaa Rohiimu yaa Dzal-Jalaali wal-Ikroom, aghitsnaa aghitsnaa aghitsnaa, khollishnaa, unsurnaa, irhamnaa, irhamnaa, irhamnaa yaa arhamar-roohimiin',
    translation: 'Ya Allah, ya Rahman, ya Rahim, ya Dzat Yang Memiliki Keagungan dan Kemuliaan, tolonglah kami, tolonglah kami, tolonglah kami, lepaskanlah kami, menangkanlah kami, rahmatilah kami, rahmatilah kami, rahmatilah kami wahai Dzat Yang Maha Pengasih dari segala yang pengasih.',
    category: 'Istighotsah & Mujahadah',
    count: 3
  }
];

export const wiridCategories = [
  'Wirid Harian',
  'Shalawat',
  'Asmaul Husna',
  'Istighotsah & Mujahadah',
  'Ratib',
  'Hizib',
  'Manaqib Syekh Abdul Qadir',
  'Dalailul Khairat'
];

export const defaultWiridPresets: Wirid[] = [
  wiridData[1],
  wiridData[2],
  wiridData[3],
  wiridData[4],
  wiridData[6]
];
