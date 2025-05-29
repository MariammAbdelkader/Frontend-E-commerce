export const styles = {
  pageContainer: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    p: 5,
  },
  appBar: {
    backgroundColor: "#ffffff",
    color: "#333",
  },
  backButton: {
    border: "2px solid #1600c9",
    borderRadius: "50%",
    padding: "4px",
    marginRight: "20px",
    transition: "all 0.3s ease",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#e0e7ff",
      borderColor: "#1b00c9",
      transform: "scale(1.15) rotate(-5deg)",
      boxShadow: "0 4px 10px rgba(27, 0, 201, 0.3)",
    },
    "& .MuiSvgIcon-root": {
      fontSize: 22,
      color: "#1b00c9",
      transition: "color 0.3s ease",
    },
  },
  pageTitle: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: "28px",
    color: "#1b00c9",
  },
  mainContent: {
    py: 4,
    px: { xs: 2, md: 6 },
  },
  card: {
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    bgcolor: "#ffffff",
    transition: "all 0.3s",
    "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.08)" },
  },
  tabsContainer: {
    bgcolor: "#f0f2f5",
  },
  tab: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#555",
    textTransform: "capitalize",
    "&.Mui-selected": { color: "#6366f1" },
  },
  tabIndicator: {
    backgroundColor: "#6366f1",
    height: 4,
  },
  cardContent: {
    p: { xs: 3, md: 5 },
  },
  avatar: {
    width: 130,
    height: 130,
    mx: "auto",
    mb: 2,
    border: "4px solid #6366f1",
    boxShadow: "0px 4px 14px rgba(0,0,0,0.25)",
  },
  avatarName: {
    mt: 1,
    fontWeight: 700,
    color: "#333",
  },
  inputField: {
    borderRadius: 3,
  },
  saveButton: {
    backgroundColor: "#6366f1",
    fontWeight: 700,
    px: 5,
    py: 1.5,
    borderRadius: 3,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#4f46e5",
    },
  },
  updatePasswordButton: {
    backgroundColor: "#10b981",
    fontWeight: 700,
    px: 5,
    py: 1.5,
    borderRadius: 3,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#059669",
    },
  },
    labelText: {
    fontSize: '1.3rem', 
    fontWeight: 'bold',
    color: '#333',
    mb: 0.5,
  },
  valueText: {
    color: '#416899', // baby blue shade
    fontSize: '1rem',
  },
};
