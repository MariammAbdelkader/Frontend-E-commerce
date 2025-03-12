import { useState } from "react";

const useDiscountContainer = () => {
  const [discountRate, setDiscountRate] = useState("");
  const [category, setCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productDiscountRate, setProductDiscountRate] = useState("");

  return {
    discountRate,
    setDiscountRate,
    category,
    setCategory,
    productCode,
    setProductCode,
    productDiscountRate,
    setProductDiscountRate,
  };
};

export default useDiscountContainer;
