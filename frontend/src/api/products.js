import Swal from "sweetalert2";

const products = async ( token ) => {
  const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/products`, {
    method: 'GET',
    headers: {
        'Authorization' : `Bearer ${token}`
    }
  });
  const result = await response.json();

  if (!response.ok) {
    Swal.fire({
      title: "Error",
      text: result.errors,
      icon: "error",
      confirmButtonText: "Try again",
    });
    return;
  }
  return result;

};

export default products;
