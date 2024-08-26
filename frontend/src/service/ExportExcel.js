import * as XLSX from "xlsx";
import products from "../api/products.js";

const exportExcel = async () => {
  try {
    const data = await products();
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
    XLSX.writeFile(workBook, "products.xlsx");
  } catch (error) {
    console.log(error);
  }
};

export default exportExcel;
