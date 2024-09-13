import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const retrieveDrafterQuestions = createAsyncThunk(
  "drafts/retrieveDrafter",
  async ({ query, token }) => {
    try {
      const props = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/api/application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action: query }),
        }
      );
      const parsedProps = await props.json();
      console.log(parsedProps);
      return {
        drafterDoc: parsedProps.data.application.application,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

// Create a slice of the Redux store
const drafterSlice = createSlice({
  name: "drafter",
  initialState: {
    drafterDoc: null,
  },
  reducers: {
    removeDrafter(state) {
      state.drafterDoc = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveDrafterQuestions.fulfilled, (state, action) => {
      if (action.payload && action.payload.drafterDoc) {
        state.drafterDoc = action.payload.drafterDoc;
      }
    });
  },
});

// Export the action creators
export const { removeDrafter } = drafterSlice.actions;

// Export the reducer to be used in the store
export default drafterSlice.reducer;
