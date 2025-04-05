import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/reducers/index"; // Import your root reducer

export const store = configureStore({
  reducer: rootReducer,
});
