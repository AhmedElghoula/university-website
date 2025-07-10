import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewsAdmin from "../pages/NewsAdminDashboard.jsx/NewsAdmin";
const NewsAdminRoutes = ({ isAuthenticated }) => {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Routes>
        <Route path="/" element={"(News Admin)"} />
        {/* pages  */}
        <Route path="news" element={<NewsAdmin />} />
        <Route path="profile" element={"<profile />"} />
        <Route path="/*" element={<Navigate to="/" replace />} />
       
      </Routes>
    </ProtectedRoute>
  );
};
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default NewsAdminRoutes;
