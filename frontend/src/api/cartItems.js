import Swal from "sweetalert2";

const getCartItems = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/users/cart`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    Swal.fire({
      title: "Error",
      text: result.message,
      icon: "error",
    });
    return;
  }
  return result;
};

const addProductToCart = async (data, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/users/cart`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    Swal.fire({
      title: "Error",
      text: result.message,
      icon: "error",
    });
    return;
  }

  return result;
};

const updateCartItemsQuantity = async (data, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/users/cart`,
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
    Swal.fire({
      title: "Error",
      text: result.message,
      icon: "error",
    });
    return;
  }

  return result;
};

const deleteCartItem = async (cart_id, productId ,token) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/users/cart/${cart_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({productId: productId})
    }
  );

  const result = await response.json();

  if (!response.ok) {
    Swal.fire({
      title: "Error",
      text: result.message,
      icon: "error",
    });
    return;
  }

  return result;
};

export { getCartItems, addProductToCart, updateCartItemsQuantity, deleteCartItem };
