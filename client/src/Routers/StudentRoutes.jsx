import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import News from "../pages/StudentDashboard/News";
import StudentCours from "../pages/StudentDashboard/StudentCours";
const StudentRoutes = ({ isAuthenticated }) => {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Routes>
        <Route path="/" element={<News />} />

        {/* pages  */}
        <Route path="courses" element={<StudentCours/>} />

        {/* apps  */}
        <Route path="timetable" element={"<Kanban />"} />

        {/* charts  */}
        <Route path="calendar" element={"<Line />"} />
        <Route path="offres" element={"<Line />"} />
        <Route path="profile" element={"<profile />"} />
        <Route path="/*" element={<Navigate to="/" replace />} />
   
      </Routes>
    </ProtectedRoute>
  );
};
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default StudentRoutes;
