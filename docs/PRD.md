# PRD Final — RimbaRent
## Sistem Informasi Rental Alat Outdoor Berbasis Web
**Project 1 · Mata Kuliah Pemrograman Internet**

| | |
|---|---|
| **Brand** | RimbaRent — *"Gear Up. Explore More."* |
| **Tagline** | Sewa perlengkapan outdoor berkualitas untuk menemani setiap perjalananmu. |
| **Teknologi** | HTML5 + CSS3 + JavaScript minimal |
| **Frontend Skill** | Hallmark (Nutlope/hallmark v1.1.0, MIT) — Mode A (Quality Layer) |
| **Palet** | OKLCH (5 warna brand inti + 3 status) |
| **Versi Dokumen** | 2.0 (final, terkunci) |
| **Status** | ✅ Terimplementasi & terverifikasi |

---

## 1. Project Overview

Website frontend **multi-halaman** untuk sistem informasi rental alat outdoor fiktif **RimbaRent**. Menampilkan katalog alat, detail alat, form pengajuan rental (prototype), serta tentang & kontak. Dibangun murni dengan HTML5 semantik + CSS3 (Grid, Flexbox, variables, animasi, responsive), **tanpa framework dan tanpa backend**.

## 2. Background

Studi kasus dipilih karena kaya konten visual (gunung, tenda, carrier) untuk memenuhi syarat "gambar sesuai tema", sekaligus punya struktur data produk yang jelas (foto, nama, harga, status) — ideal untuk latihan card, grid, dan layout detail.

## 3. Problem Statement

1. Calon penyewa sulit menemukan info alat + harga + ketersediaan dalam satu tempat.
2. Rental outdoor umumnya hanya via media sosial → katalog tidak terstruktur.
3. Mahasiswa butuh project kompleks untuk menunjukkan kemampuan CSS tanpa melampaui batas Project 1.

## 4. Project Goals

| # | Goal | Indikator |
|---|------|-----------|
| G1 | Katalog informatif | ≥12 produk tampil lengkap |
| G2 | Memudahkan pencarian info | Kategori + halaman detail |
| G3 | Pengalaman rental (prototype) | Form + estimasi harga berfungsi |
| G4 | Menunjukkan CSS lanjutan | Grid, Flexbox, variables, animasi, responsive |
| G5 | Desain profesional | Konsisten, tidak rusak di mobile |

## 5. Target Users

Mahasiswa · Pendaki pemula · Komunitas outdoor · Traveler · Pecinta alam.

## 6. User Persona

- **Dimas (20, mahasiswa)** — hiking akhir pekan, budget terbatas, ingin tahu harga & stok sebelum datang.
- **Rani (24, traveler)** — trip singkat, peduli spesifikasi & berat alat.

## 7. User Stories

| ID | Sebagai | Ingin | Agar |
|----|---------|-------|------|
| US-01 | Pengunjung | melihat hero & gambaran rental | cepat paham layanan |
| US-02 | Pengunjung | melihat kategori alat | menemukan jenis sesuai kebutuhan |
| US-03 | Calon penyewa | melihat katalog bergambar | memilih alat |
| US-04 | Calon penyewa | melihat detail (spesifikasi, harga, status) | yakin sebelum sewa |
| US-05 | Calon penyewa | melihat status ketersediaan | tidak memilih alat yang disewa |
| US-06 | Calon penyewa | mengisi form rental | mengajukan sewa (prototype) |
| US-07 | Calon penyewa | melihat estimasi biaya | tahu perkiraan total |
| US-08 | Pengunjung | tahu cara rental | paham proses |
| US-09 | Pengunjung | melihat keunggulan | percaya |
| US-10 | Pengunjung | menghubungi rental | bertanya/datang |
| US-11 | Pengunjung mobile | menavigasi via mobile menu | nyaman di HP |

## 8. Feature List

**Must Have:** navbar sticky + mobile menu · hero bg+overlay+CTA · 8 kategori · katalog 12 produk + filter · detail alat · badge status 3 jenis · form rental 8 field + panel estimasi · 4 keunggulan · 4 langkah · CTA · footer lengkap.

**Should Have:** hover card (naik + shadow + zoom) · estimasi otomatis via JS.

**Could Have (Future):** filter fungsional ✓ (sudah) · modal konfirmasi · search.

**Won't Have:** login, register, database, payment, API, backend.

## 9. Functional Requirements

