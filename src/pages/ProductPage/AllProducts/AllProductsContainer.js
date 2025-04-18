import { useState, useEffect } from "react";
import {
  getAllProducts,
  editProduct,
  deleteProduct,
  getCategories,
} from "../ProductServices";

const useProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [priceFilter, setPriceFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    status: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (Array.isArray(result)) {
        setProducts(result);
      } else {
        setProducts([]);
      }
    };

    const fetchCategories = async () => {
      const result = await getCategories();
      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        setCategories([]);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const getFilteredProducts = () => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchesPrice =
        priceFilter === "" ||
        parseFloat(product.price) <= parseFloat(priceFilter);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceFilter = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) || value === "") {
      setPriceFilter(value);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setOpenDialog(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSaveEdit = async () => {
    const result = await editProduct(selectedProduct.id, formData);
    if (result.success) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...formData }
            : product
        )
      );
      setOpenDialog(false);
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
      const result = await deleteProduct(productToDelete.id);
      if (result) {
        setOpenDeleteDialog(false);
        setProductToDelete(null);

        setProducts(
          products.filter((product) => product.id !== productToDelete.id)
        );
      }
    }
  };

  return {
    openDialog,
    products: getFilteredProducts(),
    categories,
    searchTerm,
    categoryFilter,
    priceFilter,
    formData,
    selectedProduct,
    openDeleteDialog,
    productToDelete,
    handleSearch,
    handleCategoryFilter,
    handlePriceFilter,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleSaveEdit,
    setOpenDialog,
    handleDeleteConfirmation,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
};

export default useProductContainer;
