import { configureStore } from "@reduxjs/toolkit";
import User from "./User";

export const store = configureStore({
  reducer: {
    User,
  },
});
