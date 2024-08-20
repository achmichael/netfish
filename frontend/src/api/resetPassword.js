import Swal from "sweetalert2";

const resetPassword = async (data) => {
    const response = await fetch('http://localhost:3000/api/reset-password', {
        method : "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)   
    });

    const result = await response.json();
    if (!response.ok){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.errors,
            confirmButtonText: 'Try again'
        })
        return;
    }
    return result;
}

export default resetPassword;