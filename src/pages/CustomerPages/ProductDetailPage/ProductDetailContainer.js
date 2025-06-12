import { useState, useEffect } from "react";
import {
  getCart,
  removeFromCart,
  addTocart,
} from "../../../Services/CartServices";

export const useProductDetailContainer = (
  productParam,
  productId,
  navigate
) => {
  const [product, setProduct] = useState(productParam);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(productParam?.quantity || 1);
  const images = [product?.image, ...(product?.images || [])].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCartData = async () => {
    try {
      const { products, totalPrice } = await getCart();
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);

      if (product) {
        const cartProduct = (products || []).find(
          (item) =>
            item.productId === product.productId || item.id === product.id
        );
        setQuantity(cartProduct?.quantity ?? 1); // if in cart, use its quantity; else default to 1
      }
      setError(null);
    } catch (err) {
      setError(err?.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [product]);

  useEffect(() => {
    if (!product) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch(() => setProduct(null));
    }
  }, [productId, product]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleThumbClick = (index) => {
    setCurrentIndex(index);
  };

  const handleAddOneMore = async (item) => {
    try {
      const { products, totalPrice } = await addTocart({
        productId: item.productId || item.id,
        quantity: 1,
      });
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
      setQuantity((prev) => prev + 1);
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemoveOne = async (item) => {
    if (quantity <= 1) return;

    try {
      const { products, totalPrice } = await removeFromCart({
        productId: item.productId || item.id,
        quantity: 1,
      });
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);
      setQuantity((prev) => Math.max(1, prev - 1));
    } catch (error) {
      setError("Failed to update product quantity. Please try again.");
      console.error("Failed to update item quantity:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addTocart({
        productId: product.productId,
        quantity: 1,
      });
      setIsAddedToCart(true);
      alert("Product Added Successfully");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setError("Failed to add product to cart. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    try {
      await addTocart({ productId: product.productId, quantity });
      navigate("/checkout");
    } catch (error) {
      setError("Failed to proceed to checkout.");
    }
  };

  return {
    product,
    images,
    currentIndex,
    quantity,
    error,
    isAddedToCart,
    totalPrice,
    cartItems,
    handlePrev,
    handleNext,
    handleThumbClick,
    handleAddOneMore,
    handleRemoveOne,
    handleAddToCart,
    handleBuyNow,
  };
};
