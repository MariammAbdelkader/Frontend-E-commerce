import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const StorePageContainer = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const isCartOpen = Boolean(cartAnchorEl);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const location = useLocation();
  const newCartItems = location.state?.cartItems;

  useEffect(() => {
    if (newCartItems) {
      setCartItems(newCartItems);
    }
  }, [newCartItems]);

  const products = [
    {
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      category: "Electronics",
      subcategory: "Headphones",
      price: 149.99,
      discountprice: 129.99,
      imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155222c290",
      productDiscountPercentage: 13,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket made from premium material.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 89.99,
      discountprice: 69.99,
      imgUrl: "https://images.unsplash.com/photo-1618354691442-d8f20aa5982f",
      productDiscountPercentage: 22,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Blender Pro X",
      description: "High-performance blender with multiple speed settings.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 69.99,
      discountprice: 59.99,
      imgUrl: "https://images.unsplash.com/photo-1590080876536-9da5e1e2c928",
      productDiscountPercentage: 14,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Smartphone X12",
      description: "Latest model with OLED display and advanced camera system.",
      category: "Electronics",
      subcategory: "Phones",
      price: 799.99,
      discountprice: 749.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      productDiscountPercentage: 6,
      categoryDiscountPercentage: 3,
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket for everyday wear.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 49.99,
      discountprice: 39.99,
      imgUrl: "https://images.unsplash.com/photo-1600180758890-0f5451c49f1b",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 8,
    },
    {
      name: "Air Fryer Max",
      description: "Cook your favorite meals with less oil and in less time.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 99.99,
      discountprice: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1606755962773-4780ce4aa0de",
      productDiscountPercentage: 10,
      categoryDiscountPercentage: 5,
    },
    {
      name: "The Great Gatsby",
      description: "A classic novel by F. Scott Fitzgerald.",
      category: "Books",
      subcategory: "Fiction",
      price: 14.99,
      discountprice: 9.99,
      imgUrl: "https://images.unsplash.com/photo-1589998059171-0bc1d48a89a5",
      productDiscountPercentage: 33,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Atomic Habits",
      description: "Bestseller on habit formation and self-improvement.",
      category: "Books",
      subcategory: "Self-Help",
      price: 18.99,
      discountprice: 15.99,
      imgUrl: "https://images.unsplash.com/photo-1611078489935-b0c54c1c3f5b",
      productDiscountPercentage: 16,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Yoga Mat Pro",
      description: "Eco-friendly, non-slip mat for yoga and workouts.",
      category: "Sports Equipment",
      subcategory: "Fitness",
      price: 24.99,
      discountprice: 19.99,
      imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1c1d2a6",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 7,
    },
    {
      name: "Basketball Size 7",
      description: "Official-size outdoor/indoor basketball.",
      category: "Sports Equipment",
      subcategory: "Team Sports",
      price: 29.99,
      discountprice: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1599058917212-d750089bcaf9",
      productDiscountPercentage: 17,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      category: "Electronics",
      subcategory: "Headphones",
      price: 149.99,
      discountprice: 129.99,
      imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155222c290",
      productDiscountPercentage: 13,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket made from premium material.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 89.99,
      discountprice: 69.99,
      imgUrl: "https://images.unsplash.com/photo-1618354691442-d8f20aa5982f",
      productDiscountPercentage: 22,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Blender Pro X",
      description: "High-performance blender with multiple speed settings.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 69.99,
      discountprice: 59.99,
      imgUrl: "https://images.unsplash.com/photo-1590080876536-9da5e1e2c928",
      productDiscountPercentage: 14,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Smartphone X12",
      description: "Latest model with OLED display and advanced camera system.",
      category: "Electronics",
      subcategory: "Phones",
      price: 799.99,
      discountprice: 749.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      productDiscountPercentage: 6,
      categoryDiscountPercentage: 3,
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket for everyday wear.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 49.99,
      discountprice: 39.99,
      imgUrl: "https://images.unsplash.com/photo-1600180758890-0f5451c49f1b",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 8,
    },
    {
      name: "Air Fryer Max",
      description: "Cook your favorite meals with less oil and in less time.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 99.99,
      discountprice: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1606755962773-4780ce4aa0de",
      productDiscountPercentage: 10,
      categoryDiscountPercentage: 5,
    },
    {
      name: "The Great Gatsby",
      description: "A classic novel by F. Scott Fitzgerald.",
      category: "Books",
      subcategory: "Fiction",
      price: 14.99,
      discountprice: 9.99,
      imgUrl: "https://images.unsplash.com/photo-1589998059171-0bc1d48a89a5",
      productDiscountPercentage: 33,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Atomic Habits",
      description: "Bestseller on habit formation and self-improvement.",
      category: "Books",
      subcategory: "Self-Help",
      price: 18.99,
      discountprice: 15.99,
      imgUrl: "https://images.unsplash.com/photo-1611078489935-b0c54c1c3f5b",
      productDiscountPercentage: 16,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Yoga Mat Pro",
      description: "Eco-friendly, non-slip mat for yoga and workouts.",
      category: "Sports Equipment",
      subcategory: "Fitness",
      price: 24.99,
      discountprice: 19.99,
      imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1c1d2a6",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 7,
    },
    {
      name: "Basketball Size 7",
      description: "Official-size outdoor/indoor basketball.",
      category: "Sports Equipment",
      subcategory: "Team Sports",
      price: 29.99,
      discountprice: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1599058917212-d750089bcaf9",
      productDiscountPercentage: 17,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      category: "Electronics",
      subcategory: "Headphones",
      price: 149.99,
      discountprice: 129.99,
      imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155222c290",
      productDiscountPercentage: 13,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket made from premium material.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 89.99,
      discountprice: 69.99,
      imgUrl: "https://images.unsplash.com/photo-1618354691442-d8f20aa5982f",
      productDiscountPercentage: 22,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Blender Pro X",
      description: "High-performance blender with multiple speed settings.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 69.99,
      discountprice: 59.99,
      imgUrl: "https://images.unsplash.com/photo-1590080876536-9da5e1e2c928",
      productDiscountPercentage: 14,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Smartphone X12",
      description: "Latest model with OLED display and advanced camera system.",
      category: "Electronics",
      subcategory: "Phones",
      price: 799.99,
      discountprice: 749.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      productDiscountPercentage: 6,
      categoryDiscountPercentage: 3,
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket for everyday wear.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 49.99,
      discountprice: 39.99,
      imgUrl: "https://images.unsplash.com/photo-1600180758890-0f5451c49f1b",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 8,
    },
    {
      name: "Air Fryer Max",
      description: "Cook your favorite meals with less oil and in less time.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 99.99,
      discountprice: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1606755962773-4780ce4aa0de",
      productDiscountPercentage: 10,
      categoryDiscountPercentage: 5,
    },
    {
      name: "The Great Gatsby",
      description: "A classic novel by F. Scott Fitzgerald.",
      category: "Books",
      subcategory: "Fiction",
      price: 14.99,
      discountprice: 9.99,
      imgUrl: "https://images.unsplash.com/photo-1589998059171-0bc1d48a89a5",
      productDiscountPercentage: 33,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Atomic Habits",
      description: "Bestseller on habit formation and self-improvement.",
      category: "Books",
      subcategory: "Self-Help",
      price: 18.99,
      discountprice: 15.99,
      imgUrl: "https://images.unsplash.com/photo-1611078489935-b0c54c1c3f5b",
      productDiscountPercentage: 16,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Yoga Mat Pro",
      description: "Eco-friendly, non-slip mat for yoga and workouts.",
      category: "Sports Equipment",
      subcategory: "Fitness",
      price: 24.99,
      discountprice: 19.99,
      imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1c1d2a6",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 7,
    },
    {
      name: "Basketball Size 7",
      description: "Official-size outdoor/indoor basketball.",
      category: "Sports Equipment",
      subcategory: "Team Sports",
      price: 29.99,
      discountprice: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1599058917212-d750089bcaf9",
      productDiscountPercentage: 17,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      category: "Electronics",
      subcategory: "Headphones",
      price: 149.99,
      discountprice: 129.99,
      imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155222c290",
      productDiscountPercentage: 13,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket made from premium material.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 89.99,
      discountprice: 69.99,
      imgUrl: "https://images.unsplash.com/photo-1618354691442-d8f20aa5982f",
      productDiscountPercentage: 22,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Blender Pro X",
      description: "High-performance blender with multiple speed settings.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 69.99,
      discountprice: 59.99,
      imgUrl: "https://images.unsplash.com/photo-1590080876536-9da5e1e2c928",
      productDiscountPercentage: 14,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Smartphone X12",
      description: "Latest model with OLED display and advanced camera system.",
      category: "Electronics",
      subcategory: "Phones",
      price: 799.99,
      discountprice: 749.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      productDiscountPercentage: 6,
      categoryDiscountPercentage: 3,
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket for everyday wear.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 49.99,
      discountprice: 39.99,
      imgUrl: "https://images.unsplash.com/photo-1600180758890-0f5451c49f1b",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 8,
    },
    {
      name: "Air Fryer Max",
      description: "Cook your favorite meals with less oil and in less time.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 99.99,
      discountprice: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1606755962773-4780ce4aa0de",
      productDiscountPercentage: 10,
      categoryDiscountPercentage: 5,
    },
    {
      name: "The Great Gatsby",
      description: "A classic novel by F. Scott Fitzgerald.",
      category: "Books",
      subcategory: "Fiction",
      price: 14.99,
      discountprice: 9.99,
      imgUrl: "https://images.unsplash.com/photo-1589998059171-0bc1d48a89a5",
      productDiscountPercentage: 33,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Atomic Habits",
      description: "Bestseller on habit formation and self-improvement.",
      category: "Books",
      subcategory: "Self-Help",
      price: 18.99,
      discountprice: 15.99,
      imgUrl: "https://images.unsplash.com/photo-1611078489935-b0c54c1c3f5b",
      productDiscountPercentage: 16,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Yoga Mat Pro",
      description: "Eco-friendly, non-slip mat for yoga and workouts.",
      category: "Sports Equipment",
      subcategory: "Fitness",
      price: 24.99,
      discountprice: 19.99,
      imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1c1d2a6",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 7,
    },
    {
      name: "Basketball Size 7",
      description: "Official-size outdoor/indoor basketball.",
      category: "Sports Equipment",
      subcategory: "Team Sports",
      price: 29.99,
      discountprice: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1599058917212-d750089bcaf9",
      productDiscountPercentage: 17,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with long battery life.",
      category: "Electronics",
      subcategory: "Headphones",
      price: 149.99,
      discountprice: 129.99,
      imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155222c290",
      productDiscountPercentage: 13,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket made from premium material.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 89.99,
      discountprice: 69.99,
      imgUrl: "https://images.unsplash.com/photo-1618354691442-d8f20aa5982f",
      productDiscountPercentage: 22,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Blender Pro X",
      description: "High-performance blender with multiple speed settings.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 69.99,
      discountprice: 59.99,
      imgUrl: "https://images.unsplash.com/photo-1590080876536-9da5e1e2c928",
      productDiscountPercentage: 14,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Smartphone X12",
      description: "Latest model with OLED display and advanced camera system.",
      category: "Electronics",
      subcategory: "Phones",
      price: 799.99,
      discountprice: 749.99,
      imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      productDiscountPercentage: 6,
      categoryDiscountPercentage: 3,
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket for everyday wear.",
      category: "Clothing",
      subcategory: "Jackets",
      price: 49.99,
      discountprice: 39.99,
      imgUrl: "https://images.unsplash.com/photo-1600180758890-0f5451c49f1b",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 8,
    },
    {
      name: "Air Fryer Max",
      description: "Cook your favorite meals with less oil and in less time.",
      category: "Home Appliances",
      subcategory: "Kitchen",
      price: 99.99,
      discountprice: 89.99,
      imgUrl: "https://images.unsplash.com/photo-1606755962773-4780ce4aa0de",
      productDiscountPercentage: 10,
      categoryDiscountPercentage: 5,
    },
    {
      name: "The Great Gatsby",
      description: "A classic novel by F. Scott Fitzgerald.",
      category: "Books",
      subcategory: "Fiction",
      price: 14.99,
      discountprice: 9.99,
      imgUrl: "https://images.unsplash.com/photo-1589998059171-0bc1d48a89a5",
      productDiscountPercentage: 33,
      categoryDiscountPercentage: 5,
    },
    {
      name: "Atomic Habits",
      description: "Bestseller on habit formation and self-improvement.",
      category: "Books",
      subcategory: "Self-Help",
      price: 18.99,
      discountprice: 15.99,
      imgUrl: "https://images.unsplash.com/photo-1611078489935-b0c54c1c3f5b",
      productDiscountPercentage: 16,
      categoryDiscountPercentage: 10,
    },
    {
      name: "Yoga Mat Pro",
      description: "Eco-friendly, non-slip mat for yoga and workouts.",
      category: "Sports Equipment",
      subcategory: "Fitness",
      price: 24.99,
      discountprice: 19.99,
      imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1c1d2a6",
      productDiscountPercentage: 20,
      categoryDiscountPercentage: 7,
    },
    {
      name: "Basketball Size 7",
      description: "Official-size outdoor/indoor basketball.",
      category: "Sports Equipment",
      subcategory: "Team Sports",
      price: 29.99,
      discountprice: 24.99,
      imgUrl: "https://images.unsplash.com/photo-1599058917212-d750089bcaf9",
      productDiscountPercentage: 17,
      categoryDiscountPercentage: 5,
    },
  ];

  const handleCartClick = (event) => setCartAnchorEl(event.currentTarget);
  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleMenuClose = () => setProfileAnchorEl(null);
  const handleSignOut = () => navigate("/login");
  const handleProfile = () => navigate("/profile");

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.name === product.name);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]); // Add new item
    }
    setCartCount(cartCount + 1);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };
  const handleCartClose = () => setCartAnchorEl(null);

  const removeItemFromCart = (productName) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.name === productName) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);

      setCartCount(
        updatedItems.reduce((count, item) => count + item.quantity, 0)
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  const groupByCategory = (products) => {
    return products.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const grouped = groupByCategory(products);

  return {
    cartCount,
    setCartCount,
    cartAnchorEl,
    profileAnchorEl,
    cartItems,
    isCartOpen,
    isProfileMenuOpen,
    handleCartClick,
    handleProfileClick,
    handleMenuClose,
    handleSignOut,
    handleProfile,
    handleAddToCart,
    handleProceedToCheckout,
    handleCartClose,
    removeItemFromCart,
    grouped,
  };
};

export default StorePageContainer;
