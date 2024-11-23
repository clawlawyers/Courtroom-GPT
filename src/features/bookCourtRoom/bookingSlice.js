// Step 1: Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Step 2: Define the initial state
const initialState = {
  bookingData: "",
  planData: "",
};

// Step 3: Create the slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    setPlanData: (state, action) => {
      state.planData = action.payload;
    },
    setClearBooking: (state, action) => {
      state = initialState;
    },
  },
});

// Step 4: Export the actions and reducer
export const { setBookingData, setClearBooking, setPlanData } =
  bookingSlice.actions;
export default bookingSlice.reducer;
