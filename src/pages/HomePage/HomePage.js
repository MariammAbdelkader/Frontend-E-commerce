import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#D3D6DB" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#333" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontFamily: "cursive", color: "white" }}>
            Logo
          </Typography>
          <Button href="/upload" color="inherit">
            Upload CSV
          </Button>
          <Button href="/chatbot" color="inherit">
            Chatbot
          </Button>
          <Button href="/login" color="inherit">
            Login
          </Button>
          <Button href="/signup" color="inherit">
            Sing Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}>
        <Typography variant="h3" sx={{ mb: 2, color: "#003366" }}>
          Welcome to AI-Powered Commerce!
        </Typography>
        <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
          Experience intelligent automation for your online store.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
