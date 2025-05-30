import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../Services/CartServices";
import { logout } from "../../Services/LogoutServices";
import { getCustomerProfile } from "../../Services/CustomerServices";

const useNavbarContainer = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const isCartOpen = Boolean(cartAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const handleMenuClose = () => setProfileAnchorEl(null);
  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleCartClick = (event) => setCartAnchorEl(event.currentTarget);
  const handleCartClose = () => setCartAnchorEl(null);

  const handleSignOut = async () => {
    const res = await logout();
    if (res.success) navigate("/login");
  };

  const handleProfile = () => {
    navigate("/userprofile", { state: { profileData: profileData } });
    handleMenuClose();
  };

  const handleLinkClick = (path) => navigate(path);
  const handleProceedToCheckout = () => {
    navigate("/checkout");
    handleCartClose();
  };

  const removeItemFromCart = (itemName) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { products, totalPrice, totalQuantity } = await getCart();
        console.log(products, totalPrice, totalQuantity);
        setCartItems(products || []);
        setTotalPrice(totalPrice || 0);
        setCartCount(totalQuantity);
      } catch (err) {
        console.error(err?.message || "Failed to fetch cart");
      }
    };
    const fetchProfile = async () => {
      const res = await getCustomerProfile();
      if (!res.success) {
        alert("Failed to fetch profile data");
        return;
      }
      setProfileData(res.profile);
    };

    fetchCart();
    fetchProfile();
    const handleCartChange = () => fetchCart();

    window.addEventListener("cartUpdated", handleCartChange);
    return () => window.removeEventListener("cartUpdated", handleCartChange);
  }, []);

  return {
    cartItems,
    cartCount,
    totalPrice,
    isCartOpen,
    isProfileMenuOpen,
    cartAnchorEl,
    profileAnchorEl,
    profileData,
    handleCartClick,
    handleCartClose,
    handleProfileClick,
    handleMenuClose,
    handleSignOut,
    handleProfile,
    handleLinkClick,
    handleProceedToCheckout,
    removeItemFromCart,
  };
};

export default useNavbarContainer;
