import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getSubcategories,
  getAllProducts,
} from "../../../Services/ProductServices";
import { addTocart, getCart } from "../../../Services/CartServices";

const StorePageContainer = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    subcategoryId: "",
    search: "",
    price: "",
  });
  const navigate = useNavigate();

  // Fetch Categories
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

  // Fetch Subcategories
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
    const fetchCart = async () => {
      try {
        const { products, totalPrice, totalQuantity } = await getCart();
        setCartItems(products || []);
        setTotalPrice(totalPrice || 0);
        setCartCount(totalQuantity);
      } catch (err) {
        console.error(err?.message || "Failed to fetch cart");
      }
    };
    fetchProducts();
    fetchCart();
  }, [filters]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { products, totalPrice, totalQuantity } = await getCart();
        setCartItems(products || []);
        setTotalPrice(totalPrice || 0);
        setCartCount(totalQuantity);
        setIsAddedToCart(false);
      } catch (err) {
        console.error(err?.message || "Failed to fetch cart");
      }
    };
    fetchCart();
  }, [isAddedToCart]);

  const handleAddToCart = async (product) => {
    try {
      const quantity = 1;
      const response = await addTocart({
        productId: product.productId,
        quantity,
      });
      setIsAddedToCart(true);

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

  const handleCategoryChange = (event) => {
    setFilters({
      ...filters,
      categoryId: Number(event.target.value),
      subcategoryId: "",
    });
  };

  const handleSubcategoryFilter = (event) => {
    setFilters({ ...filters, subcategoryId: Number(event.target.value) });
  };

  const goToProductDetail = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return {
    handleAddToCart,
    handleCategoryChange,
    handleSubcategoryFilter,
    cartItems,
    cartCount,
    totalPrice,
    grouped,
    products,
    categories,
    subcategories,
    filters,
    setFilters,
    goToProductDetail,
    selectedProduct,
    error,
  };
};

export default StorePageContainer;
