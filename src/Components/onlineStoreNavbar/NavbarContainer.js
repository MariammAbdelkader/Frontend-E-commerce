import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart,removeFromCart } from "../../Services/CartServices";
import { logout } from "../../Services/LogoutServices";
import { getCustomerProfile } from "../../Services/CustomerServices";

const useNavbarContainer = () => {
  const navigate = useNavigate();
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [profileData, setProfileData] = useState(null);

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

  useEffect(() => {
   
    const fetchProfile = async () => {
      const res = await getCustomerProfile();
      if (!res.success) {
        alert("Failed to fetch profile data");
        return;
      }
      setProfileData(res.profile);
    };
   
    fetchProfile();

    
  }, []);

  return {
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
    
  };
};

export default useNavbarContainer;
