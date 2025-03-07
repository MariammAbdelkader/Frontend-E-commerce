const API_BASE_URL = "http://localhost:3000";

export const signupUser = async (userData) => {
  try {
    console.log("FROM SERVICES FRONT END")
    console.log(userData)
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
