import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const AdminRoutes = ({isAuthenticated}) => {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
    <Routes>
    <Route  path="/" element={"(admin)"} />
      {/* pages  */}
    <Route path="order" element={"<HomeL />"} />

      {/* apps  */}
    <Route path="kanban" element={"<Kanban />"} />

      {/* charts  */}
    <Route path="Calendar" element={"<Line />"} />
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
export default AdminRoutes;
