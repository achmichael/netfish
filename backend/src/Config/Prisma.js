import { PrismaClient } from "@prisma/client";

class PrismaClientWrapper {
    constructor() {
        //memeriksa apakah instance dari kelas PrismaClientWrapper sudah ada, jika tidak: 
        if(!PrismaClientWrapper.instance){
            //membuat instance baru dan menyimpannya di dalam properti prisma
            this.prisma = new PrismaClient();

            // Menyimpan instance saat ini sebagai `PrismaClientWrapper.instance`. Ini memastikan hanya ada satu instance di seluruh aplikasi.
            PrismaClientWrapper.instance = this;
        }
        // Mengembalikan instance yang sama setiap kali konstruktor dipanggil. Ini menerapkan pola singleton.
        return PrismaClientWrapper.instance;
    }

    // Metode untuk mengakses PrismaClient yang sudah diinisialisasi.
    getClient() {
        // Mengembalikan instance PrismaClient yang disimpan di properti `prisma`.
        return this.prisma;
    }
}
// Membuat instance dari PrismaClientWrapper. Ini akan memastikan hanya ada satu instance karena pola singleton.
const instance = new PrismaClientWrapper();
// Membekukan instance agar tidak dapat diubah setelah dibuat. Ini membantu menjaga konsistensi dan integritas instance.
Object.freeze(instance);

export default instance;