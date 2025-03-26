export const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch("https://localhost:5000/auth/protected", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      return response.ok;
    } catch (error) {
      console.error("Error checking auth:", error);
      return false;
    }
  };
  