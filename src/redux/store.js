import { configureStore } from "@reduxjs/toolkit";
import youtubeSlice from "./youtubeSlice";

export const store = configureStore({
  reducer: {
    youtube: youtubeSlice,
  },
});
