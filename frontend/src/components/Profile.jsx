import React, { useEffect, useState } from "react";
import logout from "../api/logout.js";
import Swal from "sweetalert2";

const ProfileCard = ({ name, isVisible, onClose, profileButtonRef, email }) => {
  const [sourceImage, setSourceImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setSourceImage(data.image);
    setDefaultImage(
      "https://th.bing.com/th?id=OIP.qd-FmnNIgg7JhWtnZCss5gHaFK&w=299&h=208&c=8&rs=1&qlt=90&o=6&cb=13&dpr=1.3&pid=3.1&rm=2"
    );
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      Swal.fire({
        title: "Success",
        text: result.message,
        icon: "success",
        confirmButtonText: "Okay",
      }).then((response) => {
        if (response.isConfirmed) {
          window.location.href = "/";
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };
  if (!isVisible || !profileButtonRef.current) {
    return null;
  }
  // Get the position of the profile button to position the dropdown menu relative to it
  const buttonRect = profileButtonRef.current.getBoundingClientRect();

  return (
    <div
      className="fixed inset-2 z-50 max-w-xs"
      style={{
        top: buttonRect.bottom + 10, // Position below the button with a small offset
        left: buttonRect.right - 320, // Align to the right side of the button
      }}
    >
      <div className="bg-white p-7 rounded-xl shadow-xl relative max-w-xs w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <p className="text-lg mb-4 font-semibold text-center">{email}</p>
          {sourceImage ? (
            <img
              src={sourceImage}
              alt="Profile"
              className="rounded-full w-30 h-30 mb-4"
            />
          ) : (
            <img
              src={defaultImage}
              alt=""
              className="rounded-full w-30 h-30 mb-4"
            />
          )}
          <h2 className="text-xl font-semibold">Haloo, {name}</h2>
          <button
            className="mt-4 rounded-3xl bg-[#023E8A] text-white py-2 px-4 hover:bg-[#08346e]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
