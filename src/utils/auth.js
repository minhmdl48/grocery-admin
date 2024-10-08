export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('No token found');
      return null;
    }
    return token;
  };