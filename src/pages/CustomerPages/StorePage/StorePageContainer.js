import { useState, useEffect } from "react";
import {
  getCategories,
  getSubcategories,
  getAllProducts,
} from "../../../Services/ProductServices";
import { addTocart } from "../../../Services/CartServices";

const StorePageContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    subcategoryId: "",
    search: "",
    price: "",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const result = await getSubcategories();
        const filtered = filters.categoryId
          ? result.filter(
              (sub) => String(sub.categoryId) === String(filters.categoryId)
            )
          : result;
        setSubcategories(Array.isArray(filtered) ? filtered : []);
      } catch (err) {
        setError("Failed to fetch subcategories. Please try again later.");
        console.error(err);
      }
    };
    fetchSubcategories();
  }, [filters.categoryId]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAllProducts(filters);
        setProducts(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleAddToCart = async (product) => {
    try {
      const quantity = 1;
      const response = await addTocart({
        productId: product.productId,
        quantity,
      });

      console.log("Cart updated:", response.message);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setError("Failed to add product to cart. Please try again.");
    }
  };

  const groupByCategory = (products) =>
    products.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

  const grouped = groupByCategory(products);

  return {
    handleAddToCart,
    grouped,
    products,
    categories,
    subcategories,
    filters,
    setFilters,
    error,
  };
};

export default StorePageContainer;
