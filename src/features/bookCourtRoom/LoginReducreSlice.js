import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NODE_API_ENDPOINT } from "../../utils/utils";

export const retrieveCourtroomAuth = createAsyncThunk(
  "auth/retrieveAuth",
  async () => {
    const storedAuth = localStorage.getItem("courtroom-auth");
    console.log(storedAuth);
    if (storedAuth) {
      const parsedUser = JSON.parse(storedAuth);
      if (parsedUser.expiresAt < new Date().valueOf()) return null;
      const props = await fetch(
        `${NODE_API_ENDPOINT}/courtroom/getCourtroomUser`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      );
      const parsedProps = await props.json();
      // console.log(parsedProps.data);
      return {
        user: parsedUser,
      };
    } else return null;
  }
);

// Create a slice of the Redux store
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    caseOverview: "NA",
    firstDraft: "",
    firstDraftLoading: false,
    fightingSideModal: false,
  },
  reducers: {
    login(state, action) {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("courtroom-auth", JSON.stringify(user));
    },
    logout(state) {
      state.user = "";
      localStorage.removeItem("courtroom-auth");
    },
    setOverview(state, action) {
      state.caseOverview = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setFightingSideModal(state, action) {
      state.fightingSideModal = action.payload;
    },
    setFirstDraftLoading(state, action) {
      state.firstDraftLoading = !state.firstDraftLoading;
    },
    setFirstDraftAction(state, action) {
      state.firstDraft = action.payload.draft;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveCourtroomAuth.fulfilled, (state, action) => {
      if (action.payload && action.payload.user) {
        state.user = action.payload.user;
      }
    });
  },
});

// Export the action creators
export const {
  login,
  logout,
  setOverview,
  setUser,
  setFightingSideModal,
  setFirstDraftAction,
  setFirstDraftLoading,
} = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
