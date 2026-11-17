// Satu brand = satu proyek. Setiap proyek memiliki beberapa karya yang dapat
// diganti gambarnya kapan saja: isi `image` dengan path di /public.

export type PieceKind = 'website' | 'catalog' | 'social' | 'poster'

export interface Piece {
  title: string
  kind: PieceKind
  note: string
  image?: string
}

export interface Project {
  slug: string
  client: string
  category: string
  sector: string
  year: string
  summary: string
  role: string[]
  channels: string[]
  pieces: Piece[]
  results: { value: string; label: string }[]
  body: string[]
}

export const projects: Project[] = [
  {
    slug: 'hamzah-quran',
    client: 'Hamzah Quran',
    category: 'Website dan marketplace',
    sector: 'Quran & perlengkapan ibadah',
    year: '2026 — sekarang',
    summary:
      'Menyatukan toko Shopee dan website dalam satu bahasa visual yang tenang, bersih, dan cukup meyakinkan untuk produk yang dibeli dengan pertimbangan.',
    role: ['Desain website', 'Marketplace', 'Arahan visual'],
    channels: ['hamzahquran.com', 'Shopee'],
    body: [
      'Hamzah Quran berjualan di dua tempat: Shopee yang ramai dan website sendiri yang lebih tenang. Masalahnya, kedua kanal tersebut terlihat seperti dua brand berbeda: foto dengan tone berbeda, banner dengan gaya berbeda, dan tipografi dengan karakter berbeda.',
      'Saya mulai dari hal paling dasar: satu set warna, satu hierarki tipografi, dan aturan foto produk yang mudah diikuti tim. Dari situ saya menyusun halaman website dan storefront marketplace, agar orang yang pertama kali melihat di Shopee langsung mengenali brand yang sama saat berkunjung ke website.',
      'Bagian katalog saya tata berdasarkan cara orang membeli: produk yang paling sering dicari ditempatkan di depan, varian ukuran dan warna dibuat jelas, dan deskripsi dipecah menjadi poin-poin yang mudah dibaca sambil berjalan.',
    ],
    pieces: [
      {
        title: 'Website hamzahquran.com',
        kind: 'website',
        note: 'Struktur halaman, sistem warna, dan tipografi. Fokusnya katalog yang mudah dijelajahi tanpa kehilangan kesan tenang.',
      },
      {
        title: 'Storefront Shopee',
        kind: 'catalog',
        note: 'Susunan katalog, banner toko, dan halaman promosi agar produk unggulan terlihat lebih dahulu.',
      },
      {
        title: 'Banner kampanye',
        kind: 'poster',
        note: 'Aset promosi Ramadan dan tanggal kembar dengan satu sistem visual yang sama.',
      },
      {
        title: 'Thumbnail produk',
        kind: 'social',
        note: 'Format thumbnail seragam untuk semua SKU, tetap terbaca pada ukuran kecil.',
      },
    ],
    results: [
      { value: '+38%', label: 'klik produk dari halaman toko' },
      { value: '1', label: 'sistem visual untuk website dan marketplace' },
      { value: '24', label: 'aset desain yang diproduksi' },
    ],
  },
  {
    slug: 'alfatih-quran',
    client: 'Alfatih Quran',
    category: 'Media sosial',
    sector: 'Quran & kelas tahsin',
    year: '2025 — 2026',
    summary:
      'Mengelola feed dan materi harian dengan nada visual yang tenang: banyak ruang kosong, tipografi besar, dan warna yang tidak berlebihan menarik perhatian.',
    role: ['Spesialis media sosial', 'Desain feed', 'Rencana konten'],
    channels: ['Instagram', 'TikTok'],
    body: [
      'Akun dakwah dan kelas tahsin mudah jatuh ke tampilan yang penuh tulisan dan warna. Untuk Alfatih Quran, saya mengambil arah sebaliknya: satu kutipan per halaman, satu foto, dan satu aksen warna.',
      'Saya membuat template carousel dan sampul reels yang dapat digunakan kembali oleh tim, sehingga produksi harian tidak lagi dimulai dari kanvas kosong. Semua materi berbagi grid, margin, dan ukuran huruf yang sama.',
      'Hasilnya adalah feed yang, ketika dilihat dari grid, terasa seperti satu publikasi, bukan kumpulan poster lepas.',
    ],
    pieces: [
      {
        title: 'Carousel kajian',
        kind: 'catalog',
        note: 'Template carousel 6 slide untuk materi kajian mingguan yang dapat diedit sendiri oleh tim.',
      },
      {
        title: 'Sistem feed Instagram',
        kind: 'social',
        note: 'Grid 3 kolom dengan aturan warna dan margin yang konsisten antar-postingan.',
      },
      {
        title: 'Sampul reels',
        kind: 'poster',
        note: 'Sampul 9:16 dengan judul besar dan satu aksen hijau, tetap terbaca di beranda.',
      },
    ],
    results: [
      { value: '3×', label: 'rata-rata jangkauan per postingan' },
      { value: '12', label: 'template siap pakai untuk tim' },
      { value: '48', label: 'materi per kuartal' },
    ],
  },
  {
    slug: 'rzaids',
    client: 'RZAIDS Butik Syari',
    category: 'Pengelolaan marketplace',
    sector: 'Fashion syari',
    year: '2025',
    summary:
      'Menata toko butik syari dari katalog yang tidak terstruktur menjadi storefront yang mudah dijelajahi, dengan foto dan banner yang seragam.',
    role: ['Manajer marketplace', 'Katalog', 'Arahan visual'],
    channels: ['Shopee', 'Tokopedia'],
    body: [
      'Toko RZAIDS memiliki produk yang baik, tetapi katalognya membingungkan: judul produk panjang, foto dengan latar berbeda, dan varian yang tersebar di banyak listing.',
      'Saya menyusun ulang struktur katalog: penamaan, urutan varian, dan pengelompokan koleksi. Setelah itu, saya membuat arahan foto produk agar semua gambar memiliki jarak, pencahayaan, dan sudut yang sama.',
      'Terakhir, banner promosi musiman dibuat sebagai satu set: ukuran toko, ukuran produk, dan aset untuk feed, semuanya berasal dari template yang sama.',
    ],
    pieces: [
      {
        title: 'Katalog Shopee',
        kind: 'catalog',
        note: 'Penamaan produk, urutan varian, dan pengelompokan koleksi yang lebih mudah dicari.',
      },
      {
        title: 'Arahan foto produk',
        kind: 'poster',
        note: 'Panduan sudut, jarak, dan pencahayaan agar seluruh foto terlihat konsisten.',
      },
      {
        title: 'Banner promosi musiman',
        kind: 'social',
        note: 'Satu set aset promosi untuk toko, halaman produk, dan feed sosial.',
      },
    ],
    results: [
      { value: '−41%', label: 'pertanyaan varian yang berulang' },
      { value: '2', label: 'marketplace dengan katalog seragam' },
      { value: '6', label: 'koleksi ditata ulang' },
    ],
  },
  {
    slug: 'pawon-iyo',
    client: 'Pawon Iyo',
    category: 'Media sosial & promosi',
    sector: 'Kuliner rumahan',
    year: '2024 — 2025',
    summary:
      'Membangun feed kuliner yang membangkitkan selera sebelum orang membuka menu, lengkap dengan materi promosi harian untuk marketplace makanan.',
    role: ['Media sosial', 'Desain materi promosi', 'Foto produk'],
    channels: ['Instagram', 'Shopee Food'],
    body: [
      'Pawon Iyo menjual masakan rumahan. Tantangannya bukan membuat foto makanan terlihat lezat, karena itu bagian yang lebih mudah. Tantangannya adalah membuat orang yang sedang menggulir berhenti, lalu langsung mengingat nama brand.',
      'Saya menggunakan pendekatan editorial: foto besar, teks sesedikit mungkin, dan satu warna aksen yang selalu muncul di setiap materi. Menu dipecah menjadi beberapa seri, sehingga setiap minggu ada cerita baru tanpa harus membuat sistem baru.',
      'Materi promosi harian dibuat dalam template yang dapat digunakan sendiri oleh tim, termasuk banner diskon dan kartu menu untuk marketplace.',
    ],
    pieces: [
      {
        title: 'Menu digital',
        kind: 'website',
        note: 'Halaman menu ringan yang dapat dibuka dari tautan di bio, tanpa perlu aplikasi.',
      },
      {
        title: 'Feed & grid Instagram',
        kind: 'social',
        note: 'Grid dengan ritme foto produk, menu, dan potret dapur.',
      },
      {
        title: 'Materi promosi harian',
        kind: 'poster',
        note: 'Template banner diskon harian untuk feed dan marketplace makanan.',
      },
    ],
    results: [
      { value: '+64%', label: 'klik tautan menu dari bio' },
      { value: '5', label: 'seri konten mingguan' },
      { value: '30', label: 'materi promosi per bulan' },
    ],
  },
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const nextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length]
}
