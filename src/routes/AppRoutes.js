import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayoutPresnations";
import StorePage from "../pages/CustomerPages/StorePage/StorePagePresentation";
import AdminChatbotPage from "../pages/AdminPages/ChatbotPage/ChatbotPresentation";
import UserChatbotPage from "../pages/CustomerPages/ChatbotPage/ChatbotPage";
import LoginPage from "../pages/AdminPages/LoginPage/LoginPresentation";
import SignUpPage from "../pages/AdminPages/SignupPage/SignupPresentation";
import ProductPage from "../pages/AdminPages/ProductPage/AddNewProduct/ProductPresentation";
import AdminProfilePage from "../pages/AdminPages/ProfilePage/ProfilePagePresentation";
import UserProfilePage from "../pages/CustomerPages/ProfilePage/ProfilePage";
import CartPage from "../pages/CustomerPages/CartPage/CartPage";
import ViewHistory from "../pages/AdminPages/Customers/ViewHistory/ViewHistoryPage";
import ViewProfile from "../pages/AdminPages/Customers/viewProfilePage";
import OrderDetails from "../pages/AdminPages/OrdersPage/ViewOrders/ViewDetails";
import Dashboard from "../pages/AdminPages/DashboardPage/DashboardPresentation";
import Profile from "../pages/AdminPages/ProfilePage/ProfilePagePresentation";
import ProductDetailPage from "../pages/CustomerPages/ProductDetailPage/ProductDetailPage";
import ReturnProductPage from "../pages/CustomerPages/ReturnPage/Return"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/adminChatbot" element={<AdminChatbotPage />} />
        <Route path="/userChatbot" element={<UserChatbotPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/adminprofile" element={<AdminProfilePage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/checkout" element={<CartPage />} />
        <Route path="/viewhistory" element={<ViewHistory />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/adminprofile" element={<Profile />} />
        <Route path="/viewdetails" element={<OrderDetails />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/request-return" element={<ReturnProductPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
