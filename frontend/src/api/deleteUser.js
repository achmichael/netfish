const deleteUser = async (userId, token) => {
    const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/data/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    const result = await response.json();

    
    if (!response.ok){
        throw new Error(result.errors)
    }

    return result;
}

export default deleteUser;