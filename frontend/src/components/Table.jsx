import React from "react";
import Loader from "./LazyLoader.jsx";
import { useNavigate } from "react-router-dom";

const Table = ({ onDelete, openEditModal, data, isLoading }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <p className="text-red-500 text-xl">No Data Available</p>;
  }

  const filteredData = data.filter((user) => user.role !== "ADMIN");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <table
          className="min-w-full bg-white border border-gray-300 mb-5"
          id="table"
        >
          <thead className="bg-[#023E8A] text-white">
            <tr>
              <th className="px-4 py-2 text-left border-r">No</th>
              <th className="px-4 py-2 text-left border-r">Username</th>
              <th className="px-4 py-2 text-center border-r">Email</th>
              <th className="px-4 py-2 text-left border-r">Role</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr
                key={`${user.id}-${index}`}
                className="border-t border-gray-300"
              >
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2 border-r">{user.name}</td>
                <td className="px-4 py-2 border-r">{user.email}</td>
                <td className="px-4 py-2 border-r">
                  <span>{user.role}</span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => navigate(`/edit-user/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
