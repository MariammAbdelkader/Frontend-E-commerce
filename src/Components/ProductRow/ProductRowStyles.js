const ProductRowStyles = {
  wrapper: {
    mb: 4,
  },
  categoryTitle: {
    color: "#FF5722",
    mt: 8,
    mb: 3,
    textAlign: "center",
    display: "block",
    fontSize: "30px",
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { display: "none" },
    scrollBehavior: "smooth",
    flex: 1,
    px: 1,
  },
  cardWrapper: {
    flex: "0 0 auto",
    minWidth: 250,
    mr: 2,
  cursor: 'pointer',
  },
  arrowButton: {
    color: "white",
    bgcolor: "#1e1e1e",
    "&:disabled": { opacity: 0.3 },
    mx: 1,
  },
};

export default ProductRowStyles;
