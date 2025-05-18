import { createSlice } from "@reduxjs/toolkit";
import { fetchComic, fetchComics } from "@/store/comics/actions";

export const comicSlice = createSlice({
  name: "comic",
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

      .addCase(fetchComics.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.items = payload;

        return state;
      })
      .addCase(fetchComics.rejected, (state, { payload }) => {
        console.log("fetchComics_payload", payload);
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(fetchComics.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchComic.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.item = payload;

        return state;
      })
      .addCase(fetchComic.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(fetchComic.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = comicSlice.actions;

export const comicReducer = comicSlice.reducer;
