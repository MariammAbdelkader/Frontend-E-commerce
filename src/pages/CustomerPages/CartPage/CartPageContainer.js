import { useState, useEffect } from "react";
import { getCart } from "../../../Services/CartServices";

export const useCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { products, totalPrice } = await getCart();
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
      setError(null);
    } catch (err) {
      setError(err?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (index, amount) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // const subtotal = Array.isArray(cartItems)
  //   ? cartItems.reduce(
  //       (sum, item) =>
  //         sum + (item.pricePerOneItem || item.price) * item.quantity,
  //       0
  //     )
  //   : 0;

  return {
    cartItems,
    setCartItems,
    coupon,
    setCoupon,
    updateQuantity,
    removeItem,
    // subtotal,
    totalPrice,
    loading,
    error,
    refetch: fetchCart,
  };
};
