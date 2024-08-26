import { error } from "../Config/Response.js";
const addProduct = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/products`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.product),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 403) {
      error({
        title: "Unauthorized",
        message: "You are not authorized to perform this action.",
        confirmButtonText: "Okay",
      });
      return;
    }
    return;
  }
  return result;
};

export default addProduct;
