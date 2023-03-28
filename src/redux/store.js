import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import interestReducer from "../redux/features/interest/interestSlice";
import filterReducer from "../redux/features/interest/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interest: interestReducer,
    filter: filterReducer,
  },
});