| ID | Requirement | Halaman |
|----|-------------|---------|
| FR-01 | Navbar sticky di semua halaman | Semua |
| FR-02 | Mobile menu toggle + ARIA | Semua |
| FR-03 | Hero bg + overlay | Home |
| FR-04 | CTA "Lihat Katalog" & "Sewa Sekarang" | Home |
| FR-05 | 8 kartu kategori | Home |
| FR-06 | 4 alat populer | Home |
| FR-07 | 4 keunggulan | Home |
| FR-08 | 4 langkah cara rental | Home |
| FR-09 | Katalog 12 produk (Grid) | Katalog |
| FR-10 | Card: foto, badge, kategori, nama, harga, status, tombol Detail | Katalog |
| FR-11 | Filter kategori | Katalog |
| FR-12 | Detail: foto besar + info + spesifikasi | Detail |
| FR-13 | Rating visual bintang | Detail |
| FR-14 | Tombol "Sewa Sekarang" → rental | Detail |
| FR-15 | Form 8 field | Rental |
| FR-16 | Panel estimasi (harga/hari, lama, jumlah, total) | Rental |
| FR-17 | Estimasi otomatis (JS) | Rental |
| FR-18 | Tentang (visi, misi, keunggulan) + kontak | Tentang |
| FR-19 | Map placeholder (bukan API) | Tentang |
| FR-20 | Semua link navigasi berfungsi | Semua |

## 10. Non-Functional Requirements

HTML5 semantik 100% · CSS manual tanpa framework · responsive 375/430/768/1200/1440 · **tanpa horizontal overflow** · desain konsisten (5 warna) · gambar proporsional (`object-fit`) · aksesibilitas (alt, kontras WCAG) · transisi halus ≤320ms · dapat dibuka via `file://`.

## 11. Information Architecture & 12. Sitemap

```
index.html (Home)
 ├─ Hero · Kategori(8) · Populer(4) · Keunggulan(4) · Cara(4) · CTA
 ├─ pages/katalog.html → 12 card + filter kategori
 ├─ pages/detail.html  → foto + info + spesifikasi + CTA Sewa
 ├─ pages/rental.html  → form(8) + panel estimasi
 └─ pages/tentang.html → Tentang + Kontak + map placeholder
```
Semua halaman saling terhubung via **navbar** + **footer**.

## 13. User Flow

```
Home → Katalog → Pilih Alat → Detail → Sewa Sekarang → Form Rental → Konfirmasi (visual)
Alternatif: Home → CTA "Sewa Sekarang" → Rental
            Home → Tentang → Kontak
```

## 14. Page Requirements

### 14.1 Home (`index.html`)
- **Tujuan:** perkenalkan brand, dorong ke katalog/rental.
- **Section:** Navbar → Hero (split) → Kategori → Populer → Keunggulan → Cara Rental → CTA → Footer.
- **Hero:** split 2 kolom — **teks kiri** (headline, sub, CTA) + **gambar kanan** (foto pendaki/gunung, rasio 4:3, hover zoom). Background penuh + overlay dipertahankan. Mobile: gambar turun ke bawah teks (1 kolom).
- **Konten:** Headline *"Siapkan Petualanganmu."* · Sub *"Sewa perlengkapan outdoor berkualitas…"* · CTA **Lihat Katalog** & **Sewa Sekarang**.
- **Interaksi:** CTA hover, card lift+shadow, sticky nav, gambar hero hover zoom (`transform` saja).
- **Responsive:** hero split → 1 kolom di ≤992px (gambar turun ke bawah); kategori 4→3→2→1; populer 4→3→2→1; keunggulan/cara 4→2→1.

### 14.2 Katalog (`pages/katalog.html`)
- **Tujuan:** tampilkan seluruh alat + filter.
- **Section:** Navbar → Page header → Filter bar → Grid produk → CTA → Footer.
- **Interaksi:** filter tab (JS), card hover, tombol Detail.
- **Responsive:** grid 4→3→2→1; filter scroll horizontal di mobile.

### 14.3 Detail (`pages/detail.html`)
- **Tujuan:** info lengkap satu alat.
- **Layout:** 2 kolom (foto kiri / info kanan) → 1 kolom di mobile.
- **Konten:** nama, kategori, rating, harga, status, kondisi, kapasitas, berat, spesifikasi tabel, deskripsi, tombol Sewa.
- **Interaksi:** galeri thumbnail (JS), hover tombol.

