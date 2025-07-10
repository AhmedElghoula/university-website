import { createSlice } from "@reduxjs/toolkit";
import {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  //   createCompte,
  //   getFomationwithgrp,
  //   getSubjectsFromFormation,
  //   getFomations,
} from "../Thunk/NewsThunk";

export const NewsSlice = createSlice({
  name: "News",
  initialState: {
    allNews: [],
    loading: false,
    error: null,
  },
  //   reducers: {
  //     setCurrentPage: (state, action) => {
  //       state.currentPage = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder

      ///////////////////////////
      .addCase(getNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("payload:", action.payload);
        state.allNews = action.payload.allNewsCards.reverse(); //reverse this array
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      .addCase(updateNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg._id;
        if (id) {
          state.allNews = state.allNews.map((news) =>
            news._id === id ? action.payload.updatedNews : news
          );
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      .addCase(createNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("payload:", action.payload);
        state.allNews.unshift(action.payload.news);
        // state.numberOfPages = action.payload.numberOfPages;
        // state.currentPage = action.payload.currentPage;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      })

      .addCase(deleteNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg.id;
        if (id) {
          state.allNews = state.allNews.filter((news) => news._id !== id);
        }
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        // state.err=action.payload.message;
      });

    //   .addCase(createCompte.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(createCompte.fulfilled, (state, action) => {
    //     state.loading = false;

    //     state.comptes.allAccounts.unshift(action.payload.account);
    //     // state.comptes = action.payload;
    //     // state.numberOfPages =action.payload.numberOfPages;
    //     // state.currentPage= action.payload.currentPage;
    //   })
    //   .addCase(createCompte.rejected, (state, action) => {
    //     state.loading = false;
    //     // state.err=action.payload.message;
    //   })

    //   /////////////////////////////////////////////////////////////////
    //   .addCase(getFomationwithgrp.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(getFomationwithgrp.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Fomationswithgrp = action.payload;
    //   })
    //   .addCase(getFomationwithgrp.rejected, (state, action) => {
    //     state.loading = false;
    //     // state.err=action.payload.message;
    //   })
    //   /////////////////////////////////////////////////////////////////
    //   .addCase(getFomations.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(getFomations.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Fomations = action.payload;
    //   })
    //   .addCase(getFomations.rejected, (state, action) => {
    //     state.loading = false;
    //     // state.err=action.payload.message;
    //   })

    //   /////////////////////////////////////////////////////////////////
    //   .addCase(getSubjectsFromFormation.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(getSubjectsFromFormation.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.subjects = action.payload;
    //   })
    //   .addCase(getSubjectsFromFormation.rejected, (state, action) => {
    //     state.loading = false;
    //     // state.err=action.payload.message;
    //   });
  },
});

// export const { setCurrentPage } = SuperAdminSlice.actions;

export default NewsSlice.reducer;
