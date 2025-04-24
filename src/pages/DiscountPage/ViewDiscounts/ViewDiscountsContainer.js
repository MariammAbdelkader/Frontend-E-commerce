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
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);

  const getStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return end < today ? "Expired" : "Active";
  };

  useEffect(() => {
    const getDiscounts = async () => {
      const data = await fetchDiscounts();
      if (data.success !== false) {
        const allDiscounts = [...data.CategoryDiscounts, ...data.ProductDiscounts];
        setDiscounts(allDiscounts);
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
      console.error("No discount selected for deletion.");
      return;
    }

    const type = selectedDiscountType;
    let result;

    if (type === "product") {
      result = await removeDiscountOnProduct(selectedDiscountId);
    } else if (type === "category") {
      result = await removeDiscountOnCategory(selectedDiscountId);
    }

    if (result.success) {
      setDiscounts((prev) => prev.filter((d) => d.id !== selectedDiscountId));
      setConfirmDialogOpen(false);
      setSelectedDiscountId(null);
      setSelectedDiscountType(null);
    } else {
      console.error("Failed to delete the discount:", result.error);
    }
  };

  return {
    discounts,
    editDialogOpen,
    editingDiscount,
    confirmDialogOpen,
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
  };
};

export default useViewDiscounts;
