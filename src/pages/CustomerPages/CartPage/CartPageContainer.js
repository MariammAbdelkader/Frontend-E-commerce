import { useState, useEffect } from "react";
import { getCart,removeFromCart,addTocart } from "../../../Services/CartServices";

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
  },[] );

  const handleAddOneMore = async (item) => {
    try {
      const { products, totalPrice } = await addTocart({
        productId: item.productId,
        quantity: 1,
      });
      
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      console.error("Failed to add item to cart:", error);
    }
  }

  const handleRemoveOne = async (item) => {
    try {
      const { products, totalPrice }= await removeFromCart({
        productId: item.productId,
        quantity:1,
      });
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
    } catch (error) {
      setError("Failed to update product quantity. Please try again.");
      console.error("Failed to update item quantity:", error);
    }
  };

  const removeItem =async (item) => {
    const {products,totalPrice} =await removeFromCart({
      productId: item.productId,
      quantity: item.quantity,
    });

      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
 
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
    
    removeItem,
    // subtotal,
    totalPrice,
    loading,
    error,
    handleAddOneMore,
    handleRemoveOne,
    refetch: fetchCart,
    
  };
};
