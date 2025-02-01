import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggle: true,
    popup: false,
  },

  reducers: {
    setToggleMenu(state, action) {
      state.toggle = !state.toggle;
    },
    setToggleMenuManual(state, action) {
      state.toggle = action.payload;
    },
    setPopupMenu(state, action) {
      state.popup = !state.popup;
    },
  },
});

export const { setToggleMenu, setToggleMenuManual, setPopupMenu } =
  toggleSlice.actions;

export default toggleSlice.reducer;
