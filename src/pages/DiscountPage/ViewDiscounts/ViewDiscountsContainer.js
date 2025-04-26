import { useState, useEffect } from "react";
import {
  ViewDiscounts as fetchDiscounts,
  updateDiscount,
  removeDiscountOnProduct,
  removeDiscountOnCategory,
} from "../DiscountServices";

const useViewDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);

  const getStatus = (discount) => {
    if (!discount.status) return "Unknown";
    return discount.status.charAt(0).toUpperCase() + discount.status.slice(1);
  };

  useEffect(() => {
    const getDiscounts = async () => {
      const data = await fetchDiscounts();
      if (data.success !== false) {
        const allDiscounts = [...data.CategoryDiscounts, ...data.ProductDiscounts];

        // Sort discounts to move expired ones to the bottom
        const sortedDiscounts = allDiscounts.sort((a, b) => {
          if (a.status === "expired" && b.status !== "expired") {
            return 1; // Move expired discount to the bottom
          }
          if (a.status !== "expired" && b.status === "expired") {
            return -1; // Keep non-expired discounts at the top
          }
          return 0; // No change if both have the same status
        });

        setDiscounts(sortedDiscounts);
      } else {
        console.error(data.error);
      }
    };
    getDiscounts();
  }, []);

  const handleEdit = (discount) => {
    setEditingDiscount({
      ...discount,
      rate: discount.percentage || discount.rate,
      startDate: discount.begin || discount.startDate,
      endDate: discount.end || discount.endDate,
    });
    setEditDialogOpen(true);
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setEditingDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { id, rate, startDate, endDate } = editingDiscount;
    const updateData = { rate, startDate, endDate };
    const type = selectedDiscountType;

    const result = await updateDiscount(type, id, updateData);
    if (result.success) {
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === editingDiscount.id ? { ...editingDiscount, rate } : d
        )
      );
      setEditDialogOpen(false);
    } else {
      console.error(result.error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedDiscountId || !selectedDiscountType) {
      console.error("No discount selected for expiration.");
      return;
    }
  
    let result;
  
    try {
      console.log("Attempting to expire discount...");
      if (selectedDiscountType === "product") {
        console.log(`Expiring product discount with ID: ${selectedDiscountId}`);
        result = await removeDiscountOnProduct(selectedDiscountId);
      } else if (selectedDiscountType === "category") {
        console.log(`Expiring category discount with ID: ${selectedDiscountId}`);
        result = await removeDiscountOnCategory(selectedDiscountId);
      }
  
      console.log("API result:", result); 
  
      if (result && result.message) {
        console.log("Message from API:", result.message); 
  
        if (result.message.toLowerCase().includes("terminated")) {
          console.log("Success detected in message!");
          setSnackbarMessage("Discount expired successfully!");
          setSnackbarOpen(true);
          setTimeout(() => {
            console.log("Closing confirmation dialog...");
            setConfirmDialogOpen(false);
            setSelectedDiscountId(null);
            setSelectedDiscountType(null);
          }, 2000); // Delay for 2 seconds to show Snackbar before closing dialog
        } else {
          console.error("Failed to expire the discount: ", result.message);
          setConfirmDialogOpen(false); 
        }
      } else {
        console.error("Invalid response structure:", result);
        setConfirmDialogOpen(false); // Handle invalid response
      }
    } catch (error) {
      console.error("Error during discount expiration:", error);
      setConfirmDialogOpen(false); // Close dialog on error
    }
  };
  
  return {
    discounts,
    editDialogOpen,
    editingDiscount,
    confirmDialogOpen,
    snackbarOpen,
    snackbarMessage,
    selectedDiscountId,
    selectedDiscountType,
    getStatus,
    handleEdit,
    handleDialogChange,
    handleSave,
    confirmDelete,
    setEditDialogOpen,
    setConfirmDialogOpen,
    setSelectedDiscountId,
    setSelectedDiscountType,
    setSnackbarOpen,
    setSnackbarMessage,
  };
};

export default useViewDiscounts;
