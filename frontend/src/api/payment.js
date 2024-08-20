import Swal from "sweetalert2";
export default async function payment(data) {

  const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong, please try again later.",
      confirmButtonText: "Try again",
    });
    return;
  }

  const result = await response.json();
  return result;
}
