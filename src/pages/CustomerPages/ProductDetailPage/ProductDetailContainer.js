import { useState, useEffect } from "react";
import { getCart, addTocart } from "../../../Services/CartServices";

export const useProductDetailContainer = (
  productParam,
  productId,
  navigate
) => {
  const [product, setProduct] = useState(productParam);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(productParam?.quantity || 1);
  const images = product?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const fetchCartData = async () => {
    try {
      const { products, totalPrice } = await getCart();
      setCartItems(products || []);
      setTotalPrice(parseFloat(totalPrice) || 0);

      if (product) {
        const cartProduct = (products || []).find(
          (item) => item.productId === product.productId
        );
        setQuantity(cartProduct?.quantity ?? 0);
      }
      setError(null);
    } catch (err) {
      setError(err?.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [product]);

  // useEffect(() => {
  //   if (!product) {
  //     fetch(`/api/products/${productId}`)
  //       .then((res) => res.json())
  //       .then((data) => setProduct(data))
  //       .catch(() => setProduct(null));
  //   }
  // }, [productId, product]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

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
      setQuantity((prev) => prev + 1);
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemoveOne = async (item) => {
    if (quantity < 1) return;

    try {
      setQuantity((prev) => Math.max(0, prev - 1));
    } catch (error) {
      setError("Failed to update product quantity. Please try again.");
      console.error("Failed to update item quantity:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      if (quantity > 0) {
        await addTocart({ productId: product.productId, quantity });
        navigate("/checkout");
      }
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
    totalPrice,
    cartItems,
    handlePrev,
    handleNext,
    handleThumbClick,
    handleAddOneMore,
    handleRemoveOne,
    handleBuyNow,
    selectedColor,
    handleSelectColor,
  };
};
