export default {
    async authenticated() {
      try {
        // Call the backend endpoint to verify authentication
        const response = await fetch('http://localhost:3000/auth/authenticate', {
          credentials: 'include', // Ensure cookies (JWT) are sent with the request
        });
        const data = await response.json();
        // Return true if authenticated, false otherwise
        return data.authenticated === true;
      } catch (error) {
        console.error("Error during authentication check:", error);
        return false; // Default to not authenticated if an error occurs
      }
    },
  };