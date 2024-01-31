import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestedCompany: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSuggestedCompany: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSuggestedCompany } = appSlice.actions;

export default appSlice.reducer;
