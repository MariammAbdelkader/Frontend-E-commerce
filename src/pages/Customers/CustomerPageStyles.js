const styles = {
  container: {
    p: 2,
    backgroundColor: "#f5f5f5",
  },
  headingStyle: {
    fontWeight: 700,
    color: "#1b0099",
    mb: 1,
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
    mb: 2,
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
    p: 4,
    maxWidth: "1400px",
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
  filteredCustomerBoxStyle: {
    maxHeight: "460px",
    overflowY: "auto",
    pr: 5,
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
      width: "calc(33.33% - 20px)", // 3 items per row
    },
  },
};

export default styles;