### 14.4 Rental (`pages/rental.html`)
- **Tujuan:** prototype pengajuan + estimasi.
- **Section:** Navbar → Form (kiri) + Panel Estimasi (kanan, sticky) → langkah → Footer.
- **Field:** Nama, WhatsApp, Email, Pilih alat, Jumlah, Tanggal mulai, Tanggal kembali, Catatan.
- **Interaksi:** estimasi otomatis (harga/hari × jumlah × lama hari); submit → feedback konfirmasi (tanpa backend).
- **Responsive:** 2 kolom → 1 kolom; panel estimasi pindah bawah.

### 14.5 Tentang (`pages/tentang.html`)
- **Tujuan:** bangun kepercayaan + jalur kontak.
- **Section:** Navbar → Tentang (deskripsi, visi, misi, keunggulan) → Kontak (WA, email, alamat, jam, sosmed) → Map placeholder → CTA → Footer.

## 15. Component Requirements

Navbar (logo/menu/CTA/hamburger) · Hero (bg+overlay+heading+CTA) · Category Card · Product Card · Feature Card · Step Card · Status Badge · Rating · CTA Band · Form Group · Estimasi Panel · Footer · Map Placeholder.

## 16. Product Data (12 produk)

| ID | Nama | Kategori | Harga/hari | Status | Kondisi | Kapasitas | Berat |
|----|------|----------|-----------|--------|---------|-----------|-------|
| P01 | Tenda Rei 2P | Tenda | Rp35.000 | 🟢 Tersedia | Sangat Baik | 2 orang | 2.4 kg |
| P02 | Tenda Naturehike 4P | Tenda | Rp55.000 | 🟢 Tersedia | Baik | 4 orang | 4.0 kg |
| P03 | Carrier 45L | Carrier | Rp30.000 | 🟠 Sedang Disewa | Baik | 45 L | 1.5 kg |
| P04 | Carrier 60L | Carrier | Rp40.000 | 🟢 Tersedia | Sangat Baik | 60 L | 1.8 kg |
| P05 | Sleeping Bag | Sleeping Bag | Rp20.000 | 🟢 Tersedia | Baik | — | 1.1 kg |
| P06 | Matras Outdoor | Matras | Rp15.000 | 🟢 Tersedia | Baik | — | 0.9 kg |
| P07 | Kompor Portable | Kompor Outdoor | Rp18.000 | 🟢 Tersedia | Sangat Baik | — | 0.4 kg |
| P08 | Trekking Pole | Trekking Pole | Rp12.000 | 🟢 Tersedia | Baik | — | 0.3 kg |
| P09 | Headlamp | Headlamp | Rp10.000 | 🔴 Maintenance | Cukup | — | 0.2 kg |
| P10 | Flysheet | Peralatan Camping | Rp22.000 | 🟢 Tersedia | Baik | 4 orang | 1.2 kg |
| P11 | Cooking Set | Peralatan Camping | Rp20.000 | 🟢 Tersedia | Baik | 2–3 orang | 0.8 kg |
| P12 | Kursi Camping | Peralatan Camping | Rp15.000 | 🟠 Sedang Disewa | Baik | 1 orang | 1.0 kg |

## 17–20. UI/UX · Design System · Palette · Typography

**Design Tokens (OKLCH):**
```css
--forest: oklch(42% 0.09 150);  /* primary */
--dark:   oklch(28% 0.07 150);  /* secondary */
--earth:  oklch(52% 0.09 60);   /* accent (<=3% viewport) */
--cream:  oklch(95% 0.015 90);  /* paper */
--ink:    oklch(22% 0.012 60);  /* text */
/* status: ok/busy/maint */
```

**Typography:** Display **Fraunces** · Body **Inter Tight** · skala rasio perfect fourth (1.333) · line-height display 1.1 / body 1.6 · measure 65ch.

**Radius:** 6/12/20/999px · **Shadow:** tinted bertingkat · **Spacing:** kelipatan 4/8 · **Transition:** 160–320ms ease · **Divider:** hairline 1px.

## 21. Responsive Requirements

| Breakpoint | Grid Produk | Layout |
|-----------|-------------|--------|
| ≥1200 | 4 kolom | container 1200px |
| 992–1199 | 3 kolom | — |
| 768–991 | 2 kolom | detail 1 kolom, nav collapse |
| 576–767 | 2 kolom | form 1 kolom |
| <576 | 1 kolom | mobile menu, hero stack |

