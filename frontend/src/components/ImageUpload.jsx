import React from "react";

const ImageUpload = ({ image, preview, handleImageChange }) => {

  return (
    <div className="flex w-full py-2 px-4 items-center border-b-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mr-4 max-w-1/2"
      />
      {preview && (
        <div className="flex-shrink-0">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-auto max-w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
