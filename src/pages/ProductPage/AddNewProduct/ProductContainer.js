import { useState, useRef } from "react";
import { uploadCSV, addProduct } from "../ProductServices";

const useProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    quantity: "",
    status: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProductData({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      quantity: "",
      status: "",
      description: "",
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await addProduct(formData);

      if (response.success) {
        alert("Product added successfully!");
        handleClose();
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the product");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      try {
        const response = await uploadCSV(file);
        console.log(response);
      } catch (error) {
        console.error("Error uploading CSV:", error);
      }
    }
  };

  return {
    open,
    loading,
    productData,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
  };
};

export default useProductContainer;
