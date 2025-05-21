import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../ApplicationStore";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ username, email, password }: any, thunkAPI) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log("data", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return { ...data, username: username, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      // console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      // console.log("response", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.access);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      // console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const INITIAL_STATE = {
  id: 0,
  username: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    logoutState: (state) => {
      localStorage.removeItem("token");
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.email = "";
      state.username = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log("payload", action.payload);
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.id = action.payload._id;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(loginUser.rejected, (state, { action }: any) => {
      // console.log("payload", action.payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      // console.log("payload", action.payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.id = action.payload.user._id;
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
    });
    builder.addCase(signupUser.rejected, (state, { action }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { clearState, logoutState } = UserSlice.actions;

export const userSelector = (state: RootState) => state.user;
