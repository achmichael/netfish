import Swal from "sweetalert2";
const login = async (data) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    Swal.fire({
      title: "Login Failed",
      text: result.errors,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }
  
  return result;
};

export default login;
