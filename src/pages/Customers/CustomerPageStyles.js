const styles = {
  container: {
    backgroundColor: "#f5f5f5",
  },
  headingStyle: {
    fontWeight: 700,
    color: "#1b0099",
    mb: 2,
  },
  cardStyle: {
    borderRadius: 5,
    boxShadow: 5,
    backgroundColor: "#1b0099",
    color: "white",
    width: "300px",
    height: "230px",
    borderTop: "5px solid #00AFFF",
    borderBottom: "5px solid #00AFFF",
  },
  boxStyle: {
    display: "flex",
    alignItems: "center",
  },
  avatarStyle: {
    width: 56,
    height: 56,
    mr: 2,
  },
  nameAndEmailStyle: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitleStyle: {
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  cardContentStyle: {
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  strongText: {
    fontWeight: "bold",
  },
  textStyle: {
    color: "#fff",
    opacity: 0.8,
  },
  customerListContainer: {
    p: 3,
    maxWidth: "1100px",
    pb: 0,
  },
  customerSearchBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  searchInputStyle: {
    width: "500px",
  },
  CircularProgressbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "460px",
  },
  CircularProgress: {
    color: "#1b0099 ",
  },
  filteredCustomerBoxStyle: {
    height: "460px",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    scrollbarWidth: "thin",
    scrollbarColor: "#1b0099 transparent",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1b0099",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#e0e0e0",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    "& > div": {
      width: "calc(33.33% - 20px)",
    },
  },
  viewProfileButton: {
    position: "absolute",
    bottom: 5,
    left: 35,
    py: 1,
    px: 2,
    backgroundColor: "#00AFFF",
    border: "none",
    cursor: "pointer",
    borderRadius: 4,
    color: "white",
    fontWeight: "bold",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#008FCC",
      transform: "scale(1.03)",
    },
  },
  viewHistoryButton: {
    position: "absolute",
    bottom: 5,
    right: 75,
    py: 1,
    px: 2,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#1b0099",
    transition: "transform 0.3s ease-in-out",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      transform: "scale(1.03)",
    },
  },
  cardWrapper: {
    position: "relative",
    width: "300px",
    height: "230px",
  },
  fixedHeader: {
    pt: "12px",
    pl: "16px",
  },

  scrollableCardContent: {
    overflowY: "scroll", // Ensures scrollbar is always visible
    maxHeight: "100px",
    mr: "10px",
    padding: 0,
    mt: "10px",
    ml: "25px",

    // WebKit (Chrome, Safari, Edge)
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1b0099",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "4px",
    },
  },
};

export default styles;
