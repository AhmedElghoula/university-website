import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AccountsPages from "../pages/SuperAdmin/AccountsPages";
import FormationPage from "../pages/SuperAdmin/FormationPage";
import News from "../pages/StudentDashboard/News";
const SuperAdminRoutes = ({isAuthenticated}) => {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
    <Routes>
    <Route  path="/" element={<News />} />
    <Route  path="/comptes" exact element={<AccountsPages/>} />
    <Route  path="/formation" exact element={<FormationPage/>} />
    <Route  path="/profil" exact element={'<AccountsPage  s/>'} />
    <Route path="profile" element={"<profile />"} />
    <Route path="/*" element={<Navigate to="/" replace />} />
   
    </Routes>
    </ProtectedRoute>
  );
};
function ProtectedRoute({ children ,isAuthenticated}) {

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
export default SuperAdminRoutes;
