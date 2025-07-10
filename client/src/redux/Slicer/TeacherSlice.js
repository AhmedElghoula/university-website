import { createSlice } from "@reduxjs/toolkit";
import { createCourse, deleteCourse, getAllMyCourses } from "../Thunk/TeacherThunk";


export const TeacherSlice = createSlice({
  name: "Teacher",
  initialState: {
    courses: [],
    compte: {},

    err: "",
    loading: true,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.result;
    },
  },
  extraReducers: (builder) => {
    builder

      ///////////////////////////
      .addCase(getAllMyCourses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllMyCourses.fulfilled, (state, action) => {
        state.loading = false;

        state.courses = action.payload;
      
      })
      .addCase(getAllMyCourses.rejected, (state, action) => {
        state.loading = false;
      
      })
      ///////////////////////////
 .addCase(createCourse.pending, (state, action) => {
  state.loading = true;
})
.addCase(createCourse.fulfilled, (state, action) => {
  state.loading = false;
  const id=action.payload.news.subject

  state.courses.result.map((item,i)=>{
    item.subjects.find(course => {
      if (course._id === id) {
      course.courses.unshift(action.payload.news)
      }
     
    });
  })
 
})
.addCase(createCourse.rejected, (state, action) => {
  state.loading = false;

})
 ///////////////////////////
 .addCase(deleteCourse.pending, (state, action) => {
  state.loading = true;
})
.addCase(deleteCourse.fulfilled, (state, action) => {
  // state.loading = false;
   const id = action.meta?.arg;
   const idsubject=action.payload.deletedCourse.subject

   state.courses.result.map((item,i)=>{
    item.subjects.find(course => {
       if (course._id === idsubject) {
     
      course.courses = course.courses.filter(
        (item) => item._id !== id
      );
       }
     
     });
   })
 

})
.addCase(deleteCourse.rejected, (state, action) => {
  state.loading = false;

})

      
  },
});

export const { setCurrentPage } = TeacherSlice.actions;

export default TeacherSlice.reducer;
