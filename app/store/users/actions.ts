import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser: any = createAsyncThunk(
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
        // localStorage.setItem("token", data.refreshedtoken);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      //   console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const registerUser: any = createAsyncThunk(
  "users/register",
  async ({ email, username, password }: any, thunkAPI) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        }
      );
      let data = await response.json();
      // console.log("response", data);
      if (response.status === 200) {
        // localStorage.setItem("token", data.refreshedtoken);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      //   console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUser: any = createAsyncThunk(
  "users/fetchUser",
  async ({ id, token }: any, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
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
export const fetchUsers: any = createAsyncThunk(
  "users/fetchUsers",
  async ({ token }: any, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
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
