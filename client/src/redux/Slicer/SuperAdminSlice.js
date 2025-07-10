import { createSlice } from "@reduxjs/toolkit";
import {
  getComptes,
  createCompte,
  getFomationwithgrp,
  getSubjectsFromFormation,
  getFomations,
  deteleAccount,
  getAllFormations,
  createFormation,
  deteleFormation,
  getAllSubjects,
  createSubject,
  deteleSubject,
  getAccountByCIN,
} from "../Thunk/SuperAdminThunk";

export const SuperAdminSlice = createSlice({
  name: "SuperAdmin",
  initialState: {
    comptes: [],
    compte: {},
    Fomationswithgrp: [],
    Fomations: [],
    subjects: [],
    currentPage: 1,
    numberOfPages: null,
    err: "",
    loading: false, 
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      ///////////////////////////
      .addCase(getComptes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getComptes.fulfilled, (state, action) => {
        state.loading = false;

        state.comptes = action.payload;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getComptes.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      

      .addCase(getAccountByCIN.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAccountByCIN.fulfilled, (state, action) => {
        state.loading = false;

        state.compte = action.payload.account;
      
      })
      .addCase(getAccountByCIN.rejected, (state, action) => {
        state.loading = false;
 
      })

      .addCase(createCompte.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCompte.fulfilled, (state, action) => {
        state.loading = false;

        state.comptes.allAccounts.unshift(action.payload.account);
        // state.comptes = action.payload;
        // state.numberOfPages =action.payload.numberOfPages;
        // state.currentPage= action.payload.currentPage;
      })
      .addCase(createCompte.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      /////////////////////////////////////////////////////////////////
      .addCase(getFomationwithgrp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFomationwithgrp.fulfilled, (state, action) => {
        state.loading = false;
        state.Fomationswithgrp = action.payload;
      })
      .addCase(getFomationwithgrp.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })
      /////////////////////////////////////////////////////////////////
      .addCase(getFomations.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFomations.fulfilled, (state, action) => {
        state.loading = false;
        state.Fomations = action.payload;
      })
      .addCase(getFomations.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      /////////////////////////////////////////////////////////////////
      .addCase(getSubjectsFromFormation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubjectsFromFormation.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(getSubjectsFromFormation.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      /////////////////////////////////////////////////////////////////
      .addCase(deteleAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deteleAccount.fulfilled, (state, action) => {
        state.loading = false;
        const cin = action.meta?.arg;

        if (cin) {
          state.comptes.allAccounts = state.comptes.allAccounts.filter(
            (item) => item.cin !== cin
          );
        }
      })
      .addCase(deteleAccount.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })
      ////////////////////////////formation////////////////////////////////////////////////
      .addCase(getAllFormations.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllFormations.fulfilled, (state, action) => {
        state.loading = false;

        state.Fomations = action.payload;
      })
      .addCase(getAllFormations.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(createFormation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createFormation.fulfilled, (state, action) => {
        state.loading = false;

        state.Fomations.allFormations.unshift(action.payload.formation);
      })
      .addCase(createFormation.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(deteleFormation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deteleFormation.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta?.arg;

        if (id) {
          state.Fomations.allFormations = state.Fomations.allFormations.filter(
            (item) => item._id !== id
          );
        }
      })
      .addCase(deteleFormation.rejected, (state, action) => {
        state.loading = false;
      })


      ////////////////////////////formation////////////////////////////////////////////////
      .addCase(getAllSubjects.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loading = false;

        state.subjects = action.payload;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(createSubject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;

       state.subjects.allSubjects.unshift(action.payload.subject);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(deteleSubject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deteleSubject.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta?.arg;

        if (id) {
          state.subjects.allSubjects = state.subjects.allSubjects.filter(
            (item) => item._id !== id
          );
        }
      })
      .addCase(deteleSubject.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const { setCurrentPage } = SuperAdminSlice.actions;

export default SuperAdminSlice.reducer;
