export const logout = async (): Promise<void> => {
    try {
      const response = await fetch("https://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Include the cookies
      });
  
      if (response.ok) {
        console.log("Logout successful");
        // Redirect to the login page after logout
        window.location.href = "/";  // Or you can use navigate("/") if using react-router
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  