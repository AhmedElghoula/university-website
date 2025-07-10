import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../TeacherService";


export const getAllMyCourses = createAsyncThunk(
  "Teacher/getAllMyCourses",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getAllMyCourses();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getAllCourses = (setLoading) => (dispatch) => {
    dispatch(getAllMyCourses()).then((data) => {
      if (data.type === "Teacher/getAllMyCourses/fulfilled") {
        setLoading(false)
      } else {
       // message.error("erreur");
      }
    });
  };
  
  
  

  export const createCourse = createAsyncThunk(
    "Teacher/createCourse",
    async (req, { rejectWithValue }) => {
      try {
        const response = await API.createCourse(req);
  
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
  );
  
  export const createCou = (req, message, setup, clearForm) => (dispatch) => {
    dispatch(createCourse(req)).then((data) => {
      if (data.type === "Teacher/createCourse/fulfilled") {
        message.success("Le cours a été ajouté avec succès");
        setup(false)
        clearForm();
      } else {
        setup(false)
        message.error("un error se produit");
      }
    });
  };


  export const deleteCourse = createAsyncThunk(
    "Teacher/deleteCourse",
    async (req, { rejectWithValue }) => {
      try {
        const response = await API.deleteCourse(req);
  
        return response.data;
      } catch (e) {
        return rejectWithValue(e.response.data);
      }
    }
  );
  
  export const deleteCou = (req, message) => (dispatch) => {
    dispatch(deleteCourse(req)).then((data) => {
      if (data.type === "Teacher/deleteCourse/fulfilled") {
        message.success("Le cours a été supprimer avec succès");
    
        
      } else {
        message.error("un error se produit");
      }
    });
  };