import axios from "axios";
const URL  = `http://localhost:5000/api/v1`;
const API =axios.create({ baseURL: URL , withCredentials: true});
API.interceptors.request.use((req)=>{
    return req;
})
////////////////////register////////////////////
export const verifyAccount=(req)=>API.post(`auth/register/first/step/${req.cin}`,req); 
export const register=(req)=>API.post(`auth/register/second/step`,req); 


////////////////////Account///////////////////
export const getComptes=()=>API.get(`accounts/all/accounts`); 

export const createCompte=(req)=>API.post(`accounts/create`,req); 
export const getFomationwithgrp=(req)=>API.get("formation/formation/with/groups"); 
export const getFomations=(req)=>API.get("formation/all/formations"); 

export const getSubjectsFromFormation=(req)=>API.get(`formation/formation/with/subjects?ids=${req}`); 

export const affectStudentToClass=(req)=>API.patch(`accounts/affect/student/to/class/${req.cin}`,req);
export const addClassesToTeach=(req)=>API.patch(`accounts/add/classes/to/teach/${req.cin}`,req);

export const deteleAccount=(req)=>API.delete(`accounts/delete/account/${req}`); 

export const getAccountByCIN=(req)=>API.get(`accounts/profile/data/${req}`); 



////////////////////formation////////////////////
export const getAllFormations=()=>API.get(`formation/all/formations`); 
export const createFormation=(req)=>API.post(`formation/create`,req); 
export const deteleFormation=(id)=>API.delete(`formation/delete/formation/${id}`); 
////////////////////Subject////////////////////
export const getAllSubjects=()=>API.get(`subjects/all/subjects`); 
export const createSubject=(req)=>API.post(`subjects/create`,req); 
export const deteleSubject=(id)=>API.delete(`subjects/delete/subject/${id}`); 