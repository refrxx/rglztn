// Tulisan blog. Urut otomatis dari yang paling baru.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tag: string
  readingTime: string
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'desain-yang-kelihatan-mahal',
    title: 'Desain yang terlihat profesional: apa yang sebenarnya menentukan',
    excerpt:
      'Bukan gradasi emas dan bukan animasi mahal. Yang membuat sebuah brand terlihat premium biasanya justru hal-hal yang mudah diabaikan.',
    date: '2026-10-18',
    tag: 'Prinsip',
    readingTime: '5 menit',
    body: [
      { type: 'p', text: 'Setiap kali ada permintaan agar tampilan dibuat "lebih premium", yang biasanya dibayangkan adalah penambahan: gradasi, efek glow, ornamen, animasi. Padahal, dalam hampir semua kasus, langkah pertama yang benar justru menghapus.' },
      { type: 'h2', text: 'Satu keputusan, bukan sepuluh' },
      { type: 'p', text: 'Halaman yang terasa mahal biasanya memiliki satu ide visual yang jelas dan sisanya disiplin. Satu warna aksen. Satu keluarga tipografi. Satu jenis sudut. Begitu ada lima gaya tombol, tiga warna sorotan, dan empat ukuran judul yang hampir sama, mata mulai bekerja lebih keras dari seharusnya, dan kerja keras itu justru terasa murah.' },
      { type: 'p', text: 'Cara paling cepat mengujinya: lihat halaman dalam ukuran thumbnail. Jika dari jauh terlihat rapi dan memiliki hierarki, desainnya kemungkinan besar sudah benar. Jika terlihat ramai tanpa titik fokus, menambah efek tidak akan menolong.' },
      { type: 'h2', text: 'Ruang kosong adalah fitur' },
      { type: 'p', text: 'Brand premium berani menyisakan ruang. Judul besar dengan margin lebar di sekelilingnya terlihat lebih percaya diri daripada lima elemen yang saling berebut perhatian. Ruang kosong juga membuat mata tahu ke mana harus melihat lebih dulu, dan itulah yang membuat navigasi terasa tenang.' },
      { type: 'quote', text: 'Jika semua elemen berteriak, tidak ada yang didengar.' },
      { type: 'h2', text: 'Detail kecil yang dirasakan, bukan dilihat' },
      { type: 'list', items: [
        'Ritme jarak antar-section yang konsisten, bukan angka acak setiap kali menambah blok.',
        'Huruf dengan tracking sedikit lebih rapat pada ukuran besar, dan line-height lebih longgar pada paragraf panjang.',
        'Warna abu-abu yang digunakan untuk teks sekunder, bukan hitam dengan opacity; hasilnya jauh lebih bersih.',
        'Garis pemisah setipis satu piksel yang konsisten di semua tempat.',
      ] },
      { type: 'p', text: 'Semua itu tidak terlihat saat orang melihat halaman. Namun, semuanya terasa saat orang memakainya. Pada akhirnya, premium adalah soal perasaan yang muncul sebelum orang sempat menalar.' },
    ],
  },
  {
    slug: 'thumbnail-yang-dijual',
    title: 'Thumbnail yang menjual: lima aturan yang saya terapkan setiap hari',
    excerpt:
      'Thumbnail bukan poster mini. Ia memiliki tugas sendiri: membuat orang berhenti pada ukuran 200 piksel, di layar yang penuh gangguan.',
    date: '2026-09-14',
    tag: 'Visual',
    readingTime: '6 menit',
    body: [
      { type: 'p', text: 'Di marketplace, thumbnail adalah kesempatan pertama. Tidak ada gulir panjang, tidak ada copy yang menjelaskan produk. Ada satu kotak kecil yang bersaing dengan belasan kotak lain, dan orang memutuskan dalam hitungan detik.' },
      { type: 'h2', text: '1. Satu subjek, satu pesan' },
      { type: 'p', text: 'Jika produknya dua, orang tidak tahu harus melihat yang mana. Jika ada tulisan lima baris, tidak ada yang dibaca. Saya selalu mulai dari satu pertanyaan: apa satu hal yang harus orang ingat setelah melihat gambar ini? Sisanya dibuang.' },
      { type: 'h2', text: '2. Kontras lebih dulu, detail kemudian' },
      { type: 'p', text: 'Produk harus terpisah dari latar dalam satu kali lihat. Latar gelap dengan produk terang, atau sebaliknya. Detail tekstur, jahitan, dan material diperuntukkan bagi gambar kedua dan ketiga di halaman produk, bukan untuk thumbnail.' },
      { type: 'h2', text: '3. Teks maksimal tiga kata' },
      { type: 'p', text: 'Label seperti "Ready Stock", "Premium", atau "Diskon 30%" bekerja karena singkat. Begitu berubah menjadi kalimat, fungsinya berubah dari penanda menjadi gangguan. Ukurannya juga harus tetap terbaca saat gambar diperkecil; uji di layar ponsel, bukan di monitor.' },
      { type: 'h2', text: '4. Satu sistem untuk semua SKU' },
      { type: 'p', text: 'Jika setiap thumbnail dibuat dari nol, toko akan terlihat seperti kumpulan penjual berbeda. Posisi produk, sudut, ruang untuk label, dan warna aksen sebaiknya ditetapkan di awal, lalu semua varian mengikuti. Ini juga menghemat waktu produksi saat ada produk baru.' },
      { type: 'h2', text: '5. Konsisten dengan halaman produk' },
      { type: 'p', text: 'Thumbnail yang menjanjikan tampilan A harus sesuai dengan tampilan A saat diklik. Kekecewaan kecil seperti ini yang membuat orang menutup halaman, dan algoritma marketplace membaca itu sebagai sinyal buruk.' },
      { type: 'quote', text: 'Thumbnail yang baik bukan yang paling ramai, tetapi yang paling cepat dipahami.' },
    ],
  },
  {
    slug: 'rapihin-katalog-shopee',
    title: 'Menata katalog Shopee tanpa menambah stok',
    excerpt:
      'Sebagian besar toko yang "sepi" bukan kekurangan produk, tetapi kekurangan struktur. Berikut urutan perbaikan yang dapat dikerjakan minggu ini.',
    date: '2026-08-03',
    tag: 'Marketplace',
    readingTime: '7 menit',
    body: [
      { type: 'p', text: 'Saat pertama kali membuka toko klien, yang saya lihat hampir selalu sama: ratusan listing, judul panjang yang ditumpuk kata kunci, varian tersebar di beberapa halaman, dan banner promosi yang sudah kedaluwarsa. Produknya tidak salah. Strukturnya yang membuat orang sulit membeli.' },
      { type: 'h2', text: 'Mulai dari judul, bukan dari foto' },
      { type: 'p', text: 'Judul yang baik dibaca seperti jawaban: ini apa, untuk siapa, ukuran atau variannya apa. Kata kunci tetap penting, tetapi jika judul menjadi kalimat acak, orang tidak menemukan apa yang dicari meskipun produknya ada. Pola yang saya gunakan: nama produk, jenis, ukuran, lalu satu pembeda.' },
      { type: 'h2', text: 'Kumpulkan varian di satu tempat' },
      { type: 'p', text: 'Jika warna dan ukuran dipecah menjadi listing terpisah, ulasan, jumlah terjual, dan stok ikut terpecah. Satu listing dengan varian lengkap terlihat lebih meyakinkan, lebih mudah dicari, dan lebih mudah dirawat.' },
      { type: 'list', items: [
        'Kelompokkan produk berdasarkan cara orang mencari, bukan berdasarkan cara gudang menata.',
        'Pastikan lima produk teratas adalah yang paling ingin dijual, bukan yang paling lama diunggah.',
        'Hapus atau nonaktifkan listing yang fotonya berbeda gaya dan stoknya sudah lama kosong.',
        'Samakan ukuran dan rasio semua foto produk; ini perubahan tercepat yang dapat mengubah kesan toko.',
        'Ganti banner promosi yang kedaluwarsa dengan yang masih relevan, atau kosongkan.',
      ] },
      { type: 'h2', text: 'Ukur hal yang sederhana' },
      { type: 'p', text: 'Tidak perlu dasbor yang rumit. Cukup tiga angka: klik dari halaman toko, rasio kunjungan ke checkout, dan jumlah pertanyaan berulang di chat. Jika pertanyaan "apakah ada ukuran L?" masih muncul terus, masalahnya bukan pada algoritma; katalog belum menjawabnya.' },
      { type: 'p', text: 'Semua perbaikan di atas dapat dikerjakan tanpa menambah satu produk pun. Biasanya hasilnya juga terasa lebih cepat daripada menambah stok.' },
    ],
  },
  {
    slug: 'website-atau-marketplace',
    title: 'Website sendiri atau tetap di marketplace?',
    excerpt:
      'Keduanya menjual, tetapi cara kerjanya berbeda. Berikut cara saya memutuskan apakah klien membutuhkan salah satunya, atau justru keduanya.',
    date: '2026-07-21',
    tag: 'Strategi',
    readingTime: '6 menit',
    body: [
      { type: 'p', text: 'Pertanyaan ini muncul hampir setiap kali ada brand yang mulai tumbuh: "Apakah saya harus membuat website?" Jawaban jujurnya bergantung pada tahap produk dan siapa yang membeli.' },
      { type: 'h2', text: 'Marketplace adalah mesin, bukan rumah' },
      { type: 'p', text: 'Marketplace memberikan trafik yang sudah ada. Orang datang untuk membeli, bukan untuk mengenal brand. Itu kekuatannya, sekaligus batasnya: Anda bersaing di rak yang sama dengan semua orang, dan semua keputusan visual dipotong menjadi thumbnail kecil.' },
      { type: 'p', text: 'Jika produk mudah dibandingkan, seperti harga, ukuran, dan warna, serta pembelinya mencari kata kunci, marketplace adalah tempat pertama yang harus ditata. Membuat website lebih dahulu tanpa membenahi katalog biasanya hanya menambah biaya.' },
      { type: 'h2', text: 'Website adalah tempat orang memutuskan untuk percaya' },
      { type: 'p', text: 'Website mulai masuk akal jika brand perlu menjelaskan sesuatu yang tidak muat dalam deskripsi produk: cerita, proses, kualitas bahan, atau layanan purna jual. Di sana Anda mengatur urutan informasi, dan orang membaca dengan tempo yang Anda tentukan.' },
      { type: 'p', text: 'Website juga menjadi rujukan identitas. Saat orang mencari nama brand di Google, yang mereka temukan sebaiknya bukan hanya halaman toko oranye dengan banner diskon.' },
      { type: 'h2', text: 'Urutan yang saya sarankan' },
      { type: 'list', items: [
        'Tata katalog marketplace terlebih dahulu: struktur produk dan foto yang konsisten.',
        'Buat website sederhana: profil, katalog pilihan, dan satu jalur kontak yang jelas.',
        'Gunakan satu sistem visual untuk keduanya agar orang mengenali brand di mana pun.',
        'Baru tambahkan fitur: checkout sendiri, blog, atau akun pelanggan.',
      ] },
      { type: 'p', text: 'Yang paling sering gagal bukan karena pilihan platformnya salah, tetapi karena dua kanal dibangun terpisah dan terlihat seperti dua brand. Satu sistem visual yang digunakan di dua tempat hampir selalu lebih berdampak daripada satu kanal baru.' },
    ],
  },
]

export const bySlug = (slug: string) => posts.find((p) => p.slug === slug)

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

export const nextPost = (slug: string) => {
  const index = sortedPosts.findIndex((p) => p.slug === slug)
  return sortedPosts[(index + 1) % sortedPosts.length]
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
