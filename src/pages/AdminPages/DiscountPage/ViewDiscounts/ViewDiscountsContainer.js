import { useState, useEffect } from "react";
import {
  ViewDiscounts as fetchDiscounts,
  updateDiscount,
  removeDiscountOnProduct,
  removeDiscountOnCategory,
} from "../../../../Services/DiscountServices";

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
        const allDiscounts = [
          ...data.CategoryDiscounts,
          ...data.ProductDiscounts,
        ];

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
    console.log(discount);  
    const discountType = discount.categoryName ? "category" : "product"; 
    setEditingDiscount({
      ...discount,  // This should include the `discountId` field
      rate: discount.percentage || discount.rate,
      startDate: discount.begin || discount.startDate,
      endDate: discount.end || discount.endDate,
      discountType,  // Add discountType here
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
    if (!editingDiscount?.discountId) {
      console.error("Discount ID is missing", editingDiscount);
      return;
    }
  
    const { discountId, rate, startDate, endDate, discountType } = editingDiscount;
  
    if (!discountType) {
      console.error("Discount type is missing:", editingDiscount);
      return;
    }
    const updateData = {
      percentage: parseFloat(rate), 
      startDate,
      endDate,
    };
    
  
    console.log('Sending update:', { discountId, updateData, type: discountType });
  
    const result = await updateDiscount(discountType, discountId, updateData);
    console.log('Update result:', result);
  
    if (result.success) {
      setDiscounts((prevDiscounts) =>
        prevDiscounts.map((d) =>
          d.discountId === discountId
            ? { ...d, rate, startDate, endDate }
            : d
        )
      );
      const data = await fetchDiscounts(); 
      if (data.success !== false) {
        const allDiscounts = [
          ...data.CategoryDiscounts,
          ...data.ProductDiscounts,
        ];
        const sortedDiscounts = allDiscounts.sort((a, b) => {
          if (a.status === "expired" && b.status !== "expired") {
            return 1; 
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
      setEditDialogOpen(false);
    } else {
      alert("Failed to update discount: " + result.error);
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
        console.log(
          `Expiring category discount with ID: ${selectedDiscountId}`
        );
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
