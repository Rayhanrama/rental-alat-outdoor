# Placeholder Gambar — RimbaRent

Website ini dibuat agar tetap terlihat rapi **tanpa gambar**. Setiap elemen
gambar punya fallback visual (blok berlabel / ikon SVG) dan otomatis disembunyikan
bila file gambar belum ada (atribut `onerror`).

## ⚠️ Catatan penting (2026)

Foto **kategori** dan **produk** kini memakai **URL eksternal (Unsplash)** agar
repo ringan — lihat dan ganti `src` langsung di:
- `index.html` (kategori + alat populer)
- `pages/katalog.html` (12 produk)
- `pages/detail.html` (galeri + alat lain)

Foto **hero** dan **tentang** tetap memakai file lokal di folder ini.

Folder `categories/` dan `products/` **tidak lagi dilacak git** (ada di
`.gitignore`) karena sudah memakai URL eksternal. File lokalnya masih ada di
disk sebagai cadangan.

## Cara Memasang Gambar Asli

Letakkan file gambar dengan **nama & folder persis** seperti daftar di bawah,
lalu ganti/refresh halaman. Tidak perlu mengubah HTML.


### Hero — `assets/images/hero/`
| Nama file | Rasio | Keterangan |
|-----------|-------|------------|
| `hero-mountain.jpg` | 16:9 atau lebih lebar | Foto gunung / camping / pendaki untuk background hero Home |
| `hero-hikers.jpg` | 4:3 (landscape) | Foto pendaki / gunung untuk **gambar kanan** di hero (split hero) |

### Produk — `assets/images/products/`
| Nama file | Untuk |
|-----------|-------|
| `tenda-naturehike-2p.jpg` | Tenda Naturehike 2P (Home Alat Populer, Katalog, & Detail) |
| `tenda-naturehike-4p.jpg` | Tenda Naturehike 4P (Home Alat Populer, Katalog) |
| `carrier-60l.jpg` | Carrier Arabas 60L (Home Alat Populer, Katalog) |
| `carrier-65l.jpg` | Carrier Osprey 65L (Home Alat Populer, Katalog) |
| `tenda-rei-2p-detail.jpg` | Galeri detail Tenda |
| `tenda-rei-2p-pack.jpg` | Galeri saat terlipat |

### Kategori — `assets/images/categories/`
Digunakan pada kartu kategori di Home. Rasio ideal 4:3. **Sudah terpasang** (foto tema outdoor).

| Nama file | Untuk kategori |
|-----------|----------------|
| `tenda-naturehike-4p.jpg` (atau `tenda.jpg`) | Tenda |
| `carrier-60l.jpg` (atau `carrier.jpg`) | Carrier |
| `sleeping-bag.jpg` | Sleeping Bag |
| `matras.jpg` | Matras |
| `kompor.jpg` | Kompor Outdoor |
| `trekking-pole.jpg` | Trekking Pole |
| `headlamp.jpg` | Headlamp |
| `camping.jpg` | Peralatan Camping |

### Tentang — `assets/images/about/`
| Nama file | Keterangan |
|-----------|------------|
| `basecamp.jpg` | Foto basecamp / tim / rak alat outdoor |

### Ikon — `assets/icons/`
Ikon saat ini memakai **inline SVG** (tanpa file eksternal) agar ringan dan
bebas dependency. Folder ini disediakan bila ingin memindahkan ikon ke file.

## Aturan Konten Gambar
- Hanya gunakan gambar bertema **outdoor**: gunung, camping, hiking, tenda,
  carrier, sleeping bag, alat outdoor. Hindari gambar yang tidak relevan.
- Sertakan `alt` deskriptif untuk setiap gambar (aksesibilitas).
- Optimalkan ukuran file (gunakan `.webp` bila memungkinkan).
