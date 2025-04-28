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

  navbarTitle: {
    color: "#1B0099",
    mr: 2,
  },

  searchWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: 600,
    p: "6px 12px",
    borderRadius: "20px",
    boxShadow: "none",
    border: "1px solid #ccc",
  },

  searchIcon: {
    color: "#888",
    mr: 1,
  },

  userWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  avatar: {
    bgcolor: "#1B0099",
    color: "#FFF",
    width: 40,
    height: 40,
    fontSize: "1rem",
  },

  nameWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    p: 1,
    borderRadius: 2,
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#f0f0ff",
    },
  },

  nameText: {
    fontWeight: "bold",
    color: "#1B0099",
  },

  arrowIcon: {
    color: "#1B0099",
    fontSize: 26,
  },

  dropdownPaper: {
    mt: 1,
    minWidth: 250,
    borderRadius: 2,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    p: 2,
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 1.5,
    borderRadius: 2,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f0ff",
    },
  },

  profileName: {
    fontWeight: "bold",
    fontSize: "1rem",
  },

  profileSubtext: {
    fontSize: "0.8rem",
    color: "text.secondary",
  },

  divider: {
    my: 2,
  },

  menuItem: {
    borderRadius: 2,
    py: 1.5,
  },

  logoutItem: {
    borderRadius: 2,
    py: 1.5,
    color: "red",
    fontWeight: "bold",
  },

  iconInMenu: {
    mr: 1,
  },

  logoutIcon: {
    color: "red",
    mr: 1,
  },
};

export default styles;
