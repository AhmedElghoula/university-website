import axios from "axios";
const URL = `http://localhost:5000/api/v1`;
const API = axios.create({ baseURL: URL, withCredentials: true });
API.interceptors.request.use((req) => {
  return req;
});


export const getAllMyCourses = () => API.get("study/teacher/courses");
export const createCourse = (req) => API.post("course/create",req);
export const deleteCourse = (id) => API.delete(`course/delete/course/${id}`);
