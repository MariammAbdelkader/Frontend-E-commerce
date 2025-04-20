import { useEffect, useState } from "react";
import {
  getCategories,
  getSubcategories,
  addCategory,
  editCategory,
  deleteCategory,
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
} from "../ProductServices";

const AllCategoriesContainer = () => {
  const [categories, setCategories] = useState([]);
  const [dialog, setDialog] = useState({ open: false, type: "", data: null });
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryId: "",
    subcategoryName: "",
    subcategoryId: "",
  });

  const fetchData = async () => {
    const fetchedCategories = await getCategories();
    const fetchedSubcategories = await getSubcategories();

    if (
      Array.isArray(fetchedCategories) &&
      Array.isArray(fetchedSubcategories)
    ) {
      const combined = fetchedCategories.map((cat) => ({
        ...cat,
        subcategories: fetchedSubcategories.filter(
          (sub) => sub.categoryId === cat.categoryId
        ),
      }));
      setCategories(combined);
    } else {
      console.error("Error fetching categories or subcategories");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (type, data = null) => {
    setDialog({ open: true, type, data });

    if (type === "editCategory" || type === "addCategory") {
      setFormData({
        categoryName: data?.categoryName || "",
        categoryId: data?.categoryId || "",
        subcategoryName: "",
        subcategoryId: "",
      });
    } else if (type === "editSubcategory" || type === "addSubcategory") {
      setFormData({
        subcategoryName: data?.name || "",
        subcategoryId: data?.id || "",
        categoryId: data?.categoryId || "",
        categoryName: "",
      });
    }
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, type: "", data: null });
    setFormData({
      categoryName: "",
      categoryId: "",
      subcategoryName: "",
      subcategoryId: "",
    });
  };

  const handleAddCategory = async () => {
    const result = await addCategory(formData.categoryName);
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  const handleEditCategory = async () => {
    const result = await editCategory(
      formData.categoryId,
      formData.categoryName
    );
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  const handleDeleteCategory = async () => {
    const result = await deleteCategory(dialog.data.categoryId);
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  const handleAddSubcategory = async () => {
    const result = await addSubCategory({
      name: formData.subcategoryName,
      categoryId: formData.categoryId,
    });
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  const handleEditSubcategory = async () => {
    const result = await editSubCategory(formData.subcategoryId, {
      name: formData.subcategoryName,
      categoryId: formData.categoryId,
    });
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  const handleDeleteSubcategory = async () => {
    const result = await deleteSubCategory(dialog.data.id);
    if (result.success) {
      fetchData();
    }
    handleCloseDialog();
  };

  return {
    categories,
    dialog,
    formData,
    setFormData,
    handleOpenDialog,
    handleCloseDialog,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
  };
};

export default AllCategoriesContainer;
