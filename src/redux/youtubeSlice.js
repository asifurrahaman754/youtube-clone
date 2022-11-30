import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
  user: {},
  Homevideos: [],
  activeCategory: "",
};

export const youtubeSlice = createSlice({
  name: "youtubeSlice",
  initialState,
  reducers: {
    setshowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setVideos: (state, action) => {
      state.Homevideos = action.payload;
    },
    setactiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setshowSidebar, setuser, setVideos, setactiveCategory } =
  youtubeSlice.actions;

export default youtubeSlice.reducer;
