import { createSlice } from "@reduxjs/toolkit";
import { fetchChapter, fetchChapters } from "@/store/chapters/actions";

export const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    items: [],
    item: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchChapters.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.items = payload;

        return state;
      })
      .addCase(fetchChapters.rejected, (state, { payload }) => {
        console.log("fetchChapters_payload", payload);
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(fetchChapters.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchChapter.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.item = payload;

        return state;
      })
      .addCase(fetchChapter.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(fetchChapter.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = chapterSlice.actions;

export const chapterReducer = chapterSlice.reducer;
