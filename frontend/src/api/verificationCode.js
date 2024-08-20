import Swal from "sweetalert2";

const resendVerificationCode = async (data) => {
  const response = await fetch(
    "http://localhost:3000/api/resend-verification-code",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

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


export default resendVerificationCode;