async function googleAuth( token ) {
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/auth/google/callback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })

    const result = await response.json();

    if (!response.ok){
        console.log(response);
    }

    return result;
}

export default googleAuth;
