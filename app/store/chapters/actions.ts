// Need to use the React-specific entry point to import `createApi`
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChapters: any = createAsyncThunk(
  "chapters/fetchChapters",
  async ({ pagenumber, keyword, token }: any, thunkAPI) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/chapters/?page=${pagenumber}&search=${keyword}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const fetchChapter: any = createAsyncThunk(
  "chapters/fetchChapter",
  async ({ slug, token }: any, thunkAPI) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/chapters/${slug}/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
