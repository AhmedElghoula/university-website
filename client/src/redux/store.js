import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slicer/AuthSlice";
import SuperAminReducer from "./Slicer/SuperAdminSlice";
import NewsReducer from "./Slicer/NewsSlice";
import TeacherReducer from "./Slicer/TeacherSlice";
export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    SuperAdmin: SuperAminReducer,
    News: NewsReducer,
    Teacher: TeacherReducer
  },
});
