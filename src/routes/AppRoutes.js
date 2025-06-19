import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import ProductDetailPage from "../pages/CustomerPages/ProductDetailPage/ProductDetailPage";
import ReturnProductPage from "../pages/CustomerPages/ReturnPage/Return"

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const NotFound = () => <h1>404 - Page Not Found</h1>;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
<<<<<<< HEAD
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
=======

        {/* Protected routes */}
        <Route path="/home" element={<Navigate to="/home" replace />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminChatbot"
          element={
            <PrivateRoute>
              <AdminChatbotPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/userChatbot"
          element={
            <PrivateRoute>
              <UserChatbotPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <StorePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminprofile"
          element={
            <PrivateRoute>
              <AdminProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewhistory"
          element={
            <PrivateRoute>
              <ViewHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewprofile"
          element={
            <PrivateRoute>
              <ViewProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewdetails"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetailPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
>>>>>>> 4201ba7540a86a46b3310250b55a3f37ebd2cfc3
      </Routes>
    </Router>
  );
};

export default AppRoutes;
