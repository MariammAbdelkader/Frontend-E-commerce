const styles = {
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
    fontWeight: "bold",
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
    gap: 1,
    ml: 2,
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
    ml: 0.5,
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
    color: "#1B0099",
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
    color: "#1B0099",
    fontWeight: "bold",
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
  notifPaper: {
    width: 300,
    mt: 1,
    borderRadius: 2,
    p: 1,
  },
  notifTitle: {
    fontWeight: "bold",
    px: 2,
    mb: 1,
    color: "#1B0099",
  },
  notifItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottom: "1px solid #eee",
    py: 1.5,
    "&:hover": {
      backgroundColor: "#f5f5ff",
    },
  },
  notifItemTitle: {
    fontWeight: "bold",
    color: "#1B0099",
  },
  notifItemTime: {
    fontSize: "0.75rem",
    color: "text.secondary",
  },
  msgPaper: {
    width: 300,
    mt: 1,
    borderRadius: 2,
    p: 1,
  },
  msgTitle: {
    fontWeight: "bold",
    px: 2,
    mb: 1,
    color: "#1B0099",
  },
  msgItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    py: 1.5,
    "&:hover": {
      backgroundColor: "#f5f5ff",
    },
  },
  msgAvatar: {
    bgcolor: "#1B0099",
    mr: 2,
    width: 40,
    height: 40,
    fontSize: "1rem",
  },
  msgSender: {
    fontWeight: "bold",
    color: "#1B0099",
  },
  msgText: {
    fontSize: "0.75rem",
    color: "text.secondary",
  },
  notifLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mr: 2,
  },

  notifNumber: {
    width: 28,
    height: 28,
    fontSize: "0.8rem",
    bgcolor: "#1B0099",
    color: "#fff",
  },

  notifRight: {
    display: "flex",
    flexDirection: "column",
  },
};

export default styles;
