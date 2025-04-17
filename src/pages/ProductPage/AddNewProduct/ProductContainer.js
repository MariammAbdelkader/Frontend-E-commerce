import { useState, useEffect, useRef } from "react";
import { getCategories, getSubcategories } from "../ProductServices"; // Importing the functions

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
    image: "",
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [subCategories, setSubCategories] = useState([]); // State for all subcategories
  const [filteredSubCategories, setFilteredSubCategories] = useState([]); // State for filtered subcategories

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories(); // Fetch categories
        setCategories(fetchedCategories);

        const fetchedSubCategories = await getSubcategories(); // Fetch subcategories
        setSubCategories(fetchedSubCategories);
      } catch (error) {
        console.error("Error fetching categories and subcategories", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter subcategories based on the selected category
    const filtered = subCategories.filter((sub) => sub.categoryId === productData.category);
    setFilteredSubCategories(filtered);

    // Reset subcategory if it's not in the filtered list
    if (!filtered.some((sub) => sub.name === productData.subcategory)) {
      setProductData((prev) => ({ ...prev, subcategory: "" }));
    }
  }, [productData.category, subCategories, productData.subcategory]);

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
      image: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "category") {
      setProductData((prev) => ({
        ...prev,
        category: value,
        subcategory: "",
      }));
    } else if (name === "image") {
      setProductData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("CSV uploaded:", file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      console.log("Submitted:", productData);
    }, 1000);
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
    categories,
    filteredSubCategories,
  };
};

export default useProductContainer;
