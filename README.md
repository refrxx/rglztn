# Refriansyah Galiztan — Portofolio

Situs personal branding: folder kerja per brand, blog, dan halaman tentang.
Dibangun dengan Vite + React + Tailwind CSS v4, bergaya Material You (MD3) dengan
animasi GSAP, dan dideploy sebagai SPA statis ke Vercel.

## Jalankan

```sh
bun install
bun run dev        # http://localhost:3000
bun run build      # dist (situs statis)
bun run typecheck
bun run theme      # regenerasi src/material-tokens.css dari warna seed
```

## Di mana isinya

| File | Isi |
| --- | --- |
| `src/data/site.ts` | Nama, peran, tagline, kontak, sosial, statistik, layanan, tools |
| `src/data/work.ts` | Folder kerja per brand + piece-nya + hasil |
| `src/data/journal.ts` | Tulisan blog |
| `src/app/pages/*` | Halaman: Home, Work, Project, Journal, Post, About |
| `src/styles.css` | Utility dan pemetaan token MD3 ke Tailwind |
| `src/material-tokens.css` | Token warna MD3 hasil generator (jangan diedit manual) |
| `scripts/generate-theme.mjs` | Generator palet dari warna seed |

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

- Gaya Material You (Material Design 3) flat: bidang tonal, sudut membulat,
  tanpa gradasi, bayangan, maupun tekstur. Kedalaman dibangun dari perbedaan
  warna permukaan.
- Palet dibuat oleh `scripts/generate-theme.mjs` dari seed oranye Shopee
  `#ee4d2d` memakai `SchemeFidelity`, lalu ditulis ke `src/material-tokens.css`.
  Ubah `SEED` di skrip itu, jalankan `bun run theme`, dan commit hasilnya.
  `src/styles.css` hanya memetakan role MD3 (`primary`, `surface-container`,
  `outline`, dan seterusnya) menjadi token Tailwind. Jangan menulis warna
  langsung di komponen.
- Tiga mode tema: terang, gelap, dan ikuti sistem. Pilihan disimpan di
  `localStorage` dengan kunci `theme`, dipasang sebelum paint oleh skrip di
  `index.html`, dan diatur oleh `src/app/lib/theme.ts`.
- Tipografi: Hanken Grotesk (display, weight 800), Inter (teks), Geist Mono
  (label, angka).
- Ikon memakai Material Symbols Rounded yang di-subset dan di-host sendiri di
  `public/fonts/material-symbols-rounded.woff2` (10 KB). Hanya berisi ikon yang
  dipakai; menambah ikon berarti membuat subset baru dengan parameter
  `icon_names=` di Google Fonts.
- Komponen M3 dasar ada di `src/app/components/ui/`: `Button`, `IconButton`,
  `Chip`, `SegmentedButton`, `Icon`. Efek hover/tekan memakai utility
  `state-layer` dengan lapisan konten `relative z-10`.
- Animasi memakai GSAP (`src/app/lib/gsap.ts`, komponen `Lines`, `Reveal`,
  `Magnetic`, `Marquee` di `src/app/components/anim.tsx`). Semua animasi
  menghormati `prefers-reduced-motion`.

## Deploy

Proyek disiapkan untuk Vercel:

- Framework preset: Vite, build command `bun run build`, output `dist`.
- `vercel.json` mengarahkan semua route non-API ke `index.html` supaya deep link
  seperti `/work/<slug>` dan `/journal/<slug>` tidak 404.
- `api/health.ts` menjadi serverless function di `/api/health`.

Cukup hubungkan repo GitHub ke Vercel dan tambahkan domain dari panel Vercel.
