# Refriansyah Galiztan — Portofolio

Situs personal branding: folder kerja per brand, blog, dan halaman tentang.
Dibangun dengan Vite + React + Tailwind CSS v4, bergaya netral dengan satu aksen
biru, animasi GSAP, dan dideploy sebagai SPA statis ke Vercel.

## Jalankan

```sh
bun install
bun run dev        # http://localhost:3000
bun run build      # dist (situs statis)
bun run typecheck
```

## Di mana isinya

| File | Isi |
| --- | --- |
| `src/data/site.ts` | Nama, peran, tagline, kontak, sosial, statistik, layanan, tools |
| `src/data/work.ts` | Folder kerja per brand + piece-nya + hasil |
| `src/data/journal.ts` | Tulisan blog |
| `src/app/pages/*` | Halaman: Home, Work, Project, Journal, Post, About |
| `src/styles.css` | Token warna netral, utility, dan `@theme` Tailwind |

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

- Gaya netral: permukaan abu murni, sudut membulat, dan panel glass (blur +
  garis tipis + highlight tepi). Tanpa gradasi dan tanpa tint warna.
- Palet ditulis tangan di `src/styles.css` sebagai token `--ui-*` (gelap di
  `:root`, terang di `html[data-theme='light']`), lalu dipetakan ke warna
  Tailwind seperti `bg`, `surface`, `raised`, `line`, `fg`, `muted`, `faint`,
  `ink`, dan `accent`. Jangan menulis warna langsung di komponen.
- Satu aksen saja: biru tenang `#93c5fd` (gelap) / `#1d4ed8` (terang). Dipakai
  tipis untuk titik status, focus ring, selection, tag, dan hover link. Tombol
  utama memakai warna `ink` solid, bukan aksen.
- Tiga mode tema: terang, gelap, dan ikuti sistem. Pilihan disimpan di
  `localStorage` dengan kunci `theme`, dipasang sebelum paint oleh skrip di
  `index.html`, dan diatur oleh `src/app/lib/theme.ts`.
- Tipografi: Hanken Grotesk (display, weight 600), Inter (teks), Geist Mono
  (label, angka).
- Ikon memakai SVG inline di `src/app/components/ui/Icon.tsx` (kotak 24,
  stroke 1.6, `currentColor`). Tidak ada font ikon; menambah ikon berarti
  menambah path di file itu.
- Komponen dasar ada di `src/app/components/ui/`: `Button`, `IconButton`,
  `Chip`, `SegmentedButton`, `Icon`. Efek hover/tekan memakai utility `state`
  dengan lapisan konten `relative z-10`.
- Animasi memakai GSAP (`src/app/lib/gsap.ts`, komponen `Lines`, `Reveal`,
  `Marquee` di `src/app/components/anim.tsx`). Semua animasi menghormati
  `prefers-reduced-motion`.

## Deploy

Proyek disiapkan untuk Vercel:

- Framework preset: Vite, build command `bun run build`, output `dist`.
- `vercel.json` mengarahkan semua route non-API ke `index.html` supaya deep link
  seperti `/work/<slug>` dan `/journal/<slug>` tidak 404.
- `api/health.ts` menjadi serverless function di `/api/health`.

Cukup hubungkan repo GitHub ke Vercel dan tambahkan domain dari panel Vercel.
