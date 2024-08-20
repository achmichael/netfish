
# Aplikasi Frontend

Ini adalah bagian frontend dari aplikasi yang dibangun menggunakan React.js dengan Vite sebagai alat build. Di bawah ini adalah ikhtisar teknologi yang digunakan, serta langkah-langkah untuk mengatur dan menjalankan aplikasi ini secara lokal.

## Teknologi yang Digunakan

### [React.js](https://reactjs.org/)
React.js adalah pustaka JavaScript untuk membangun antarmuka pengguna. Ini memungkinkan Anda membuat komponen UI yang dapat digunakan kembali.

### [Vite](https://vitejs.dev/)
Vite adalah alat build yang menyediakan pengalaman pengembangan yang lebih cepat dan ringan untuk proyek web modern. Digunakan di sini untuk membundel aplikasi.

### [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
Pustaka yang menyediakan cara sederhana untuk mengintegrasikan Google OAuth2 ke dalam aplikasi React Anda.

### [Framer Motion](https://www.framer.com/motion/)
Pustaka untuk animasi dalam React. Ini memungkinkan Anda membuat animasi kompleks dengan kode yang sederhana.

### [Midtrans Client](https://www.npmjs.com/package/midtrans-client)
Klien Node.js untuk API Midtrans, digunakan untuk integrasi gateway pembayaran.

### [React Router](https://reactrouter.com/)
Pustaka untuk routing di aplikasi React. Ini memungkinkan Anda menavigasi antara berbagai halaman dalam aplikasi React.

### [React Icons](https://react-icons.github.io/react-icons/)
Koleksi ikon populer untuk proyek React.

### [SweetAlert](https://sweetalert.js.org/)
Pustaka untuk membuat kotak dialog pop-up yang indah dan responsif dalam aplikasi web Anda.

### [SweetAlert2](https://sweetalert2.github.io/)
Versi SweetAlert yang lebih kaya fitur dan modern, menyediakan lebih banyak opsi kustomisasi.

### [TailwindCSS](https://tailwindcss.com/)
Kerangka kerja CSS berbasis utilitas untuk pengembangan UI yang cepat. Ini memungkinkan Anda menerapkan gaya langsung pada elemen HTML Anda.

### [ESLint](https://eslint.org/)
Alat untuk mengidentifikasi dan memperbaiki masalah dalam kode JavaScript Anda. Ini membantu menjaga kualitas dan konsistensi kode.

### [PostCSS](https://postcss.org/)
Alat untuk mentransformasi CSS dengan plugin JavaScript, menyediakan fitur seperti autoprefixing dan minifikasi.

## Memulai

### Prasyarat

Pastikan Anda telah menginstal Node.js di mesin Anda. Anda dapat mengunduhnya dari [situs resmi Node.js](https://nodejs.org/).

### Instalasi

1. Clone repositori ini ke dalam lingkungan pengembangan lokal Anda:
   ```bash
   git clone https://github.com/achmichael/frontend.git
   cd frontend
   ```

2. Instal dependensi yang diperlukan:
   ```bash
   npm install
   ```

### Menjalankan Aplikasi

Untuk memulai aplikasi dalam mode pengembangan, jalankan:
```bash
npm run dev
```
Ini akan memulai server pengembangan lokal. Anda dapat mengakses aplikasi di `http://localhost:3000`.

Untuk membangun aplikasi untuk produksi, jalankan:
```bash
npm run build
```
Output akan berada di direktori `dist`.

Untuk melihat pratinjau build produksi secara lokal, jalankan:
```bash
npm run preview
```

### Melakukan Linting Kode

Untuk melakukan linting pada kode dan menemukan masalah, jalankan:
```bash
npm run lint
```

## Kontribusi

Kami menyambut kontribusi untuk proyek ini. Jika Anda ingin berkontribusi, silakan fork repositori ini dan kirim pull request dengan perubahan yang Anda usulkan.


