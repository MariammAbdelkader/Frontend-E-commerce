export const styles = {
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
  sidebar: {
    width: 250,
    borderRight: "1px solid #e0e0e0",
    pt: 2,
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  listItem: (selected) => ({
    backgroundColor: selected ? "#111827" : "transparent",
    color: selected ? "#fff" : "#000",
    borderRadius: "8px",
    mb: 1,
    "&:hover": {
      backgroundColor: selected ? "#1f2937" : "#f5f5f5",
    },
  }),
  mainContent: {
    flex: 1,
    p: 3,
  },
  coverContainer: {
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
  },
  coverBackground: (bgImage) => ({
    height: 230,
    backgroundImage: bgImage
      ? `url(${bgImage})`
      : "linear-gradient(to right, #d1d5db, #f9fafb)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "relative",
  }),
  coverCameraBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
  },
  avatarContainer: {
    position: "absolute",
    bottom: -80,
    left: 32,
    display: "flex",
    alignItems: "center",
  },
  avatarImage: {
    width: 120,
    height: 120,
    border: "4px solid white",
  },
  avatarCameraBtn: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "white",
    boxShadow: 1,
    "&:hover": { backgroundColor: "#f0f0f0" },
  },
  avatarTextContainer: {
    ml: 3,
    mt: 6,
  },
  actionsContainer: {
    position: "absolute",
    bottom: -65,
    right: 32,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    color: "#111827",
    borderColor: "#d1d5db",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#f3f4f6",
      borderColor: "#cbd5e1",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.04)",
    },
  },
  saveBtn: {
    backgroundColor: "#111827",
    color: "#fff",
    px: 3,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1e293b",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  },
  contentWrapper: {
    mt: 13,
    px: 3,
  },
  passwordSection: {
    display: "flex",
    flexDirection: "column",
    width: "600px",
    mt: 4,
    ml: 40,
  },
  changePasswordBtn: {
    backgroundColor: "#111827",
    color: "#fff",
    width: "200px",
    mt: 2,
    ml: 50,
    "&:hover": {
      backgroundColor: "#1e293b",
    },
    boxShadow: 1,
  },
};
