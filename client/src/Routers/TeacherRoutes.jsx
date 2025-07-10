import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CourseDeposit from "../pages/Teacher/CourseDeposit";
import News from "../pages/StudentDashboard/News";
import Calender from "../pages/Teacher/Calender";
import TimeTable from "../pages/TimeTable";
const TeacherRoutes = ({ isAuthenticated }) => {
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Routes>
        <Route path="/" element={<News />} />
        {/* pages  */}
        <Route path="depotCours" element={<CourseDeposit />} />
        <Route path="profile" element={"<profile />"} />
        <Route path="timetable" element={<TimeTable/>} />
        <Route path="calendar" element={<Calender/>} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
export default TeacherRoutes;
