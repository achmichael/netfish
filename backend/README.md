
# Aplikasi Backend

Ini adalah bagian backend dari aplikasi yang dibangun menggunakan Node.js dan Express.js. Di bawah ini adalah ikhtisar teknologi yang digunakan, serta langkah-langkah untuk mengatur dan menjalankan aplikasi ini secara lokal.

## Teknologi yang Digunakan

### [Express.js](https://expressjs.com/)
Express.js adalah kerangka kerja aplikasi web Node.js yang minimal dan fleksibel, menyediakan serangkaian fitur yang kuat untuk mengembangkan aplikasi web dan seluler.

### [Prisma](https://www.prisma.io/)
Prisma adalah ORM (Object-Relational Mapping) open-source yang memudahkan interaksi dengan database secara tipe aman.

### [bcrypt](https://www.npmjs.com/package/bcrypt)
Bcrypt adalah pustaka untuk hashing kata sandi yang aman. Ini membantu dalam mengenkripsi kata sandi sebelum menyimpannya di database.

### [CORS](https://www.npmjs.com/package/cors)
Middleware untuk Express.js untuk mengaktifkan CORS (Cross-Origin Resource Sharing) di aplikasi Anda.

### [date-fns](https://date-fns.org/)
Pustaka untuk memanipulasi dan memformat tanggal dalam JavaScript dengan cara yang cepat dan aman.

### [dotenv](https://www.npmjs.com/package/dotenv)
Dotenv adalah modul zero-dependency yang memuat variabel lingkungan dari file `.env` ke dalam `process.env`.

### [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
Pustaka untuk menghasilkan dan memverifikasi token JSON Web (JWT), sering digunakan untuk otentikasi pengguna.

### [midtrans-client](https://www.npmjs.com/package/midtrans-client)
Klien Node.js untuk API Midtrans, digunakan untuk integrasi gateway pembayaran.

### [Nodemailer](https://nodemailer.com/about/)
Nodemailer adalah pustaka untuk mengirim email dengan mudah menggunakan Node.js.

## Instalasi dan Penggunaan

### Prasyarat

Pastikan Anda telah menginstal Node.js di mesin Anda. Anda dapat mengunduhnya dari [situs resmi Node.js](https://nodejs.org/).

### Langkah-Langkah Instalasi

1. Clone repositori ini ke dalam lingkungan pengembangan lokal Anda:
   ```bash
   git clone https://github.com/achmichael/backend.git
   cd backend
   ```

2. Instal dependensi yang diperlukan:
   ```bash
   npm install
   ```

3. Buat file `.env` di root proyek dan tambahkan variabel lingkungan yang diperlukan sesuai dengan konfigurasi Anda.

### Menjalankan Aplikasi

Untuk menjalankan aplikasi dalam mode pengembangan, jalankan:
```bash
npm start
```
Ini akan memulai server pengembangan lokal dan mengawasi perubahan dalam file `src/index.js`.

## Prisma

Untuk melakukan migrasi database menggunakan Prisma, gunakan perintah berikut:
```bash
npx prisma migrate dev --name init
```

Anda juga dapat memeriksa dan mengelola database menggunakan Prisma Studio:
```bash
npx prisma studio
```


