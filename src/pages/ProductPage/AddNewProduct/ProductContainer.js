import { useState, useRef, useEffect } from "react";

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

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const fileInputRef = useRef();

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

  const { category, subcategory } = productData;

  useEffect(() => {
    const allSubCategories =
      JSON.parse(localStorage.getItem("subCategories")) || [];

    const filtered = allSubCategories.filter(
      (sub) => sub.categoryId === category
    );

    setFilteredSubCategories(filtered);

    if (!filtered.some((sub) => sub.name === subcategory)) {
      setProductData((prev) => ({ ...prev, subcategory: "" }));
    }
  }, [category, subcategory]);

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
    filteredSubCategories,
  };
};

export default useProductContainer;
