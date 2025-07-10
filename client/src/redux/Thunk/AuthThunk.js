import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../service";
import axios from "axios";
const URL = `http://localhost:5000/api/v1`;
export const customFetchwithCred = axios.create({
  withCredentials: true,
  baseURL: URL,
 
});


////////////////////Login////////////////////
export const auth = async (data) => {
  const response = await customFetchwithCred.post(URL + "/auth/login", data);
  return response.data;
};

export const AuthLogin = createAsyncThunk("Auth/login", async (request) => {
  try {
   
    const response = await auth(request);
    return response;
  } catch (error) {

    throw error.response.data;
  }
});

export const login =
  (request, message, setIsSubmitted, redirect) => async (dispatch) => {
    try {
      const data = await dispatch(AuthLogin(request));
      // Handle success
      if (data.type === "Auth/login/fulfilled") {
        localStorage.setItem("user", JSON.stringify(data.payload.user));
        setIsSubmitted(true);
        message.success("connecter avec succès");
        redirect("/");
      } else {
        message.error("error");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred during login:", error);
      message.error("An error occurred during login");
    }
  };



////////////////////Register////////////////////
export const authRegister = createAsyncThunk(
  "auth/register",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.register(req);

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const register = (req,message,redirect) => (dispatch) => {
  dispatch(authRegister(req)).then((data) => {
    if (data.type === "auth/register/fulfilled") {
      message.success('Compte créé avec succès');
      redirect("/")
    } else {
      message.error(data.payload.msg);
    }
  });
};


export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (req, { rejectWithValue }) => {
    try {
      const response = await API.verifyAccount(req);

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const verifyAcc = (req,message,next) => (dispatch) => {
  dispatch(verifyAccount(req)).then((data) => {

    if (data.type === "auth/verifyAccount/fulfilled") {
      next()
    } else {
      message.error(data.payload.msg);
    }
  });
};


// export const login = (request, message, setIsSubmitted,redirect) => (dispatch) => {
//   dispatch(AuthLogin(request)).then((data) => {
//     // auth success and get user_type
//     if (data.type === "Auth/login/fulfilled") {
//       //get user data a verifier  then cas d'erreur
//       // dispatch(GetUserData(data.payload.token)).then((datx) => {
//       //   localStorage.setItem(
//       //     "user",
//       //     JSON.stringify({ token: data.payload.token })
//       //   );
//         localStorage.setItem(
//           "user",
//           JSON.stringify(data.payload.user))
//           setIsSubmitted(true);
//           message.success('connecter avec succès');
//           redirect("/")
//          // message.('Vous ne pouvez télécharger que des fichiers JPG/PNG!');
//         //  openAlert(true, "Vous êtes connecté avec succès");

//       // });
//     }else{
//       message.error('error');
//     }
//   });
// };
