import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: { 
        sideBarState: false // Assuming the initial state is a boolean
    },
    reducers: {
        setSideBarState: (state, action) => { // Correct the action name
            state.sideBarState = action.payload;
        }
    },
});

export const { setSideBarState } = sideBarSlice.actions;
export const sideBarReducer = sideBarSlice.reducer;
