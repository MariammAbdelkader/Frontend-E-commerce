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
} from "../../../../Services/ProductServices";

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

  const handleOpenDialog = (type, data) => {
    setDialog({ open: true, type, data });

    if (type === "editCategory" || type === "addCategory") {
      console.log("Opening dialog for type:", type, "with data:", data);
      setFormData({
        categoryName: data?.name || "",
        categoryId: data?.categoryId || "",
        subcategoryName: "",
        subcategoryId: "",
      });
    } else if (type === "editSubcategory" || type === "addSubcategory") {
      setFormData({
        subcategoryName: data?.name || "",
        subcategoryId: data?.subcategoryId || "",
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
    try {
      const result = await addCategory(formData.categoryName);
      if (result) {
        alert("Category added successfully!");
        fetchData();
      } else {
        alert("Failed to add category.");
      }
    } catch (error) {
      alert("Error adding category.");
      console.error(error);
    }
    handleCloseDialog();
  };

  const handleEditCategory = async () => {
    try {
      const result = await editCategory(
        formData.categoryId,
        formData.categoryName
      );
      if (result) {
        alert("Category updated successfully!");
        fetchData();
      } else {
        alert("Failed to update category.");
      }
    } catch (error) {
      alert("Error updating category.");
      console.error(error);
    }
    handleCloseDialog();
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const result = await deleteCategory(categoryId);
      if (result) {
        alert("Category deleted successfully!");
        fetchData();
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      alert("Error deleting category.");
      console.error(error);
    }
    handleCloseDialog();
  };

  const handleAddSubcategory = async () => {
    try {
      const result = await addSubCategory({
        name: formData.subcategoryName,
        categoryId: formData.categoryId,
      });
      if (result.success) {
        alert("Subcategory added successfully!");
        fetchData();
      } else {
        alert("Failed to add subcategory.");
      }
    } catch (error) {
      alert("Error adding subcategory.");
      console.error(error);
    }
    handleCloseDialog();
  };

  const handleEditSubcategory = async () => {
    try {
      const result = await editSubCategory(formData.subcategoryId, {
        name: formData.subcategoryName,
        categoryId: formData.categoryId,
      });
      if (result.success) {
        alert("Subcategory updated successfully!");
        fetchData();
      } else {
        alert("Failed to update subcategory.");
      }
    } catch (error) {
      alert("Error updating subcategory.");
      console.error(error);
    }
    handleCloseDialog();
  };

  const handleDeleteSubcategory = async () => {
    try {
      const result = await deleteSubCategory(dialog.data.subcategoryId);
      if (result.success) {
        alert("Subcategory deleted successfully!");
        fetchData();
      } else {
        alert("Failed to delete subcategory.");
      }
    } catch (error) {
      alert("Error deleting subcategory.");
      console.error(error);
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
