import { Template, PricingPackage, AddOn, RSVPItem } from '../types';

import heroImg from '../assets/images/hero_invitation_showcase_1791090500255.jpg';
import tplRomantic from '../assets/images/template_romantic_rose_1791090515409.jpg';
import tplLuxury from '../assets/images/template_luxury_gold_1791090535084.jpg';
import tplBotanical from '../assets/images/template_botanical_sage_1791090549857.jpg';
import tplMinimalist from '../assets/images/template_modern_minimalist_1791090562242.jpg';

export const HERO_IMAGE = heroImg;

export const TEMPLATES_DATA: Template[] = [
  {
    id: 'tpl-romantic-rose',
    title: 'Serenade Blush & Gold',
    category: 'romantic',
    categoryLabel: 'Romantic Floral',
    theme: 'Nuansa blush pink lembut dengan aksen kaligrafi emas dan floral watercolor',
    colorPalette: ['#FCE7F3', '#F472B6', '#D97706', '#FFFBEB'],
    previewImg: tplRomantic,
    audioTitle: 'A Thousand Years - Piano Acoustic',
    description: 'Pilihan paling disukai untuk konsep pernikahan intimate romantic, taman bunga, maupun indoor ballroom nan anggun.',
    popular: true,
    features: ['Amplop Digital QRIS', 'Galeri 12 Foto', 'RSVP WhatsApp', 'Hitung Mundur Presisi', 'Navigasi Maps'],
  },
  {
    id: 'tpl-luxury-emerald',
    title: 'Royale Emerald & Gold',
    category: 'luxury',
    categoryLabel: 'Luxury Gold',
    theme: 'Kombinasi hijau zamrud megah dengan ornamen foil emas klasik & mewah',
    colorPalette: ['#064E3B', '#047857', '#F59E0B', '#111827'],
    previewImg: tplLuxury,
    audioTitle: 'Canon in D - Royal Chamber Harp',
    description: 'Cocok untuk pesta pernikahan megah, adat formal modern, serta resepsi hotel berbintang yang berkelas.',
    popular: true,
    features: ['Amplop Multi-Rekening', 'Background Video', 'RSVP Realtime', 'Live Streaming YouTube', 'Custom Typo'],
  },
  {
    id: 'tpl-botanical-sage',
    title: 'Botanical Sage & Olive',
    category: 'botanical',
    categoryLabel: 'Botanical Rustic',
    theme: 'Earthy green, ranting zaitun teduh dengan tekstur kertas linen organik',
    colorPalette: ['#ECFDF5', '#10B981', '#78716C', '#F5F5F4'],
    previewImg: tplBotanical,
    audioTitle: 'Until I Found You - Lo-Fi Acoustic',
    description: 'Pilihan utama tema pesta outdoor, garden party, rustic villa, dan pernikahan bertema alam yang hangat.',
    popular: false,
    features: ['Galeri Foto Grid', 'Quotes Romantis', 'QR Code Check-in', 'Amplop Digital', 'RSVP Direct'],
  },
  {
    id: 'tpl-modern-noir',
    title: 'Monochrome Editorial Noir',
    category: 'minimalist',
    categoryLabel: 'Modern Minimalist',
    theme: 'Tipografi majalah fashion kontemporer dengan tata letak bersih dan kontras tinggi',
    colorPalette: ['#18181B', '#27272A', '#E4E4E7', '#FAFAFA'],
    previewImg: tplMinimalist,
    audioTitle: 'Nothing - Bruno Major (Fingerstyle Guitar)',
    description: 'Gaya modern chic untuk pasangan yang menyukai kesederhanaan abadi, tipografi presisi, dan estetika arsitektural.',
    popular: false,
    features: ['Tipografi Editorial', 'Smooth Motion Scroll', 'Galeri Carousel', 'Love Story Timeline', 'RSVP Simpel'],
  },
  {
    id: 'tpl-heritage-batik',
    title: 'Nusantara Royal Heritage',
    category: 'islamic',
    categoryLabel: 'Tradisional & Adat',
    theme: 'Motif batik prada Jawa-Sunda dengan sentuhan modern kontemporer yang sarat makna',
    colorPalette: ['#451A03', '#92400E', '#FDE68A', '#FEF3C7'],
    previewImg: tplLuxury,
    audioTitle: 'Gamelan Sekar Jagad Contemporary',
    description: 'Menonjolkan keagungan budaya nusantara dengan format digital responsif terkini.',
    popular: false,
    features: ['Ayat Suci & Doa', 'Jadwal Prosesi Adat', 'Amplop Digital', 'Galeri Prewedding', 'Panduan Lokasi'],
  },
  {
    id: 'tpl-little-miracle',
    title: 'Aqiqah Little Miracle',
    category: 'aqiqah',
    categoryLabel: 'Aqiqah & Syukuran',
    theme: 'Warna pastel ceria dan ornamen awan lembut untuk syukuran kelahiran sang buah hati',
    colorPalette: ['#EFF6FF', '#60A5FA', '#FBBF24', '#F8FAFC'],
    previewImg: tplRomantic,
    audioTitle: 'Deen Assalam - Instrumental Soft',
    description: 'Didesain khusus untuk momen aqiqah, tasyakuran kelahiran, khitanan anak, dan ulang tahun pertama.',
    popular: false,
    features: ['Biodata Bayi', 'Doa Syukuran', 'Konfirmasi Kehadiran', 'Ucapan Digital', 'Google Maps Venue'],
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-silver',
    name: 'Paket Silver',
    subtitle: 'Kebutuhan esensial untuk pesta sederhana & intim',
    price: 99000,
    originalPrice: 150000,
    popular: false,
    activePeriod: 'Masa Aktif 6 Bulan',
    features: [
      'Pilih 1 Desain Template Premium',
      'Informasi Akad & Resepsi Lengkap',
      'Hitung Mundur Waktu Acara',
      'Petunjuk Arah Google Maps',
      'Audio Musik Latar Standar',
      'Galeri 4 Foto Prewedding',
      'Amplop Digital (1 Rekening Bank)',
      'RSVP via WhatsApp Langsung',
      'Revisi Data hingga Hari-H',
    ],
  },
  {
    id: 'pkg-gold',
    name: 'Paket Gold (Paling Favorit)',
    subtitle: 'Fitur lengkap terlengkap untuk pesta modern',
    price: 169000,
    originalPrice: 249000,
    popular: true,
    activePeriod: 'Masa Aktif 1 Tahun',
    features: [
      'Semua fitur pada Paket Silver',
      'Galeri hingga 15 Foto & 1 Video YouTube',
      'Love Story & Timeline Perjalanan Cinta',
      'Generator Nama Tamu Tanpa Batas',
      'Sistem RSVP Interaktif & Kolom Doa',
      'Amplop Digital Multi-Rekening & QRIS',
      'Musik Bebas Request (Pilihan Sendiri)',
      'Panduan Protokol Acara & Dresscode',
      'Link Undangan Custom Nama Singkat',
      'Penyelesaian Cepat 1x24 Jam',
    ],
  },
  {
    id: 'pkg-platinum',
    name: 'Paket Platinum VIP',
    subtitle: 'Solusi all-in-one mewah tanpa kompromi',
    price: 279000,
    originalPrice: 399000,
    popular: false,
    activePeriod: 'Masa Aktif Selamanya',
    features: [
      'Semua fitur pada Paket Gold',
      'Custom Domain Sendiri (e.g. nama.my.id)',
      'Buku Tamu Digital QR Code Check-in',
      'Filter Instagram Story Khusus Pengantin',
      'Integrasi Live Streaming YouTube/Zoom',
      'Broadcast Assistant ke 200+ Kontak WA',
      'Pengerjaan Kilat Prioritas (< 6 Jam)',
      'VIP Support Dedicated Wedding Specialist',
    ],
  },
];

