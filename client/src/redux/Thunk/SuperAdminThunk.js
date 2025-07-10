import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../service";
export const getComptes = createAsyncThunk(
  "SuperAdmin/getComptes",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getComptes();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);


export const getAccountByCIN = createAsyncThunk(
  "SuperAdmin/getAccountByCIN",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.getAccountByCIN(req);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getAccByCIN = (req, setopen) => (dispatch) => {
  dispatch(getAccountByCIN(req)).then((data) => {
    if (data.type === "SuperAdmin/getAccountByCIN/fulfilled") {
      setopen(true)
    } else {
      setopen(true)
    }
  });
};
export const getFomationwithgrp = createAsyncThunk(
  "SuperAdmin/getFomationwithgrp",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getFomationwithgrp();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getFomations = createAsyncThunk(
  "SuperAdmin/getFomations",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getFomations();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getSubjectsFromFormation = createAsyncThunk(
  "SuperAdmin/getSubjectsFromFormation",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.getSubjectsFromFormation(req);

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getSubjectsFormation = (req) => (dispatch) => {
  dispatch(getSubjectsFromFormation(req)).then((data) => {
    if (data.type === "SuperAdmin/getSubjectsFromFormation/fulfilled") {
    } else {
      message.error("error");
    }
  });
};

export const createCompte = createAsyncThunk(
  "SuperAdmin/createCompte",
  async (request, { rejectWithValue }) => {
    try {
      const response = await API.createCompte(request);
      // message.success('connecter avec succès')
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deteleAccount = createAsyncThunk(
  "SuperAdmin/deteleAccount",
  async (req) => {
    try {
      const response = await API.deteleAccount(req);

      //return response.data;
    } catch (e) {
      //return rejectWithValue(e.response.data);
    }
  }
);

export const deteleAcc = (req, message) => (dispatch) => {
  dispatch(deteleAccount(req)).then((data) => {
    if (data.type === "SuperAdmin/deteleAccount/fulfilled") {
      message.success("Compte a été supprimé avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};

export const affectStudentToClass = createAsyncThunk(
  "SuperAdmin/affectStudentToClass",
  async (req) => {
    try {
      const response = await API.affectStudentToClass(req);

      //return response.data;
    } catch (e) {
      //return rejectWithValue(e.response.data);
    }
  }
);

export const addClassesToTeach = createAsyncThunk(
  "SuperAdmin/addClassesToTeach",
  async (req) => {
    try {
      const response = await API.addClassesToTeach(req);

      //return response.data;
    } catch (e) {
      //return rejectWithValue(e.response.data);
    }
  }
);

export const addCompte = (request, message, close, clearForm) => (dispatch) => {
  dispatch(createCompte(request)).then((data) => {
    if (data.type === "SuperAdmin/createCompte/fulfilled") {
      if (request.role === "etudiant") {
        dispatch(affectStudentToClass(request)).then((data2) => {
          if (data2.type === "SuperAdmin/affectStudentToClass/fulfilled") {
            message.success("Compte Étudiant créé avec succès");
            close();
            clearForm();
          } else {
            message.error("un erreur se produit ");
          }
        });
      } else if (request.role === "enseignant") {
        dispatch(addClassesToTeach(request)).then((data2) => {
          if (data2.type === "SuperAdmin/addClassesToTeach/fulfilled") {
            message.success("Compte Enseignant créé avec succès");
            close();
            clearForm();
          } else {
            message.error("un erreur se produit ");
          }
        });
      } else {
        message.success("Compte Admin créé avec succès");
        close();
        clearForm();
      }
    } else {
      message.error("compte deja existe ou un erreur se produit");
    }
  });
};

////////////////////formation////////////////////

export const getAllFormations = createAsyncThunk(
  "SuperAdmin/getAllFormations",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getAllFormations();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createFormation = createAsyncThunk(
  "SuperAdmin/createFormation",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.createFormation(req);

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createForma = (req, message, close, clearForm) => (dispatch) => {
  dispatch(createFormation(req)).then((data) => {
    if (data.type === "SuperAdmin/createFormation/fulfilled") {
      message.success("La Formation a été créée avec succès");
      close();
      clearForm();
    } else {
      message.error("un error se produit");
    }
  });
};

export const deteleFormation = createAsyncThunk(
  "SuperAdmin/deteleFormation",
  async (req) => {
    try {
      const response = await API.deteleFormation(req);

      return response.data;
    } catch (e) {
      //return rejectWithValue(e.response.data);
    }
  }
);

export const deteleForma = (req, message) => (dispatch) => {
  dispatch(deteleFormation(req)).then((data) => {
    if (data.type === "SuperAdmin/deteleFormation/fulfilled") {
      message.success("La Formation a été supprimée avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};

////////////////////Subject////////////////////

export const getAllSubjects = createAsyncThunk(
  "SuperAdmin/getAllSubjects",
  async ($, { rejectWithValue }) => {
    try {
      const response = await API.getAllSubjects();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createSubject = createAsyncThunk(
  "SuperAdmin/createSubject",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.createSubject(req);

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createSubj = (req, message, close, clearForm) => (dispatch) => {
  dispatch(createSubject(req)).then((data) => {
    if (data.type === "SuperAdmin/createSubject/fulfilled") {
      message.success("La module a été créée avec succès");
      close();
      clearForm();
    } else {
      message.error("un error se produit");
    }
  });
};

export const deteleSubject = createAsyncThunk(
  "SuperAdmin/deteleSubject",
  async (req) => {
    try {
      const response = await API.deteleSubject(req);

      return response.data;
    } catch (e) {
      //return rejectWithValue(e.response.data);
    }
  }
);

export const deteleSubj = (req, message) => (dispatch) => {
  dispatch(deteleSubject(req)).then((data) => {
    if (data.type === "SuperAdmin/deteleSubject/fulfilled") {
      message.success("La module a été supprimée avec succès");
    } else {
      message.error("un error se produit");
    }
  });
};
