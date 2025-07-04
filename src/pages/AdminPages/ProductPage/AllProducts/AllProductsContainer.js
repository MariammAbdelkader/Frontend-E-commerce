import { useState, useEffect } from "react";
import {
  getAllProducts,
  editProduct,
  deleteProduct,
  getCategories,
  getSubcategories,
  getProductReviews,
} from "../../../../Services/ProductServices";

const useProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    categoryId: "",
    subcategoryId: "",
    price_lt: "",
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
    quantity: null,
    description: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [selectedReviewProduct, setSelectedReviewProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshToggle, setRefreshToggle] = useState(false);

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
          if (filters.categoryId !== "") {
            const filtered = result.filter(
              (sub) => String(sub.categoryId) === String(filters.categoryId)
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
  }, [filters.categoryId]);

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
  }, [filters, refreshToggle]);

  const handleSearch = (event) => {
    setFilters({ ...filters, searchTerm: event.target.value });
  };

  const handleCategoryFilter = (event) => {
    setFilters({
      ...filters,
      categoryId: Number(event.target.value),
      subcategoryId: "",
    });
  };

  const handleSubcategoryFilter = (event) => {
    setFilters({ ...filters, subcategoryId: Number(event.target.value) });
  };

  const handlePriceFilter = (event) => {
    const value = event.target.value;
    setPrice(value);

    if (value === "" || (!isNaN(value) && Number(value) > 0)) {
      setFilters({ ...filters, price_lt: Number(value) });
    }
  };
const handleEdit =async  (product) => {
  setSelectedProduct(product);

    const fetchedCategories = await getCategories();
    const fetchedSubCategories = await getSubcategories();
  // Find category by name
  const selectedCategory = fetchedCategories.find(
    (cat) => cat.name === product.category
  );
  const categoryId = selectedCategory?.categoryId;

  // Find subcategory by name inside the selected category
  const selectedSubcategory = fetchedSubCategories.find(
    (sub) => sub.name === product.subcategory
  );
  const subcategoryId = selectedSubcategory?.subcategoryId;

  // Set form data with updated category & subcategory IDs
  setFormData({
    ...product,
    category: String(categoryId || ""),
    subcategory: String(subcategoryId || ""),
  });

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
      quantity: "",
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
        category: categoryObj?.categoryId || formData.category,
        subcategory: subcategoryObj?.subcategoryId || formData.subcategory,
      };

      const response = await editProduct(
        selectedProduct.productId,
        productDataToSend
      );

      if (response) {
        alert("Product edited successfully!");
        handleClose();
        setRefreshToggle((prev) => !prev);
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
        const result = await deleteProduct(productToDelete.productId);
        if (result.success) {
          alert(result.message);
          setOpenDeleteDialog(false);
          setProductToDelete(null);
          setRefreshToggle((prev) => !prev);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productToDelete.id)
          );
        } else {
          alert(result.error);
          setOpenDeleteDialog(false);
        }
      } catch (err) {
        alert(
          "An error occurred while deleting the product. Please try again."
        );
        setOpenDeleteDialog(false);
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async (productId) => {
      setLoading(true);
      try {
        const result = await getProductReviews(productId);
        if (result) {
          setReviews(result);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Failed to fetch reviews.", err);
        setReviews([]);
      }
      setLoading(false);
    };

    if (selectedReviewProduct) {
      fetchReviews(selectedReviewProduct.productId);
    }
  }, [selectedReviewProduct]);

  const handleOpenReviewDialog = (product) => {
    setSelectedReviewProduct(product);
    setOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setOpen(false);
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const current = reviews[currentIndex];

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
    current,
    handlePrev,
    handleNext,
    currentIndex,
    open,
    loading,
    reviews,
    handleOpenReviewDialog,
    handleCloseReviewDialog,
  };
};

export default useProductContainer;
