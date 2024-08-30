const deleteProduct = async (id, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/products/product/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.errors);
    return;
  }

  return result;
};

export default deleteProduct;
