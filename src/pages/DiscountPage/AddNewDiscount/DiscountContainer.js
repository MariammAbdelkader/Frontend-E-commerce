import { useEffect, useState } from "react";
import {
  AddDiscountOnProduct,
  AddDiscountOnCategory,
} from "../DiscountServices";
import { getCategories } from "../../ProductPage/ProductServices";

const useDiscount = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories only once when the component mounts
  useEffect(() => {
  }, []);

  const handleOpenCategoryDialog = async () => {
    setOpenCategoryDialog(true);

    // Fetch categories only when the dialog opens
    try {
      const fetchedCategories = await getCategories();
      console.log("Fetched Categories:", JSON.stringify(fetchedCategories, null, 2));

      if (Array.isArray(fetchedCategories) && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
      } else {
        setErrorMessage("No categories available.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch categories.");
    }
  };

  const handleCloseCategoryDialog = () => {
    setCategory("");
    setDiscountPercentage("");
    setStartDate("");
    setEndDate("");
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(false);
    setOpenCategoryDialog(false);
  };

  const handleOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setProductId("");
    setDiscountPercentage("");
    setStartDate("");
    setEndDate("");
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(false);
    setOpenProductDialog(false);
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 0 && value <= 100)) {
      setDiscountPercentage(value);
    }
  };

  const handleSaveCategoryDiscount = async () => {
    setLoading(true);
    try {
      const result = await AddDiscountOnCategory(
        category,
        discountPercentage,
        startDate,
        endDate
      );
      setLoading(false);
      if (result.success) {
        setSuccessMessage("Discount applied successfully!");
        handleCloseCategoryDialog();
      } else {
        setErrorMessage(result.error || "Unknown error occurred. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      } else if (error.request) {
        setErrorMessage("Network error: No response from the server. Please check your internet connection.");
      } else {
        setErrorMessage("An error occurred: " + error.message);
      }
    }
  };

  const handleSaveProductDiscount = async () => {
    setLoading(true);
    try {
      // Debugging: Log productId and other values before the API call
      console.log("Saving product discount", {
        productId,
        discountPercentage,
        startDate,
        endDate,
      });

      const result = await AddDiscountOnProduct(
        productId,
        discountPercentage,
        startDate,
        endDate
      );

      setLoading(false);
      console.log("API result:", result);

      // Debugging: Check if a discount exists already
      if (result.success) {
        setSuccessMessage("Discount applied successfully!");
        handleCloseProductDialog();
      } else {
        console.log("Error message from API:", result.error);
        setErrorMessage(result.error || "Unknown error occurred. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      } else if (error.request) {
        setErrorMessage("Network error: No response from the server. Please check your internet connection.");
      } else {
        setErrorMessage("An error occurred: " + error.message);
      }
    }
  };

  return {
    openCategoryDialog,
    openProductDialog,
    category,
    discountPercentage,
    startDate,
    endDate,
    productId,
    loading,
    errorMessage,
    successMessage,
    categories,
    handleOpenCategoryDialog,
    handleCloseCategoryDialog,
    handleOpenProductDialog,
    handleCloseProductDialog,
    handleDiscountChange,
    handleSaveCategoryDiscount,
    handleSaveProductDiscount,
    setCategory,
    setProductId,
    setStartDate,
    setEndDate,
  };
};

export default useDiscount;