export const ADDONS_DATA: AddOn[] = [
  {
    id: 'addon-custom-domain',
    name: 'Custom Domain Pribadi (.my.id)',
    description: 'Gunakan alamat web eksklusif (contoh: budi-ayu.my.id) agar lebih berkesan.',
    price: 50000,
    popular: true,
  },
  {
    id: 'addon-qr-checkin',
    name: 'Buku Tamu Digital & QR Check-in',
    description: 'Sistem scan QR code tamu di meja resepsi untuk verifikasi kehadiran tanpa antre.',
    price: 45000,
    popular: true,
  },
  {
    id: 'addon-custom-song',
    name: 'Musik Spesial Request Custom',
    description: 'Gunakan lagu rekaman sendiri atau lagu favorit khusus yang belum ada di katalog.',
    price: 25000,
  },
  {
    id: 'addon-ig-filter',
    name: 'Filter Instagram Story Wedding',
    description: 'Efek kamera Instagram bermotif inisial nama mempelai untuk tamu undangan berselfie.',
    price: 60000,
  },
  {
    id: 'addon-express',
    name: 'Pengerjaan Super Express (< 6 Jam)',
    description: 'Layanan jalur cepat, undangan Anda langsung selesai dan siap disebar hari ini juga.',
    price: 35000,
  },
  {
    id: 'addon-wa-broadcast',
    name: 'Tools Broadcast WhatsApp Otomatis',
    description: 'Format pesan terstruktur untuk memudahkan kirim ke ratusan kontak dalam beberapa klik.',
    price: 40000,
  },
];

