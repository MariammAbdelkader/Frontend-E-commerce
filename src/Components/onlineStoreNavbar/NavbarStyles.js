const NavbarStyles = {
  container: {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#121212",
    p: 1,
    borderRadius: 2,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    width: 250,
    height: 40,
    pl: 1,
    bgcolor: "#1e1e1e",
  },
  inputBase: {
    ml: 1,
    flex: 1,
    color: "white",
  },
  iconButton: {
    p: "10px",
    color: "white",
  },

  selectDropdown: {
    bgcolor: "#1e1e1e",
    color: "white",
    height: 40,
  },

  navLinks: {
    color: "white",
    cursor: "pointer",
  },

  iconButtonProfile: {
    bgcolor: "transparent",
    fontSize: "30px",
    color: "white",
    borderRadius: "50%",
    padding: "8px",
    "&:hover": {
      bgcolor: "#2a2a2a",
    },
  },

  iconButtonCart: {
    bgcolor: "#1e1e1e",
    color: "white",
    mr: 2,
  },

  profileMenu: {
    bgcolor: "#1e1e1e",
    color: "white",
    width: 260,
    borderRadius: 3,
    p: 1.5,
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },

  menuItem: {
    borderRadius: 2,
    px: 2,
    "&:hover": { bgcolor: "#2a2a2a" },
  },

  listItemIcon: {
    color: "white",
    backgroundColor: "#2e2e2e",
    borderRadius: "50%",
    minWidth: "36px",
    mr: 2,
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#3a3a3a",
    },
  },

  cart: {
    display: "flex",
    width: "100%",
    bgcolor: "transparent",
  },

  cartMenu: {
    bgcolor: "#1e1e1e",
    color: "white",
    minWidth: 380,
    borderRadius: 2,
    p: 3,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    maxHeight: "70vh",
  },

  cartItem: {
    width: 360,
    bgcolor: "#2e2e2e",
    borderRadius: 2,
    mb: 2,
    mr: 2,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    p: 1.5,
    display: "flex",
    alignItems: "center",
    "&:hover": { bgcolor: "#333" },
  },

  cardMedia: {
    width: 120,
    height: 80,
    borderRadius: 1,
  },

  cardContent: {
    flex: 1,
    padding: "8px 16px",
    color: "white",
  },

  totalPrice: {
    fontWeight: 500,
  },

  checkoutButton: {
    background: "linear-gradient(45deg, #FF5722, #FF9800)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(45deg, #FF9800, #FF5722)",
    },
    borderRadius: 1,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },

  flexCenterGap10: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  flexCenterGap3: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },

  flexCenterGap2Padding: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 1.5,
    py: 1,
  },

  avatarStyle: {
    width: 48,
    height: 48,
  },

  dividerStyle: {
    borderColor: "#333",
    my: 1,
  },

  typographyBold: {
    mb: 1,
    fontWeight: 500,
  },

  scrollableList: {
    maxHeight: 300,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#000",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#1e1e1e",
    },
  },

  dividerStyle2: {
    borderColor: "#333",
    my: 2,
  },

  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },

  removeButton: {
    color: " #d32f2f",
  },
};

export default NavbarStyles;
