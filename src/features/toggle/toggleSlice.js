import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggle: true,
  },

  reducers: {
    setToggleMenu(state, action) {
      state.toggle = !state.toggle;
    },
    setToggleMenuManual(state, action) {
      state.toggle = action.payload;
    },
  },
});

export const { setToggleMenu, setToggleMenuManual } = toggleSlice.actions;

export default toggleSlice.reducer;
