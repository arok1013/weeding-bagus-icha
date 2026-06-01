# Product Requirements Document (PRD)

# The Weeding

## Premium Digital Wedding Invitation

Version: 1.0

---

# 1. Project Overview

The Weeding adalah website undangan pernikahan digital premium yang dirancang untuk memberikan pengalaman interaktif, elegan, dan modern melalui animasi yang halus, tampilan visual mewah, serta sistem RSVP digital.

Website dibangun menggunakan Next.js dan Framer Motion untuk menghasilkan performa tinggi, SEO yang baik, dan pengalaman pengguna yang premium.

---

# 2. Project Goals

## Tujuan Utama

* Mengurangi penggunaan undangan kertas.
* Menyediakan undangan digital yang elegan dan modern.
* Mempermudah tamu mendapatkan informasi acara.
* Mempermudah proses konfirmasi kehadiran (RSVP).
* Menyediakan media dokumentasi perjalanan pasangan.

## Tujuan Pengguna

* Membuka undangan dengan mudah.
* Melihat informasi acara secara lengkap.
* Menikmati galeri dan cerita pasangan.
* Mengirim ucapan dan doa.
* Mengakses lokasi acara dengan cepat.

---

# 3. Target User

## Primary User

* Calon pengantin usia 20–40 tahun.

## Secondary User

* Keluarga.
* Teman.
* Rekan kerja.
* Tamu undangan.

---

# 4. Technology Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

## Database

Google Spreadsheet

Digunakan hanya untuk:

* RSVP
* Ucapan dan doa tamu

## Hosting

* Vercel

## Analytics

* Google Analytics
* Microsoft Clarity

---

# 5. Data Source

## Data Lokal (Static Content)

Disimpan di project:

src/data/
src/images/

Digunakan untuk:

* Nama pengantin
* Biodata pengantin
* Love Story
* Countdown
* Detail acara
* Video prewedding
* Galeri foto
* Lokasi acara
* Musik

## Data Dinamis

Google Spreadsheet digunakan untuk:

### RSVP

* Nama
* Nomor WhatsApp
* Jumlah tamu
* Status kehadiran
* Ucapan
* Tanggal submit

---

# 6. User Flow

User membuka link undangan

↓

Opening Cover Screen

↓

Klik Tombol "Buka Undangan"

↓

Hero Section

↓

Countdown

↓

Profil Pengantin

↓

Love Story

↓

Video Prewedding

↓

Detail Acara

↓

Galeri Foto

↓

Peta Acara

↓

RSVP

↓

Ucapan & Doa

↓

Footer

---

# 7. Feature Requirements

## F01 — Opening Cover

### Deskripsi

Halaman pertama sebelum isi undangan ditampilkan.

### Komponen

* Background foto pasangan
* Nama tamu
* Nama pasangan
* Tanggal acara
* Tombol Buka Undangan

### Animasi

* Fade In
* Background Zoom
* Floating Particles
* Smooth Transition

---

## F02 — Hero Section

### Komponen

* The Wedding Of
* Nama pasangan
* Tanggal pernikahan
* QS Ar-Rum Ayat 21

### Animasi

* Text Reveal
* Slow Parallax
* Fade Up

---

## F03 — Countdown

### Komponen

* Hari
* Jam
* Menit
* Detik

### Fungsi

Menghitung mundur menuju hari pernikahan secara realtime.

---

## F04 — Bride & Groom

### Komponen

* Foto pria
* Foto wanita
* Nama lengkap
* Nama orang tua
* Akun Instagram

### Animasi

* Card Slide In
* Hover Effect

---

## F05 — Love Story

### Komponen

Timeline perjalanan pasangan:

* First Meeting
* Relationship
* Engagement
* Wedding

### Animasi

* Scroll Reveal
* Timeline Progress

---

## F06 — Video Prewedding

### Komponen

* Embed YouTube

### Animasi

* Fade Up

---

## F07 — Event Detail

### Komponen

#### Akad Nikah

* Tanggal
* Jam
* Lokasi
* Alamat

#### Resepsi

* Tanggal
* Jam
* Lokasi
* Alamat

### Tombol

* Buka Google Maps

---

## F08 — Gallery

### Judul

Potret Cerita Kami dalam 1 Frame

### Komponen

* Slider horizontal
* Swipe mobile
* Drag desktop
* Lightbox preview

### Sumber Data

src/images/gallery

### Animasi

* Scale Hover
* Smooth Slide
* Fade Reveal

---

## F09 — Event Location

### Judul

Peta Acara

### Komponen

* Embedded Google Maps
* Tombol Buka Maps

### Animasi

* Fade In

---

## F10 — RSVP

### Form

* Nama lengkap
* Nomor WhatsApp
* Jumlah tamu
* Kehadiran

  * Hadir
  * Tidak Hadir
  * Mungkin Hadir
* Ucapan dan doa

### Penyimpanan

Google Spreadsheet

---

## F11 — Wishes

### Komponen

Menampilkan data dari Google Spreadsheet:

* Nama tamu
* Ucapan
* Tanggal kirim

### Animasi

* Fade In
* Infinite Scroll (Opsional)

---

## F12 — Background Music

### Fitur

* Musik otomatis setelah klik Buka Undangan
* Tombol Play/Pause

---

## F13 — Footer

### Komponen

* Nama pasangan
* Tahun acara
* Ucapan terima kasih

---

# 8. Non Functional Requirements

## Performance

* Lighthouse Score > 90
* First Load < 3 detik

## SEO

* Open Graph
* Meta Description
* Structured Data

## Responsive

* Mobile
* Tablet
* Desktop

## Accessibility

* Alt Text Gambar
* Keyboard Navigation

## Security

* Validasi Form RSVP
* Anti Spam Submission
* Sanitasi Input

---

# 9. Folder Structure

src/
├── app/
├── components/
├── data/
│   ├── wedding.ts
│   ├── story.ts
│   ├── event.ts
│   └── gallery.ts
│
├── images/
│   ├── hero/
│   ├── bride/
│   ├── groom/
│   ├── story/
│   └── gallery/
│
├── services/
│   └── googleSheets.ts
│
└── types/

---

# 10. Success Criteria

* Undangan dapat dibuka di semua perangkat.
* RSVP berhasil tersimpan ke Google Spreadsheet.
* Galeri dapat digeser secara horizontal.
* Lokasi dapat dibuka melalui Google Maps.
* Website responsif dan berjalan lancar.
* Animasi memberikan kesan premium dan elegan.
