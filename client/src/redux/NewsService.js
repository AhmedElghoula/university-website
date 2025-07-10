import axios from "axios";
const URL = `http://localhost:5000/api/v1`;
const API = axios.create({ baseURL: URL, withCredentials: true });
API.interceptors.request.use((req) => {
  return req;
});


export const getNews = () => API.get("news/all/news/cards");
export const updateNews = (req) =>
  API.patch(`news/update/news/${req._id}`, req);
export const deleteNews = (req) =>
  API.delete(`news/delete/news/${req.id}`);
export const createNews = (req) =>
  API.post(`news/create`, req);

// export const createCompte = (req) => API.post(`accounts/create`, req);
// export const getFomationwithgrp = (req) =>
//   API.get("formation/formation/with/groups");
// export const getFomations = (req) => API.get("formation/all/formations");

// export const getSubjectsFromFormation = (req) =>
//   API.get(`formation/formation/with/subjects?ids=${req}`);

// export const affectStudentToClass = (req) =>
//   API.patch(`accounts/affect/student/to/class/${req.cin}`, req);
