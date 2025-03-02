import { useState } from "react";

const ProductContainer = () => {
  const [activeItem, setActiveItem] = useState("Products");
  const [activeSubItem, setActiveSubItem] = useState("All Products");

  return {
    activeItem,
    setActiveItem,
    activeSubItem,
    setActiveSubItem,
  };
};

export default ProductContainer;
