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

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Grafik = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-strech mt-8 mx-4 lg:mx-8" id="grafik">
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
        max: 200,
        ticks: {
          stepSize: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-5 lg:h-[500px] overflow-hidden transform transition duration-300 hover:scale-105">
      <h2 className="text-center text-lg font-semibold mb-4">Product Price</h2>
      <div className="relative flex flex-col items-center lg:flex-row justify-center w-full h-64 lg:h-[360px]">
        <Bar data={data} options={options} />
      </div>
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
    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-5 transform transition duration-300 hover:scale-105">
      <h2 className="text-center text-lg font-semibold mb-4">Stock Chart</h2>
      <div className="relative flex justify-center w-full h-64 lg:h-[360px]">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Grafik;
