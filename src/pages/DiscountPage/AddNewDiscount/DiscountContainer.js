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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      console.log(
        "Fetched Categories:",
        JSON.stringify(fetchedCategories, null, 2)
      );

      if (Array.isArray(fetchedCategories) && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);

        console.log(categories);
      } else {
        setErrorMessage("No categories available.");
      }
    };

    fetchData();
  }, []);

  const handleOpenCategoryDialog = async () => {
    setOpenCategoryDialog(true);
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
        setErrorMessage(
          result.error || "Unknown error occurred. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else if (error.request) {
        setErrorMessage(
          "Network error: No response from the server. Please check your internet connection."
        );
      } else {
        setErrorMessage("An error occurred: " + error.message);
      }
    }
  };

  const handleSaveProductDiscount = async () => {
    setLoading(true);
    try {
      const result = await AddDiscountOnProduct(
        productId,
        discountPercentage,
        startDate,
        endDate
      );
      setLoading(false);
      if (result.success) {
        setSuccessMessage("Discount applied successfully!");
        handleCloseProductDialog();
      } else {
        setErrorMessage(
          result.error || "Unknown error occurred. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else if (error.request) {
        setErrorMessage(
          "Network error: No response from the server. Please check your internet connection."
        );
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
    categories,
  };
};

export default useDiscount;
