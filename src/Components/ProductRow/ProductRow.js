import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography,Card } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProductCard from "../ProductCard/ProductCard";
import ProductRowStyles from "./ProductRowStyles";

const ProductRow = ({
  category,
  products,
  onAddToCart,
  goToProductDetail,
  selectedProduct,
}) => {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={ProductRowStyles.wrapper}>
      <Typography variant="h6" sx={ProductRowStyles.categoryTitle}>
        {category}
      </Typography>

      <Box sx={ProductRowStyles.rowContainer}>
        <IconButton
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          sx={ProductRowStyles.arrowButton}>
          <ChevronLeft />
        </IconButton>

        <Box ref={scrollRef} sx={ProductRowStyles.scrollContainer}>
          {products && products.length > 0 ? (
            products.map((item) => (
              <Box key={item.id} sx={ProductRowStyles.cardWrapper}
              onClick={() => goToProductDetail(item)}>
               
                 <ProductCard
                  product={item}
                  onAddToCart={onAddToCart}
                />
          
               
              </Box>
            ))
          ) : (
            <Typography>No products available.</Typography>
          )}
        </Box>

        <IconButton
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          sx={ProductRowStyles.arrowButton}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductRow;
