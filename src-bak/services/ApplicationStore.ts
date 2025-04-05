import {configureStore} from '@reduxjs/toolkit';
import {ComicsService} from "./ComicService";
import {ComicSlice} from "./slices/ComicSlice";
import {UserSlice} from "./slices/UserSlice";

const reducer = {
  [ComicsService.reducerPath]: ComicsService.reducer,
  comic: ComicSlice.reducer,

  user:UserSlice.reducer,
};
export function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ComicsService.middleware
        ),
  })
}

const store = makeStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {comics: ComicsState}
export type AppDispatch = typeof store.dispatch

export default store;
