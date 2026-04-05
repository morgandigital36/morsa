export interface Doa {
  id: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
}

export const doaData: Doa[] = [
  {
    id: 1,
    title: 'Doa Bangun Tidur',
    arabic: 'اَلْحَمْدُ ِللهِ الَّذِىْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latin: 'Alhamdulillahil-ladzii ahyaanaa ba\'da maa amaatanaa wa ilaihin-nusyuur',
    translation: 'Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (membangunkan dari tidur) dan hanya kepada-Nya kami kembali.',
    category: 'Keseharian'
  },
  {
    id: 2,
    title: 'Doa Masuk Kamar Mandi',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُبِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: 'Allaahumma innii a\'uudzubika minal khubutsi wal khabaa-its',
    translation: 'Ya Allah, aku berlindung pada-Mu dari godaan setan laki-laki dan setan perempuan.',
    category: 'Keseharian'
  },
  {
    id: 3,
    title: 'Doa Keluar Kamar Mandi',
    arabic: 'غُفْرَانَكَ اَلْحَمْدُ ِللهِ الَّذِىْ أَذْهَبَ عَنِّى الْأَذَى وَعَافَانِىْ',
    latin: 'Ghufroonaka alhamdulillahil-ladzii adzhaba \'annil adzaa wa \'aafaanii',
    translation: 'Aku mohon ampun kepada-Mu. Segala puji bagi Allah yang telah menghilangkan penderitaan daripadaku dan telah memberiku kesehatan.',
    category: 'Keseharian'
  },
  {
    id: 4,
    title: 'Doa Sebelum Wudhu',
    arabic: 'نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ اْلاَصْغَرِ فَرْضًا ِللهِ تَعَالَى',
    latin: 'Nawaitul whudu-a lirof\'il hadatsii ashghori fardhon lillaahi ta\'aala',
    translation: 'Saya niat berwudhu untuk menghilangkan hadast kecil fardu (wajib) karena Allah ta\'ala.',
    category: 'Wudhu'
  },
  {
    id: 5,
    title: 'Doa Sesudah Wudhu',
    arabic: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ. اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ',
    latin: 'Asyhadu allaa ilaaha illalloohu wahdahu laa syariikalahu wa asyhadu anna Muhammadan \'abduhu wa rosuuluhu. Allaahummaj\'alnii minat-tawwaabiina waj\'alnii minal-mutathohhiriin',
    translation: 'Aku bersaksi, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, dan aku mengaku bahwa sesungguhnya Nabi Muhammad itu adalah hamba dan Utusan Allah. Ya Allah, jadikanlah aku dari golongan orang-orang yang bertaubat dan jadikanlah aku dari golongan orang-orang yang suci.',
    category: 'Wudhu'
  },
  {
    id: 6,
    title: 'Doa Sebelum Makan',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma baarik lanaa fiimaa rozaqtanaa waqinaa \'adzaa bannaar',
    translation: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.',
    category: 'Keseharian'
  },
  {
    id: 7,
    title: 'Doa Sesudah Makan',
    arabic: 'اَلْحَمْدُ ِللهِ الَّذِىْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ',
    latin: 'Alhamdulillahil-ladzii ath\'amanaa wasaqoonaa waja\'alanaa minal-muslimiin',
    translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami termasuk dari orang-orang yang muslim.',
    category: 'Keseharian'
  },
  {
    id: 8,
    title: 'Doa Sebelum Belajar',
    arabic: 'رَبِّ زِدْنِىْ عِلْمًا وَارْزُقْنِىْ فَهْمًا',
    latin: 'Robbi zidnii \'ilman warzuqnii fahmaa',
    translation: 'Ya Allah, tambahkanlah kepadaku ilmu dan berikanlah aku pengertian yang baik.',
    category: 'Ilmu'
  },
  {
    id: 9,
    title: 'Doa Sesudah Belajar',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْتَوْدِعُكَ مَا قَرَأْتُ وَمَا حَفِظْتُ فَرُدَّهُ إِلَيَّ عِنْدَ حَاجَتِيْ إِلَيْهِ',
    latin: 'Allahumma innii astaudi\'uka maa qoro\'tu wamaa hafiztu faruddahu ilayya \'inda haajatii ilayhi',
    translation: 'Ya Allah, sesungguhnya aku menitipkan kepada Engkau apa yang telah aku baca dan aku hafalkan. Maka kembalikanlah kepadaku apa yang aku butuhkan.',
    category: 'Ilmu'
  },
  {
    id: 10,
    title: 'Doa Masuk Masjid',
    arabic: 'اَللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allaahummaf-tah lii abwaaba rohmatika',
    translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    category: 'Keseharian'
  },
  {
    id: 11,
    title: 'Doa Keluar Masjid',
    arabic: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allahumma innii as-aluka min fadhlika',
    translation: 'Ya Allah, sesungguhnya aku mohon kepada-Mu dari limpahan karunia-Mu.',
    category: 'Keseharian'
  },
  {
    id: 12,
    title: 'Doa Akan Tidur',
    arabic: 'بِاسْمِكَ اللّٰهُمَّ أَحْيَا وَأَمُوْتُ',
    latin: 'Bismika Allahumma ahyaa wa amuutu',
    translation: 'Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.',
    category: 'Keseharian'
  },
  {
    id: 13,
    title: 'Doa Ketika Turun Hujan',
    arabic: 'اَللّٰهُمَّ صَيِّبًا نَافِعًا',
    latin: 'Allahumma shoyyiban naafi\'aa',
    translation: 'Ya Allah, turunkanlah hujan yang bermanfaat.',
    category: 'Waktu Tertentu'
  },
  {
    id: 14,
    title: 'Doa Ketika Mendengar Petir',
    arabic: 'سُبْحَانَ الَّذِيْ يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلاَئِكَةُ مِنْ خِيْفَتِهِ',
    latin: 'Subhaanal-ladzii yusabbihur-ro\'du bihamdihi wal-malaa-ikatu min khiifatihi',
    translation: 'Maha Suci Allah yang guruh bertasbih memuji-Nya, begitu pula malaikat karena takut kepada-Nya.',
    category: 'Waktu Tertentu'
  },
  {
    id: 15,
    title: 'Doa Memakai Pakaian',
    arabic: 'اَلْحَمْدُ ِللهِ الَّذِىْ كَسَانِىْ هَذَا الثَّوْبَ وَرَزَقَنِيْهِ مِنْ غَيْرِ حَوْلٍ مِنِّىْ وَلاَ قُوَّةٍ',
    latin: 'Alhamdulillahil-ladzii kasaanii haadzats-tsawba warozaqoniihi min ghoiri hawlim-minnii walaa quwwatin',
    translation: 'Segala puji bagi Allah yang memberi aku pakaian ini dan memberi rezeki kepadaku tanpa daya dan kekuatan dariku.',
    category: 'Keseharian'
  },
  {
    id: 16,
    title: 'Doa Melepas Pakaian',
    arabic: 'بِسْمِ اللهِ الَّذِيْ لاَ إِلَهَ إِلاَّ هُوَ',
    latin: 'Bismillahil-ladzii laa ilaaha illaa huwa',
    translation: 'Dengan nama Allah yang tiada Tuhan selain Dia.',
    category: 'Keseharian'
  },
  {
    id: 17,
    title: 'Doa Ketika Bercermin',
    arabic: 'اَلْحَمْدُ ِللهِ كَمَا حَسَّنْتَ خَلْقِىْ فَحَسِّـنْ خُلُقِىْ',
    latin: 'Alhamdulillah kamaa hassanta kholqii fahassin khuluqii',
    translation: 'Segala puji bagi Allah, baguskanlah budi pekertiku sebagaimana Engkau telah membaguskan rupa wajahku.',
    category: 'Keseharian'
  },
  {
    id: 18,
    title: 'Doa Naik Kendaraan',
    arabic: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ. وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ',
    latin: 'Subhaanal-ladzii sakhkhoro lanaa haadzaa wamaa kunnaa lahu muqriniin. Wa innaa ilaa robbinaa lamunqolibun',
    translation: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    category: 'Perjalanan'
  },
  {
    id: 19,
    title: 'Doa Memohon Perlindungan di Perjalanan',
    arabic: 'اَللّٰهُمَّ إِنَّا نَسْأَلُكَ فِيْ سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى. اَللّٰهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِعَنَّا بُعْدَهُ. اَللّٰهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيْفَةُ فِي الْأَهْلِ',
    latin: 'Allahumma innaa nas-aluka fii safarinaa haadzal-birro wattaqwaa waminal-\'amali maa tardhoo. Allahumma hawwin \'alainaa safaronaa haadzaa wathwi \'annaa bu\'dahu. Allahumma antash-shoohibu fis-safari wal-kholiifatu fil-ahli',
    translation: 'Ya Allah, sesungguhnya kami mohon kepada-Mu dalam perjalanan ini kebajikan, ketakwaan, dan amal yang Engkau ridhai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah kejauhannya. Ya Allah, Engkaulah teman dalam perjalanan dan yang mengurus keluarga.',
    category: 'Perjalanan'
  },
  {
    id: 20,
    title: 'Doa Sampai di Tempat Tujuan',
    arabic: 'اَلْحَمْدُ ِللهِ الَّذِيْ سَلَّمَنِيْ وَالَّذِيْ آوَانِيْ وَالَّذِيْ جَمَعَ الشَّمْلَ بِيْ',
    latin: 'Alhamdulillahil-ladzii sallamonii walladzii aawoonii walladzii jama\'asy-syamla bii',
    translation: 'Segala puji bagi Allah yang telah menyelamatkanku, yang telah memberiku tempat berteduh, dan yang telah menyatukan denganku orang-orang yang kukasihi.',
    category: 'Perjalanan'
  },
  {
    id: 21,
    title: 'Doa Meminta Kebaikan Dunia dan Akhirat',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Robbanaa aatinaa fid-dunyaa hasanatan wafil-aakhiroti hasanatan waqinaa \'adzaa bannaar',
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka.',
    category: 'Kualitas Diri'
  },
  {
    id: 22,
    title: 'Doa Meminta Ampunan',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    latin: 'Robbanaa zholamnaa anfusanaa wa illam taghfir lanaa watarhamna lanakuunanna minal-khoosireen',
    translation: 'Ya Tuhan kami, kami telah menganiaya diri kami sendiri, dan jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya pastilah kami termasuk orang-orang yang merugi.',
    category: 'Kualitas Diri'
  },
  {
    id: 23,
    title: 'Doa Meminta Rezeki',
    arabic: 'اَللّٰهُمَّ اكْفِنِيْ بِحَلاَلِكَ عَنْ حَرَامِكَ وَأَغْنِنِيْ بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    latin: 'Allahummakfinii bihalaaalika \'an haroomika wa aghninii bifadhlika \'amman siwaaka',
    translation: 'Ya Allah, cukupkanlah aku dengan rezeki yang halal, sehingga aku tidak memerlukan yang haram, dan cukupkanlah aku dengan karunia-Mu, sehingga aku tidak memerlukan bantuan orang lain, selain diri-Mu.',
    category: 'Rezeki'
  },
  {
    id: 24,
    title: 'Doa Ketika Sakit',
    arabic: 'اَللّٰهُمَّ اشْفِنِيْ شِفَاءً لاَ يُغَادِرُ سَقَمًا',
    latin: 'Allahummasy-finii syifaa-an laa yughoodiru saqoman',
    translation: 'Ya Allah, sembuhkanlah aku dengan kesembuhan yang tidak meninggalkan penyakit lagi.',
    category: 'Kesehatan'
  },
  {
    id: 25,
    title: 'Doa Menjenguk Orang Sakit',
    arabic: 'لاَ بَأْسَ طَهُوْرٌ إِنْ شَاءَ اللهُ',
    latin: 'Laa ba\'sa thohuurun insyaa Allaah',
    translation: 'Jangan khawatir, insya Allah penyakit ini akan menjadi penebus dosamu.',
    category: 'Kesehatan'
  },
  {
    id: 26,
    title: 'Doa Sebelum Membaca Al-Quran',
    arabic: 'اَللّٰهُمَّ افْتَحْ عَلَيَّ حِكْمَتَكَ وَانْشُرْ عَلَيَّ رَحْمَتَكَ وَذَكِّرْنِيْ مَا نَسِيْتُ يَا ذَا الْجَلاَلِ وَاْلإِكْرَامِ',
    latin: 'Allaahummaf-tah \'alayya hikmataka wansyur \'alayya rohmataka wa dzakkirnii maa nasiitu yaa dzal-jalaali wal-ikroom',
    translation: 'Ya Allah, bukakanlah hikmah-Mu kepadaku, bentangkanlah rahmat-Mu kepadaku dan ingatkanlah aku terhadap apa yang aku lupa, wahai Dzat Yang Maha Agung lagi Maha Mulia.',
    category: 'Baca Al-Quran'
  },
  {
    id: 27,
    title: 'Doa Sesudah Membaca Al-Quran',
    arabic: 'اَللّٰهُمَّ ارْحَمْنِيْ بِالْقُرْآنِ وَاجْعَلْهُ لِيْ إِمَامًا وَنُوْرًا وَهُدًى وَرَحْمَةً',
    latin: 'Allahummarhamnii bil-Qur\'aani waj\'alhu lii imaaman wa nuuron wa hudan wa rohmatan',
    translation: 'Ya Allah, rahmatilah aku dengan Al-Quran yang agung, jadikanlah ia bagiku ikutan cahaya, petunjuk dan rahmat.',
    category: 'Baca Al-Quran'
  },
  {
    id: 28,
    title: 'Doa Iftitah (Pembukaan Shalat)',
    arabic: 'اللهُ أَكْبَرُ كَبِيْرًا وَالْحَمْدُ لِلَّهِ كَثِيْرًا وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيْلاً',
    latin: 'Allaahu akbaru kabiiron walhamdu lillaahi katsiiron wa subhaanallaahi bukrotan wa ashiilaa',
    translation: 'Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak. Maha Suci Allah pada waktu pagi dan petang.',
    category: 'Shalat'
  },
  {
    id: 29,
    title: 'Doa Qunut',
    arabic: 'اَللّٰهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ، وَعَافِنِيْ فِيْمَنْ عَافَيْتَ، وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ، وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ، وَقِنِيْ شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِيْ وَلاَ يُقْضَى عَلَيْكَ، وَإِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، وَلاَ يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
    latin: 'Allaahummahdinii fiiman hadaita wa \'aafinii fiiman \'aafaita watawallanii fiiman tawallaita wa baarik lii fiimaa a\'thoita waqinii syarra maa qodhoita fa-innaka taqdhii walaa yuqdhoo \'alaika wa innahu laa yadzillu man waalaita walaa ya\'izzu man \'aadaita tabaarokta robbanaa wa ta\'aalaita',
    translation: 'Ya Allah, berilah aku petunjuk bersama orang-orang yang telah Engkau beri petunjuk, berilah aku keselamatan bersama orang-orang yang telah Engkau beri keselamatan, peliharalah aku bersama orang-orang yang Engkau pelihara, berilah aku berkah terhadap apa yang Engkau berikan kepadaku, dan peliharalah aku dari kejelekan yang telah Engkau tetapkan. Sesungguhnya Engkau yang menetapkan dan tidak ada yang menetapkan atas Engkau. Sesungguhnya tidak akan hina orang yang telah Engkau lindungi dan tidak akan mulia orang yang Engkau musuhi. Maha Suci Engkau ya Tuhan kami lagi Maha Tinggi.',
    category: 'Shalat'
  },
  {
    id: 30,
    title: 'Doa Setelah Tasyahud Akhir',
    arabic: 'اَللّٰهُمَّ إِنِّيْ ظَلَمْتُ نَفْسِيْ ظُلْمًا كَثِيْرًا وَلاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِيْ مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِيْ إِنَّكَ أَنْتَ الْغَفُوْرُ الرَّحِيْمُ',
    latin: 'Allahumma innii zholamtu nafsii zhulman katsiiro walaa yaghfirudz-dzunuuba illaa anta faghfir lii maghfirotan min \'indika warhamnii innaka antal-ghofuurur-rohiim',
    translation: 'Ya Allah, sesungguhnya aku telah berbuat zhalim terhadap diriku sendiri dengan kezhaliman yang banyak, dan tiada yang mengampuni dosa-dosa kecuali Engkau. Maka ampunilah aku dengan ampunan dari sisi-Mu dan rahmatilah aku. Sesungguhnya Engkaulah Yang Maha Pengampun lagi Maha Penyayang.',
    category: 'Shalat'
  }
];

export const doaCategories = [
  'Keseharian',
  'Rezeki',
  'Tolak Bala',
  'Kesehatan',
  'Perjalanan',
  'Ilmu',
  'Waktu Tertentu',
  'Kualitas Diri',
  'Pernikahan & Rumah Tangga',
  'Hamil & Persalinan',
  'Wudhu',
  'Para Nabi di Al-Quran',
  'Baca Al-Quran',
  'Shalat',
  'Haji & Umrah'
];
