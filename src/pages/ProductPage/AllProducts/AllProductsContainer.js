import { useState, useEffect } from "react";
import {
  getAllProducts,
  editProduct,
  deleteProduct,
  getCategories,
  getSubcategories,
  getProductReviews,
} from "../ProductServices";

const useProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "All",
    subcategory: "All",
    price: "",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    status: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [selectedReviewProduct, setSelectedReviewProduct] = useState(null);
  const currentReview = reviews[currentReviewIndex];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if (Array.isArray(result)) {
          setCategories(result);
        } else {
          setCategories([]);
        }
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const result = await getSubcategories();
        if (Array.isArray(result)) {
          if (filters.category !== "All") {
            const filtered = result.filter(
              (sub) => String(sub.categoryId) === String(filters.category)
            );
            setSubcategories(filtered);
          } else {
            setSubcategories(result);
          }
        } else {
          setSubcategories([]);
        }
      } catch (err) {
        setError("Failed to fetch subcategories. Please try again later.");
        console.error(err);
      }
    };

    fetchSubcategories();
  }, [filters.category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts(filters);
        if (Array.isArray(result)) {
          setProducts(result);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleSearch = (event) => {
    setFilters({ ...filters, searchTerm: event.target.value });
  };

  const handleCategoryFilter = (event) => {
    setFilters({ ...filters, category: String(event.target.value) });
  };

  const handleSubcategoryFilter = (event) => {
    setFilters({ ...filters, subcategory: String(event.target.value) });
  };

  const handlePriceFilter = (event) => {
    const value = event.target.value;
    setPrice(value);

    if (value === "" || (!isNaN(value) && Number(value) > 0)) {
      setFilters({ ...filters, price: value });
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setOpenDialog(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: String(value),
        subcategory: "",
      }));
    } else if (name === "subCategory") {
      setFormData((prev) => ({
        ...prev,
        subcategory: String(value),
      }));
    } else if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (["price", "quantity"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        images: [
          {
            url: imageUrl,
            isMasterImage: true,
          },
        ],
      }));
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      status: "",
      description: "",
      image: null,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const categoryObj = categories.find(
        (c) => c.categoryId.toString() === formData.category
      );
      const subcategoryObj = subcategories.find(
        (sc) => sc.subcategoryId.toString() === formData.subcategory
      );

      const productDataToSend = {
        ...formData,
        category: categoryObj?.name || formData.category,
        subcategory: subcategoryObj?.name || formData.subcategory,
      };

      const response = await editProduct(productDataToSend);

      if (response) {
        alert("Product edited successfully!");
        handleClose();
      } else {
        alert("Failed to edit product.");
      }
    } catch (err) {
      setError(
        "An error occurred while editing the product. Please try again."
      );
      console.error(err);
    }
  };

  const handleDeleteConfirmation = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        const result = await deleteProduct(productToDelete.id);
        if (result) {
          setOpenDeleteDialog(false);
          setProductToDelete(null);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productToDelete.id)
          );
        }
      } catch (err) {
        setError(
          "An error occurred while deleting the product. Please try again."
        );
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async (productId) => {
      try {
        const result = await getProductReviews(productId);
        if (Array.isArray(result)) {
          setReviews(result);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Failed to fetch reviews.", err);
      }
    };

    if (selectedReviewProduct) {
      fetchReviews(selectedReviewProduct.id); // Replace with actual product ID if available
    }
  }, [selectedReviewProduct]);

  const handleOpenReviewDialog = (product) => {
    setSelectedReviewProduct(product);
    setReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  // if (!currentReview) {
  //   return null;
  // }

  return {
    openDialog,
    products,
    categories,
    subcategories,
    filters,
    formData,
    selectedProduct,
    openDeleteDialog,
    productToDelete,
    error,
    handleSearch,
    handleCategoryFilter,
    handleSubcategoryFilter,
    price,
    handlePriceFilter,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleSaveEdit,
    setOpenDialog,
    handleDeleteConfirmation,
    handleDeleteCancel,
    handleDeleteConfirm,
    reviews,
    reviewDialogOpen,
    currentReviewIndex,
    handleOpenReviewDialog,
    handleCloseReviewDialog,
    handleNextReview,
    handlePreviousReview,
    currentReview,
  };
};

export default useProductContainer;
