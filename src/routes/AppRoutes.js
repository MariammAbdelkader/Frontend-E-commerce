import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../Layouts/MainLayoutPresnations";
import StorePage from "../pages/StorePage/StorePage";
import ChatbotPage from "../pages/ChatbotPage/ChatbotPresentation";
import LoginPage from "../pages/LoginPage/LoginPresentation";
import SignUpPage from "../pages/SignupPage/SignupPresentation";import ProductPage from "../pages/ProductPage/AddNewProduct/ProductPresentation";

import Dashboard from "../pages/DashboardPage/DashboardPresentation";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
