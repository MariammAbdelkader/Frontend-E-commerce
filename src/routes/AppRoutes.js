import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../Layouts/MainLayoutPresnations";
import StorePage from "../pages/CustomerPages/StorePage/StorePagePresentation";
import ChatbotPage from "../pages/AdminPages/ChatbotPage/ChatbotPresentation";
import LoginPage from "../pages/AdminPages/LoginPage/LoginPresentation";
import SignUpPage from "../pages/AdminPages/SignupPage/SignupPresentation";
import ProductPage from "../pages/AdminPages/ProductPage/AddNewProduct/ProductPresentation";
import ProfilePage from "../pages/AdminPages/ProfilePage/ProfilePagePresentation";
import CartPage from "../pages/CustomerPages/CartPage/CartPage";

import Dashboard from "../pages/AdminPages/DashboardPage/DashboardPresentation";

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
