import { useState, useEffect } from "react";

export const useCartPage = (initialItems) => {
  const [cartItems, setCartItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");

  const updateCart = (newCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  const updateQuantity = (index, amount) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountprice || item.price) * item.quantity,
    0
  );

  return {
    cartItems,
    setCartItems,
    coupon,
    setCoupon,
    updateCart,
    updateQuantity,
    removeItem,
    subtotal,
  };
};
