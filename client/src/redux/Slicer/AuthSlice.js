import { createSlice } from "@reduxjs/toolkit";
import { AuthLogin, verifyAccount } from "../Thunk/AuthThunk";

const myData = JSON.parse(localStorage.getItem("user"));
const mystate = {
  myData,
  role: "",
  token: "",
  isLoggedIn: false,
  user: null,
  err: "",
  loading: false,
  resigter:{}
};

const initialState = mystate;

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.role = "";
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthLogin.fulfilled, (state, action) => {
        state.role = action.payload.user.role;
        state.isLoggedIn = true;
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.err = action.error.message;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.resigter = action.payload.user;
    
      })
     
  },
});

export const { logout } = AuthSlice.actions;
export const AuthError = (state) => state.Auth.error;
export const AuthToken = (state) => state.Auth.token;
export const AuthUser = (state) => state.Auth.user_type;
export const Authrole = (state) => state.Auth.role;

export default AuthSlice.reducer;
