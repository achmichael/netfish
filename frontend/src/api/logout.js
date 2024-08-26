const logout = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/logout`
  );
  if (!response.ok) {
      throw new Error("Failed to log out");
  }

  localStorage.clear();

  sessionStorage.clear();
   
  return response.json();
};

export default logout;
