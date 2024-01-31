import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
