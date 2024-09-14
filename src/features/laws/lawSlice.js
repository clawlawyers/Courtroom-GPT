import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const retrieveCaseLaws = createAsyncThunk(
  "laws/retrieveLaws",
  async ({ query, token }) => {
    console.log(query);
    try {
      const props = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/case_search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        }
      );
      const parsedProps = await props.json();
      console.log(parsedProps);
      return {
        caseLaws: parsedProps.data.caseSearch.answer,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

// Create a slice of the Redux store
const lawSlice = createSlice({
  name: "laws",
  initialState: {
    caseLaws: [],
  },
  reducers: {
    removeCaseLaws(state) {
      state.caseLaws = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveCaseLaws.fulfilled, (state, action) => {
      if (action.payload && action.payload.caseLaws) {
        state.caseLaws = action.payload.caseLaws;
      }
    });
  },
});

// Export the action creators
export const { removeCaseLaws } = lawSlice.actions;

// Export the reducer to be used in the store
export default lawSlice.reducer;
