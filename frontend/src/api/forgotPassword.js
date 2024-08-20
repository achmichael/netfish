import Swal from "sweetalert2";
const forgotPassword = async (data) => {
    const response = await fetch('http://localhost:3000/api/forgot-password', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log(result)
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

export default forgotPassword;