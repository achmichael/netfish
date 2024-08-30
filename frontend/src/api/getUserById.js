const getUserById = async (id, token) => {
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/data/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const result = await response.json();

    if (!response.ok){
        throw new Error(result.errors)
    }

    return result;
}

export default getUserById;
