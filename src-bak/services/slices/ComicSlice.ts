import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../ApplicationStore";

const INITIAL_STATE = {

  comics: []
}

export const ComicSlice = createSlice({
  name: 'comic',
  initialState: INITIAL_STATE,
  reducers: {
    getComics: (state, action: PayloadAction) => {
      state.comics = action.payload;
    }

  }
});

export const {getComics} = ComicSlice.actions;

export const selectComics = (state: RootState) => state.comics.results;

export default ComicSlice.reducer;
