import { useState, useEffect } from "react";
import { getAllProducts, editProduct, deleteProduct } from "../ProductServices";

const useProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
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
      if (result.success) {
        setProducts(result.products);
      } else {
        console.error(result.error);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
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
    } else {
      console.error(result.error);
    }
  };

  const handleRemove = async (productId) => {
    const result = await deleteProduct(productId);
    if (result.success) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } else {
      console.error(result.error);
    }
  };

  return {
    openDialog,
    products: getFilteredProducts(),
    searchTerm,
    categoryFilter,
    statusFilter,
    formData,
    selectedProduct,
    handleSearch,
    handleCategoryFilter,
    handleStatusFilter,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleSaveEdit,
    handleRemove,
    setOpenDialog,
  };
};

export default useProductContainer;
