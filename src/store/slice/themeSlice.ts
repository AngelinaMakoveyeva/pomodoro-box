import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const theme = (state: RootState) => state.theme;
export default themeSlice.reducer;
