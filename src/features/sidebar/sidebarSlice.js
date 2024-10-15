import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        collapsed: false,
        sidebarTut:false
        
    },

    reducers: {
        toggle(state) {
            state.collapsed = !state.collapsed;
        },
        collapse(state) {
            state.collapsed = true;
        },
        expand(state) {
            state.collapsed = false;
        },
        setTutorial(state) {
            state.collapsed = true;
        },
        setTutorialFalse(state) {
            state.collapsed = false;
        }
    }
});

export const { toggle, collapse, expand, setTutorial, setTutorialFalse } = SidebarSlice.actions;

export default SidebarSlice.reducer;