import * as XLSX from "xlsx";
import products from "../api/products.js";
import datasUsers from "../api/datasUsers.js";

const exportExcelForPartner = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("data")).token;
    const data = await products(token);

    // Cek apakah data tersedia dan berbentuk array
    if (data && Array.isArray(data.data)) {
      const workSheet = XLSX.utils.json_to_sheet(data.data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
      XLSX.writeFile(workBook, "products.xlsx");
    } else {
      console.error("Data produk tidak valid atau kosong.");
    }
  } catch (error) {
    console.log("Error saat mengekspor produk:", error);
  }
};

const exportExcelForAdmin = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("data")).token;
    const dataProduct = await products(token);
    const dataUser = await datasUsers(token);

    // Cek apakah data produk tersedia dan berbentuk array
    if (
      dataProduct &&
      Array.isArray(dataProduct.data) &&
      dataUser &&
      Array.isArray(dataUser)
    ) {
      const workSheet = XLSX.utils.json_to_sheet(dataProduct.data);
      const workSheet2 = XLSX.utils.json_to_sheet(dataUser);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
      XLSX.utils.book_append_sheet(workBook, workSheet2, "Users");
      XLSX.writeFile(workBook, "admin_report.xlsx");
    } else {
      console.error("Data produk atau data pengguna tidak valid atau kosong.");
    }
  } catch (error) {
    console.log("Error saat mengekspor data untuk admin:", error);
  }
};

export { exportExcelForPartner, exportExcelForAdmin };
