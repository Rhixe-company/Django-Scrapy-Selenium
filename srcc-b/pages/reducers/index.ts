import { combineReducers } from '@reduxjs/toolkit';
import comicsReducer from './comics'; // Import your slice reducers

export const rootReducer = combineReducers({
  comics: comicsReducer,
});

