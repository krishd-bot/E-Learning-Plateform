import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme") || "dudemy";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: storedTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dudemy" ? "dudemydark" : "dudemy";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
