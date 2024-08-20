import Swal from "sweetalert2";
const verifyEmail = async (data) => {
    const response = await fetch(`http://localhost:3000/api/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok){
        Swal.fire({
            title: 'Failed to verify email',
            text: result.errors,
            icon: 'error',
            confirmButtonText: 'Try Again'
        })
    }

    return result;
}

export default verifyEmail;