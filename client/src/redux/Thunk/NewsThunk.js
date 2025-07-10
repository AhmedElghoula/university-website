import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../NewsService";

export const getNews = createAsyncThunk("News/getNews", async ($,{rejectWithValue}) => {
  try {
    const response = await API.getNews();
    console.log("API response:", response);
    return response.data;
  } catch (e) {
      return rejectWithValue(e.response.data);
  }
});


export const updateNews = createAsyncThunk(
  "News/updateNews",
  async ( req,{ rejectWithValue }) => {
    try {
      const response = await API.updateNews(req);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateNewsSuccess = (req, message) => (dispatch) => {
  dispatch(updateNews(req)).then((data) => {
    if (data.type === "News/updateNews/fulfilled") {
      message.success("L'actualité a été mis à jour avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};

export const createNews = createAsyncThunk(
  "News/createNews",
  async ( req,{ rejectWithValue }) => {
    try {
      const response = await API.createNews(req);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createNewsSuccess = (req, message) => (dispatch) => {
  dispatch(createNews(req)).then((data) => {
    if (data.type === "News/createNews/fulfilled") {
      message.success("L'actualité a été crée avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};

export const deleteNews = createAsyncThunk(
  "News/deleteNews",
  async ( req,{ rejectWithValue }) => {
    try {
      const response = await API.deleteNews(req);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteNewsSuccess = (req, message) => (dispatch) => {
  dispatch(deleteNews(req)).then((data) => {
    if (data.type === "News/deleteNews/fulfilled") {
      message.success("L'actualité a été supprimé avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};


// export const getFomationwithgrp = createAsyncThunk(
//   "SuperAdmin/getFomationwithgrp",
//   async ($, { rejectWithValue }) => {
//     try {
//       const response = await API.getFomationwithgrp();
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.response.data);
//     }
//   }
// );




// export const getFomations = createAsyncThunk(
//   "SuperAdmin/getFomations",
//   async ($, { rejectWithValue }) => {
//     try {
//       const response = await API.getFomations();
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.response.data);
//     }
//   }
// );

// export const getSubjectsFromFormation = createAsyncThunk(
//   "SuperAdmin/getSubjectsFromFormation",
//   async (req, { rejectWithValue }) => {
//     try {
//       const response = await API.getSubjectsFromFormation(req);

//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.response.data);
//     }
//   }
// );

// export const getSubjectsFormation = (req) => (dispatch) => {
//   dispatch(getSubjectsFromFormation(req)).then((data) => {
//     if (data.type === "SuperAdmin/getSubjectsFromFormation/fulfilled") {
//     } else {
//       message.error("error");
//     }
//   });
// };
// export const createCompte = createAsyncThunk(
//   "SuperAdmin/createCompte",
//   async (request, { rejectWithValue }) => {
//     try {
//       const response = await API.createCompte(request);
//       // message.success('connecter avec succès')
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.response.data);
//     }
//   }
// );

// export const affectStudentToClass = createAsyncThunk(
//   "SuperAdmin/affectStudentToClass",
//   async (req) => {
//     try {
//       const response = await API.affectStudentToClass(req);
//       console.log(response);
//       //return response.data;
//     } catch (e) {
//       //return rejectWithValue(e.response.data);
//     }
//   }
// );

// export const addCompte = (request, message, close) => (dispatch) => {
//   dispatch(createCompte(request)).then((data) => {
//     if (data.type === "SuperAdmin/createCompte/fulfilled") {
//       if (request.role === "etudiant") {
//         dispatch(affectStudentToClass(request)).then((data2) => {
//           if (data2.type === "SuperAdmin/affectStudentToClass/fulfilled") {
//             message.success("Compte Étudiant créé avec succès");
//             close();
//           } else {
//             message.error("un erreur se produit ");
//           }
//         });
//       } else if (request.role === "etudiant") {
//       } else {
//         message.success("Compte Admin créé avec succès");
//       }
//     } else {
//       message.error("compte deja existe ou un erreur se produit");
//     }
//   });
// };
