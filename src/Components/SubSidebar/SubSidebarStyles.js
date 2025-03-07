const styles = {
  subSidebar: {
    width: 230,
    bgcolor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 20px)",
    boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)",
    paddingTop: "20px",
    overflowY: "auto",
  },

  list: {
    width: "95%", 
    padding: "5px", 
    display: "flex",
    flexDirection: "column",
    gap: "10px", 
    borderRadius: "8px",
    backgroundColor: "#fff", 
  },
  

  subSidebarItem: (active) => ({
    background: active ? "linear-gradient(to right, #1B0099, #4A00E0)" : "transparent",
    color: active ? "white" : "#333",
    borderRadius: "0px 20px 20px 0px",
    transition: "all 0.3s ease-in-out",
    marginBottom: "8px",
    padding: "12px 20px",
    cursor: "pointer", 
    "&:hover": {
      background: active ? "linear-gradient(to right, #1B0099, #4A00E0)" : "#f5f5f5",
    },
  }),

  listItemText: (active) => ({
    fontWeight: active ? "bold" : "normal",
    textAlign: "left",
  }),
};

export default styles;
