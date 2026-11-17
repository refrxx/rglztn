# Refriansyah Galiztan — Portofolio

Situs personal branding: folder kerja per brand, blog, dan halaman tentang.
Dibangun dengan Vite + React + Tailwind CSS v4, dibungkus Worker Hono untuk
deploy ke Freebuff Sites.

## Jalankan

```sh
bun install
bun run dev        # http://localhost:3000
bun run build      # dist/client (aset) + dist/portfolio/index.js (Worker)
bun run typecheck
```

## Di mana isinya

| File | Isi |
| --- | --- |
| `src/data/site.ts` | Nama, peran, tagline, kontak, sosial, statistik, layanan, tools |
| `src/data/work.ts` | Folder kerja per brand + piece-nya + hasil |
| `src/data/journal.ts` | Tulisan blog |
| `src/app/pages/*` | Halaman: Home, Work, Project, Journal, Post, About |
| `src/styles.css` | Token warna, tipografi, dan utility desain |

### Ganti placeholder jadi gambar asli

Semua piece saat ini memakai placeholder yang digambar CSS. Untuk memakai
gambar asli, taruh file di `public/work/<brand>/<nama>.jpg` lalu isi `image`
pada piece terkait di `src/data/work.ts`:

```ts
{
  title: 'Website hamzahquran.com',
  kind: 'website',
  note: 'Struktur halaman, sistem warna, dan tipografi.',
  image: '/work/hamzah-quran/website.jpg',
}
```

Rasio yang disarankan: `website` / `catalog` 16:10, `social` / `poster` 4:5.
Selama `image` kosong, placeholder yang tampil — jadi situs tetap rapi walau
gambar belum siap.

Foto portrait di halaman Tentang juga placeholder (monogram RG) di
`src/app/pages/About.tsx`; ganti dengan `<img>` saat fotonya sudah ada.

### Angka dan hasil

Statistik di beranda dan blok "Hasil" di tiap folder masih angka contoh. Ganti
dengan data asli sebelum situs dipakai publik.

### Kontak

Nomor WhatsApp dan email diatur di `src/data/site.ts` (`whatsapp`,
`whatsappDisplay`, `email`). Nomor sudah dalam format internasional
(`wa.me/62...`). Link Behance masih dummy — tinggal ganti URL-nya di
`socials`.

## Desain

- Dua tema: gelap dan terang, diatur lewat atribut `data-theme` pada `<html>`.
  Tanpa pilihan manual, tema mengikuti `prefers-color-scheme`. Toggle ada di
  navbar dan pilihan disimpan di `localStorage` dengan kunci `theme`; skrip
  kecil di `index.html` memasangnya sebelum paint agar tidak ada kedip.
- Latar charcoal netral dengan gradasi radial di mode gelap, kertas hangat di
  mode terang (`body` di `src/styles.css`).
- Aksen: oranye Shopee `#ee4d2d` (hover `#d63e1f`) di kedua tema. Hanya untuk
  penanda: label, garis, tombol utama. Teks di atas tombol memakai
  `--color-on-accent`.
- Tipografi: Hanken Grotesk (display, weight 800), Inter (teks), Geist Mono
  (label, angka).
- Sudut membulat (kartu 28px, tombol pill), garis rambut 1px, dan grain halus di
  seluruh halaman. Mock karya dan potret ikut tema lewat token `--color-stage` /
  `--stage-*`.

## Deploy

`deploy.json` menunjuk ke hasil build. Setelah `bun run build`, deploy lewat
tool Sites. Domain yang sudah ada bisa disambungkan dari panel Sites setelah
deploy pertama.
