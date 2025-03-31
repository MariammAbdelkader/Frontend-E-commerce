import { useState } from "react";
import { addDiscount, applyProductDiscount } from "./DiscountServices";

const useDiscountContainer = () => {
  const [discountRate, setDiscountRate] = useState("");
  const [category, setCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productDiscountRate, setProductDiscountRate] = useState("");

  const sendGeneralDiscountData = async () => {
    try {
      const successMessage = await addDiscount(discountRate, category);
      alert(successMessage);
    } catch (error) {
      alert(error.message);
    }
  };

  const sendProductDiscountData = async () => {
    try {
      const successMessage = await applyProductDiscount(
        productCode,
        productDiscountRate
      );
      alert(successMessage);
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    discountRate,
    setDiscountRate,
    category,
    setCategory,
    productCode,
    setProductCode,
    productDiscountRate,
    setProductDiscountRate,
    sendGeneralDiscountData,
    sendProductDiscountData,
  };
};

export default useDiscountContainer;
