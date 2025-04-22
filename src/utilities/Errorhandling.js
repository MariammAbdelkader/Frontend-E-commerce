export const handleError = (error) => {
    return {
        success: false,
        error:
        error.response?.data?.message ||
        error.message ||
        "Server error. Please try again.",
    };
};