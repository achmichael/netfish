import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ items, onRemoveItem }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return items.reduce((total, item, index) => {
      if (checkedItems[index]) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckOut = () => {
    const selectedItems = items.filter((item, index) => checkedItems[index]);
    navigate("/checkout", { state: { selectedItems: selectedItems } });
  };

  const handleEditPesanan = (index, item) => {
    if (editingItem === index) {
      // setEditingItem(null);
      window.location.href = `/dashboard#products?edit=${item.id}`;
    } else {
      setEditingItem(index);
    }
  };

  const handleCheckBoxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems]; // CheckedItems adalah array baru yang dibuat dengan menyalin semua elemen dari array prevCheckedItems
      newCheckedItems[index] = !newCheckedItems[index]; // toggle checkbox status
      return newCheckedItems;
    });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg mt-3 p-4">
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckBoxChange(index)}
                    checked={!!checkedItems[index]}
                  />
                  <img
                    className="w-16 h-16 object-cover rounded-lg ml-4"
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">
                      {item.productName}
                    </h3>
                    <p className="text-gray-500 text-sm">Rp {item.price}.000</p>
                    <p className="text-gray-500 text-sm">
                      Jumlah barang : {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditPesanan(index, item)}
                    className={`${
                      editingItem === index
                        ? "bg-primary transform -translate-x-5"
                        : "bg-blue-500"
                    } text-white rounded-xl px-5 py-2 transition duration-300 ${
                      editingItem === index
                        ? "hover:bg-green-600"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {editingItem === index ? "Ubah" : "Edit"}
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id, index, item.productId)}
                    className="text-white px-3 py-2 bg-red-500 rounded-xl hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">
              Rp {calculateTotalPrice()}.000
            </span>
          </div>
          <button
            onClick={handleCheckOut}
            className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
