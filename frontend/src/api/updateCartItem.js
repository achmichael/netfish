const updateCartItem = async (cartId, token, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/users/cart/${cartId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result.errors);
  }

  return result;
};

export default updateCartItem;
