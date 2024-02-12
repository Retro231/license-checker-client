import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  activeOrg: [],
  newAddedOrg: [],
  removedOrg: [],
  suggestedCompany: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedCompany: (state, action) => {
      state.suggestedCompany = action.payload;
    },
    setActiveOrg: (state, action) => {
      state.activeOrg = action.payload;
    },
    setNewAddedOrg: (state, action) => {
      state.newAddedOrg = action.payload;
    },
    setRemovedOrg: (state, action) => {
      state.removedOrg = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setSuggestedCompany,
  setActiveOrg,
  setNewAddedOrg,
  setRemovedOrg,
} = appSlice.actions;

export default appSlice.reducer;
