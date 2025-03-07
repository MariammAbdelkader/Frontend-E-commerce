const styles = {
    mainWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    mt: "15px",
    ml: "10px",
    },

    navbar: {
    background: "white",
    boxShadow: "none",
    borderBottom: "1px solid #ccc",
    p: 1,
    width: "calc(100% - 20px)",
    },

    navbarTitle: { color: "#1B0099", mr: 2 },

    searchWrapper: { flexGrow: 1, display: "flex", justifyContent: "center" },

    searchBox: {
    display: "flex",
    alignItems: "center",
    width: 600,
    p: "6px 12px",
    borderRadius: "20px",
    boxShadow: "none",
    border: "1px solid #ccc",
    },

    searchIcon: { color: "#888", mr: 1 },

    userGreeting: { color: "#555", mr: 2 },

};

export default styles;