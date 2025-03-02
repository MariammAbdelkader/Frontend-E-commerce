const API_BASE_URL = "https://your-backend-api.com";

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
