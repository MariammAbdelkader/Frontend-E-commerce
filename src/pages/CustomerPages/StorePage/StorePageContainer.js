import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getSubcategories,
  getAllProducts,
} from "../../../Services/ProductServices";
import { addTocart } from "../../../Services/CartServices";

const StorePageContainer = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
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

  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const isCartOpen = Boolean(cartAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const handleCartClick = (event) => setCartAnchorEl(event.currentTarget);
  const handleCartClose = () => setCartAnchorEl(null);

  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleMenuClose = () => setProfileAnchorEl(null);
  const handleSignOut = () => navigate("/login");
  const handleProfile = () => navigate("/userprofile");

  const handleAddToCart = async (product) => {
    try {
      const quantity = 1;
      console.log("Sending to cart API:", {
        productId: product.productId,
        quantity,
      });

      const response = await addTocart({
        productId: product.productId,
        quantity,
      });

      console.log("Cart updated:", response.message);

      // Optional: Toast message
      // toast.success(response.message);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setError("Failed to add product to cart. Please try again.");
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  const removeItemFromCart = (productName) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.name === productName) {
          return item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null;
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedItems);
    setCartCount(
      updatedItems.reduce((count, item) => count + item.quantity, 0)
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const groupByCategory = (products) =>
    products.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

  const grouped = groupByCategory(products);

  return {
    cartCount,
    cartItems,
    handleAddToCart,
    handleProceedToCheckout,
    removeItemFromCart,
    grouped,
    products,
    categories,
    subcategories,
    filters,
    setFilters,
    error,
    cartAnchorEl,
    profileAnchorEl,
    isCartOpen,
    isProfileMenuOpen,
    handleCartClick,
    handleCartClose,
    handleProfileClick,
    handleMenuClose,
    handleSignOut,
    handleProfile,
  };
};

export default StorePageContainer;
