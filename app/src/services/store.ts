import { configureStore } from "@reduxjs/toolkit";

const reducer = {};

export function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
}

const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {comics: ComicsState}
export type AppDispatch = typeof store.dispatch;

export default store;
