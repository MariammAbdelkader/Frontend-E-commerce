import { useState, useEffect, useRef } from "react";
import {
  uploadCSV,
  addProduct,
  getCategories,
  getSubcategories,
} from "../../../../Services/ProductServices";

const useProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    quantity: "",
    status: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      const fetchedSubCategories = await getSubcategories();
      if (Array.isArray(fetchedCategories)) setCategories(fetchedCategories);
      if (Array.isArray(fetchedSubCategories))
        setAllSubCategories(fetchedSubCategories);
    };

    fetchData();
  }, []);

  // Update filtered subcategories based on selected category
  useEffect(() => {
    const filtered = allSubCategories.filter(
      (sub) => String(sub.categoryId) === String(productData.category)
    );
    setFilteredSubCategories(filtered);

    setProductData((prev) => ({
      ...prev,
      subCategory: "",
    }));
  }, [productData.category, allSubCategories]);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setProductData({
      name: "",
      category: "",
      subCategory: "",
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
        subCategory: "", // reset subcategory when category changes
      }));
    } else if (name === "subCategory") {
      setProductData((prev) => ({
        ...prev,
        subCategory: String(value),
      }));
      console.log(productData);
    } else if (name === "image") {
      setProductData((prev) => ({ ...prev, image: files[0] }));
    } else if (["price", "quantity"].includes(name)) {
      // ✅ parse numeric fields
      setProductData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
  //   if (
  //   !productData.name ||
  //   !productData.category ||
  //   !productData.subCategory ||
  //   productData.price === "" ||
  //   productData.quantity === "" ||
  //   !productData.status
  // ) {
  //   alert("Please fill required fields.");
  //   setLoading(false);
  //   return;
  // }
    try {
      const categoryObj = categories.find(
        (c) => c.categoryId.toString() === productData.category
      );
      const subcategoryObj = allSubCategories.find(
        (sc) => sc.subcategoryId.toString() === productData.subCategory
      );

      // 📦 Prepare data to send
      const productDataToSend = {
        ...productData,
        category: categoryObj?.categoryId || productData.category,
        subCategory: subcategoryObj?.subcategoryId || productData.subCategory,
      };

      // console.log("Sending this data:", productDataToSend);

      const response = await addProduct(productDataToSend);

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
        if (response) {
          alert(response);
        }
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
