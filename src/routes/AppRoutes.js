import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StorePage from "../pages/StorePage/StorePage";
import ChatbotPage from "../pages/ChatbotPage/ChatbotPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignupPage/SignupPage";
import UploadCSVPage from "../pages/UploadCsvPage/UploadCsvPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from '../pages/ProfilePage/ProfilePage'; 


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/upload" element={<UploadCSVPage />} />
        <Route path="/upload" element={<UploadCSVPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