export const SAMPLE_RSVPS: RSVPItem[] = [
  {
    id: 'rsvp-1',
    name: 'Dimas Prasetyo & Istri',
    attendance: 'hadir',
    pax: 2,
    message: 'Selamat Budi & Ayu! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar sampai hari-H!',
    timestamp: '2 jam yang lalu',
    likes: 5,
  },
  {
    id: 'rsvp-2',
    name: 'dr. Sarah Nabila',
    attendance: 'hadir',
    pax: 1,
    message: 'Barakallah cantik! MasyaAllah undangannya elegan banget. InsyaAllah hadir tepat waktu.',
    timestamp: '5 jam yang lalu',
    likes: 8,
  },
  {
    id: 'rsvp-3',
    name: 'Rizky Firmansyah',
    attendance: 'hadir',
    pax: 2,
    message: 'Wah selamat kawan seperjuangan! Akhirnya berlabuh ke pelaminan. Doa terbaik untuk kalian berdua.',
    timestamp: '1 hari yang lalu',
    likes: 3,
  },
  {
    id: 'rsvp-4',
    name: 'Keluarga Besar Om Hendro',
    attendance: 'hadir',
    pax: 4,
    message: 'Selamat menempuh hidup baru. Salam hangat untuk kedua orang tua pengantin.',
    timestamp: '1 hari yang lalu',
    likes: 12,
  },
];

export const TESTIMONIALS = [
  {
    couple: 'Budi & Ayu',
    city: 'Jakarta Selatan',
    eventDate: 'Agustus 2026',
    comment: 'Sistem pembayaran otomatisnya cepat banget! Setelah bayar via QRIS, invoice langsung terbit dan undangan langsung aktif. Fitur amplop digitalnya sangat memudahkan tamu-tamu kami yang berhalangan hadir.',
    templateName: 'Serenade Blush & Gold',
    package: 'Paket Gold',
  },
  {
    couple: 'Fajar & Nadia',
    city: 'Surabaya',
    eventDate: 'Juli 2026',
    comment: 'Undangannya kelihatan sangat premium di HP para tamu. Fitur generator nama tamu di WhatsApp ngebantu banget pas sebar 400 undangan tanpa harus ngetik manual satu-satu.',
    templateName: 'Royale Emerald & Gold',
    package: 'Paket Platinum VIP',
  },
  {
    couple: 'Reza & Putri',
    city: 'Bandung',
    eventDate: 'September 2026',
    comment: 'Puas banget! Musik latarnya jernih, navigasi Google Maps akurat sampai ke lokasi venue. Tim supportnya juga ramah saat kami minta penyesuaian teks doa.',
    templateName: 'Botanical Sage & Olive',
    package: 'Paket Gold',
  },
];

export const FAQS = [
  {
    q: 'Bagaimana cara kerja sistem pembayaran otomatis di MomenKita?',
    a: 'Setelah Anda mengisi form data pesanan, sistem langsung menerbitkan QRIS dinamis dan Virtual Account bank (BCA, Mandiri, BRI, BNI). Begitu Anda mentransfer, sistem melakukan verifikasi instan dalam 3 detik tanpa perlu kirim bukti transfer secara manual!',
  },
  {
    q: 'Apakah saya masih bisa merevisi data setelah melakukan pembayaran?',
    a: 'Tentu bisa! Anda mendapatkan akses dashboard untuk mengedit data seperti perubahan jam akad, penambahan foto galeri, nomor rekening amplop digital, hingga teks doa tanpa dipungut biaya tambahan.',
  },
  {
    q: 'Bagaimana cara kerja Amplop Digital / Hadiah Cashless?',
    a: 'Tamu undangan yang membuka link undangan Anda dapat melihat nomor rekening Anda (BCA, Mandiri, Jenius, dll) atau scan QRIS pribadi Anda. Tersedia tombol "Salin Nomor Rekening" yang sangat praktis sehingga dana langsung masuk ke rekening pribadi Anda 100% tanpa potongan.',
  },
  {
    q: 'Berapa lama proses pembuatan undangan sampai siap disebar?',
    a: 'Dengan sistem otomasi MomenKita, draf undangan Anda siap dalam waktu 15–30 menit setelah pembayaran. Untuk paket kilat express, pengerjaan selesai kurang dari 6 jam.',
  },
  {
    q: 'Apakah bisa menambahkan nama tamu yang berbeda di setiap link undangan?',
    a: 'Ya! MomenKita memiliki fitur "Guest Link Generator". Anda cukup mengetikkan nama tamu, lalu sistem akan membuatkan link khusus (contoh: momenkita.id/budi-ayu?to=Bapak+Joko) dan teks sapaan WhatsApp otomatis yang santun dan rapi.',
  },
];