import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import products from "../api/products.js";
import Loader from "./LazyLoader.jsx";

// Mendaftarkan semua elemen dan skala yang diperlukan
ChartJS.register(
  ArcElement, // Untuk Doughnut chart
  BarElement, // Untuk Bar chart
  CategoryScale, // Untuk skala kategori (x-axis)
  LinearScale, // Untuk skala linier (y-axis)
  Tooltip, // Untuk tooltip
  Legend // Untuk legenda
);

const Grafik = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk menghasilkan warna dinamis
  const generateColors = (numColors) => {
    const colors = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];
    return Array.from(
      { length: numColors },
      (_, index) => colors[index % colors.length]
    );
  };

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const result = await products(
          JSON.parse(localStorage.getItem("data")).token
        );

        if (result.success) {
          setDataProducts(result.data);
        } else {
          setError("Failed to fetch product data.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    handleFetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-between items-strech mt-5">
      <CircleGrafik products={dataProducts} generateColors={generateColors} />
      <BarGrafik products={dataProducts} generateColors={generateColors} />
    </div>
  );
};

const BarGrafik = ({ products, generateColors }) => {
  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Price",
        data: products.map((product) => product.price),
        backgroundColor: generateColors(products.length),
        borderColor: generateColors(products.length).map((color) =>
          color.replace("0.2", "1")
        ),
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 200, // Sesuaikan skala y
        ticks: {
          stepSize: 20, // Atur jarak antar-tanda menjadi 20
        },
      },
    },
    maintainAspectRatio: false, // Membuat grafik lebih fleksibel
  };

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-5 lg:h-[610px] overflow-auto" id="chart-bar">
      <h2 className="text-center text-lg font-semibold mb-4">Product Price</h2>
      <Bar data={data} options={options}/>
    </div>
  );
};

const CircleGrafik = ({ products, generateColors }) => {
  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Stock",
        data: products.map((product) => product.stock),
        backgroundColor: generateColors(products.length),
        borderColor: generateColors(products.length).map((color) =>
          color.replace("0.2", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-5">
      <h2 className="text-center text-lg font-semibold mb-4">Stock Chart</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Grafik;
