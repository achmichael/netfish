const updateUser = async (user, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/data/users/${user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    }
  );

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.errors);
  }

  return result;
};

export default updateUser;
