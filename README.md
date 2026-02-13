# 💄 Girls Map - Sistem Peta Digital Penjual Skincare & Make Up

**Girls Map** adalah sistem informasi geografis (GIS) berbasis web yang dirancang khusus untuk membantu perempuan menemukan lokasi toko kosmetik, *skincare*, dan *make up* secara akurat. Proyek ini merupakan implementasi Rekayasa Perangkat Lunak (RPL) dengan pendekatan *user-centered design* untuk memberikan solusi pencarian produk kecantikan yang terintegrasi.

---

## 🎯 Informasi Singkat

| Aspek                   | Detail                     |
| ----------------------- | -------------------------- |
| **Framework**           | React.js                   |
| **Bundler**             | Vite                       |
| **Database**            | Firebase Realtime Database |
| **Library Peta**        | Leaflet.js                 |
| **Pengolahan Data**     | QGIS & ArcGIS              |
| **Metode Pengembangan** | Waterfall                  |
| **Target Lokasi**       | Kota Palu                  |

---

## 📖 Daftar Isi

* [Overview](#overview)
* [Use Case & Target Pengguna](#use-case--target-pengguna)
* [Fitur Utama](#fitur-utama)
* [Kebutuhan Sistem](#kebutuhan-sistem)
* [Metodologi Pengembangan](#metodologi-pengembangan)
* [Alur Penggunaan](#alur-penggunaan)
* [Struktur Proyek](#struktur-proyek)
* [Kontribusi & Lisensi](#kontribusi--lisensi)

---

## 📋 Overview

Girls Map hadir untuk mengatasi kesulitan konsumen dalam mencari lokasi toko kosmetik terpercaya, yang sering tersebar tidak teratur di media sosial. Platform ini menyediakan:

* ✅ **Peta Digital Interaktif:** Menampilkan lokasi toko melalui marker pada peta.
* ✅ **Direktori Produk:** Informasi lengkap mengenai katalog produk tiap toko.
* ✅ **Informasi Operasional:** Detail jam buka/tutup toko.
* ✅ **Rekomendasi Personal:** Membantu memilih produk sesuai tipe kulit (*fitur rencana pengembangan*).

---

## 🏫 Use Case & Target Pengguna

* **Konsumen Perempuan:**
  Mencari toko terdekat, membandingkan produk, melihat ulasan, dan mendapatkan rekomendasi.

* **Pemilik Toko:**
  Meningkatkan eksposur bisnis dan menampilkan katalog produk kepada pelanggan lokal.

---

## ⭐ Fitur Utama

### 1. Sistem Peta Interaktif

* Visualisasi wilayah Kota Palu menggunakan Leaflet.js.
* Marker lokasi toko dengan tautan ke informasi detail.

### 2. Pencarian & Filter

* Cari toko berdasarkan nama atau jenis produk.
* Filter berdasarkan kategori produk (*Skincare / Make Up*).

### 3. Manajemen Data (Admin)

* CRUD (Create, Read, Update, Delete) data toko dan lokasi.
* Update informasi produk dan jam operasional secara real-time melalui Firebase.

### 4. Pengalaman Pengguna (UX)

* Antarmuka responsif untuk laptop dan ponsel.
* Menampilkan rating dan ulasan dari pengguna lain.

---

## ⚙️ Kebutuhan Sistem

### Perangkat Lunak (Software)

* **Sistem Operasi:** Windows / Linux / MacOS
* **Browser:** Google Chrome, Mozilla Firefox, Safari (versi terbaru)
* **Tools Pengembangan:** VS Code, Git, QGIS (untuk data spasial)

---

## 🔄 Metodologi Pengembangan

Proyek ini dikembangkan menggunakan **Metode Waterfall**:

1. **Analisis Kebutuhan:** Observasi langsung di Kota Palu untuk mengidentifikasi masalah.
2. **Perancangan:** Pembuatan Flowchart, DFD, ERD, dan Use Case Diagram.
3. **Implementasi:** Coding menggunakan React.js dan Firebase.
4. **Pengujian:** Blackbox Testing untuk memastikan fungsi marker, pencarian, dan CRUD data berjalan baik.

---

## 🚦 Alur Penggunaan

### Untuk Pengguna

1. Buka aplikasi melalui browser.
2. Jelajahi peta digital Kota Palu.
3. Klik **marker** pada lokasi toko yang diinginkan.
4. Lihat detail informasi: jam operasional, foto toko, dan daftar produk.

### Untuk Admin

1. Login ke sistem manajemen.
2. Tambahkan titik koordinat baru atau edit informasi toko yang sudah ada.
3. Simpan perubahan ke database untuk update instan di peta.

---

## 📂 Struktur Proyek

```text
GirlsMap/
├── src/
│   ├── components/      # UI Components (Map, Navbar, Sidebar)
│   ├── pages/           # Main Pages (Home, Admin Dashboard)
│   ├── services/        # Firebase & Leaflet logic
│   └── assets/          # Images & Icons
├── database/            # Data spasial & non-spasial (JSON/Firebase)
├── public/              # Static files
├── vite.config.ts       # Vite configuration
├── package.json         # Project dependencies
└── README.md
```

---

## 📜 Kontribusi & Lisensi

* Contributions diterima melalui Pull Request.
* Gunakan branch `main` untuk versi stabil.
* Proyek ini dibagikan di bawah lisensi MIT.

---

<div align="center">

**⭐ Dukung kami dengan memberikan STAR jika bermanfaat! ⭐**

</div>

---

Kalau mau, saya bisa buatkan **versi README yang lebih “modern”** dengan **badge, screenshot peta, dan command install/run**, sehingga bisa langsung ditempel di GitHub agar lebih menarik dan profesional.

Apakah mau saya buatkan versi itu juga?
