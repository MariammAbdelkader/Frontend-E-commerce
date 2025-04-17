import { useState, useEffect, useRef } from "react";
import {
  uploadCSV,
  addProduct,
  getCategories,
  getSubcategories,
} from "../ProductServices";

const useProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

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

  // Fetch categories and subcategories on mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      const fetchedSubCategories = await getSubcategories();
      if (Array.isArray(fetchedCategories)) setCategories(fetchedCategories);
      if (Array.isArray(fetchedSubCategories)) setAllSubCategories(fetchedSubCategories);
    };

    fetchData();
  }, []);

  // Update filtered subcategories based on selected category
  useEffect(() => {
    const filtered = allSubCategories.filter(
      (sub) => String(sub.categoryId) === String(productData.category)
    );
    setFilteredSubCategories(filtered);
  
    if (!filtered.some((sub) => sub.subcategoryId === productData.subcategory)) {
      setProductData((prev) => ({ ...prev, subcategory: "" }));
    }
  }, [productData.category, allSubCategories]);
  

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
  
    console.log(`Changing ${name} to:`, value); // 👈 debug
  
    if (name === "category") {
      setProductData((prev) => ({
        ...prev,
        category: String(value),
        subcategory: "", // reset subcategory when category changes
      }));
    } else if (name === "subcategory") {
      setProductData((prev) => ({
        ...prev,
        subcategory: String(value),
      }));
    } else if (name === "image") {
      setProductData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Submitting productData:", productData);
  
      const formData = new FormData();
  
      // Handle all fields except image
      Object.entries(productData).forEach(([key, value]) => {
        if (key !== "image" && value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
  
      // Append image separately if it exists
      if (productData.image) {
        formData.append("image", productData.image);
      }
  
      // Log FormData to confirm it's not empty
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
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
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
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
    categories,
    subCategories: filteredSubCategories,
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
