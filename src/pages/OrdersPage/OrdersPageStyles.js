// OrdersPageStyles.js
const styles = {
  container: {
    p: 2,
    pb: 0,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontWeight: 700,
    color: "#1b0099",
    mb: 1,
  },
  subtitle: {
    mb: 2,
  },
  filterRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  toggleButtonGroup: {
    "& .MuiToggleButton-root": {
      borderColor: "#1b0099",
      color: "#1b0099",
    },
    "& .Mui-selected": {
      color: "#fff",
    },
  },
  toggleButton: {
    "&.Mui-selected": {
      backgroundColor: "#1b0099",
      color: "white",
    },
    borderRadius: "10px",
    px: 3,
  },
  searchInput: {
    width: 400,
    borderRadius: 15,
  },
  outerScrollBox: {
    maxHeight: 390,
    overflowY: "auto",
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
  },
  tableContainer: {
    borderRadius: 3,
    maxHeight: 390,
    overflowY: "auto",
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
  },
  tableHeadRow: {
    backgroundColor: "#1b0099",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  tableCellHeader: {
    color: "white",
    fontWeight: 600,
    backgroundColor: "#1b0099",
  },
  statusCell: {
    color: "green",
    fontWeight: 500,
  },
  detailsButton: {
    backgroundColor: "#1b0099",
    borderRadius: 5,
  },
};

export default styles;
