import Swal from "sweetalert2";

const success = ({ title, message, confirmButtonText }) => {
  Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonText,
    timer: 2000,
  });
};

const error = ({ title, message, confirmButtonText }) => {
  Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonText,
    timer: 2000,
  });
};

export { success, error };
