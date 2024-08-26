const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/uploads/upload-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export default uploadImage;