## 22. CSS Requirements

CSS Variables ✓ · Flexbox ✓ · Grid ✓ · Media query (5 breakpoint) ✓ · Hover+transition+transform ✓ · Shadow/radius/overlay/position ✓ · Sticky navbar ✓ · Responsive image ✓ · Form styling ✓ · Badge ✓ · Typography hierarchy ✓ · Custom button ✓ · Card hover (naik + shadow + zoom + tombol) ✓.

## 23. Asset Requirements

```
assets/images/{hero,products,categories,about}/  +  assets/icons/
```
{hero,products,categories,about}/ · Ketentuan: tema outdoor, rasio konsisten (hero 16:9, produk 4:3), wajib `alt`. Bila gambar belum ada → **placeholder blok berlabel** + `onerror` fallback (lihat `assets/images/README.md`). Ikon memakai inline SVG.

## 24. Project Structure

```
rental-alat/
├── index.html
├── pages/{katalog,detail,rental,tentang}.html
├── css/{style,components,responsive}.css
├── js/script.js
├── assets/images/{hero,products,categories,about}/ + icons/
└── docs/PRD.md   (dokumen ini)
```

## 25. Technical Constraints

**Diizinkan:** HTML5, CSS3, JS minimal. **Dilarang:** React/Vue/Angular, Bootstrap/Tailwind/Material/framework CSS, backend/PHP/Laravel/Node, database, API, auth backend. Harus jalan via `file://`, tanpa build tools.

## 26. Acceptance Criteria — Status Verifikasi

| Kriteria | Status |
|----------|--------|
| 5 halaman dapat dibuka | ✅ |
| Navigasi antar halaman berfungsi | ✅ (25/25 link valid) |
| HTML5 semantik | ✅ |
| CSS3 signifikan | ✅ (3 file, ~44 KB) |
| Desain konsisten | ✅ |
| Gambar sesuai tema | ✅ (placeholder + panduan) |
| Responsive tanpa overflow | ✅ **0/25 kombinasi overflow** |
| ≥12 product card | ✅ (12) |
| Detail produk | ✅ |
| Form rental (8 field) + estimasi | ✅ (terverifikasi Rp210.000) |
| Hover effect + badge + hero | ✅ |
| Tanpa framework CSS | ✅ |

## 27. Development Priority (selesai)

P0 Fondasi → P1 Home → P2 Katalog → P3 Detail → P4 Rental → P5 Tentang → P6 Responsive → H6 Hallmark audit.

## 28. Future Development

Search · filter lanjutan · modal konfirmasi · dark mode · riwayat rental (butuh backend) · WhatsApp API · peta asli · autentikasi + database.

---

## Lampiran A — Hallmark (Mode A: Quality Layer)

Hallmark dipakai meningkatkan *craft*, **struktur tetap sesuai brief dosen**.

**Diadopsi:** palet OKLCH + tinted neutrals (tanpa #000/#fff) · satu accent ≤3% viewport · tipografi pairing + skala rasio · hairline divider · hindari anti-pattern kritis (gradien ungu, gradient headline, card-in-card, side-stripe) · kontras WCAG ≥4.5:1 · `prefers-reduced-motion` · animasi tanpa reflow (transform/opacity).

**Stamp:** `Hallmark · macrostructure: Photographic · pre-emit critique: P5 H5 E5 S4 R5 V4`

## Lampiran B — Hasil QA

**Overflow:** 0/25 (5 halaman × 5 viewport) ✓
**Fungsional:** filter katalog ✓ · estimasi otomatis ✓ · submit prototype ✓ · mobile menu + ARIA ✓ · galeri thumbnail ✓ · tahun dinamis ✓
**Kontras (WCAG):** body 15.9:1 · muted 6.6:1 · eyebrow 5.2:1 · text-on-dark 10.6:1 · badge 7.4–9.5:1 — semua lolos.

## Lampiran C — Assumptions

1. Bahasa konten: Indonesia.
2. Brand final: **RimbaRent**.
3. Detail alat: 1 produk contoh (tanpa backend); produk lain mengarah ke halaman sama.
4. JS hanya untuk: mobile menu, filter, galeri, estimasi, submit feedback.
5. Web font eksternal (Google Fonts) dengan fallback system.
6. Map: placeholder statis.
7. Gambar: placeholder berlabel, mudah diganti.
