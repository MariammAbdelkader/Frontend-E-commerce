import { useState, useRef } from "react";
import { uploadCSV, addProduct } from "../ProductServices";

const useProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    status: "",
    description: "",
  });
  const fileInputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProductData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      status: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await addProduct(productData);

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
