import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  fetchUser,
  fetchUsers,
} from "@/store/users/actions";

const initialState = {
  item: {},
  items: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.item = {};
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.item = payload;

        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.item = payload;

        return state;
      })
      .addCase(registerUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.item = payload;

        return state;
      })
      .addCase(fetchUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.items = payload;

        return state;
      })
      .addCase(fetchUsers.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      });
  },
});

export const { logoutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
