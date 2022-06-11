import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  logged: false,
};

export const isUser = createSlice({
  name: "user_log",
  initialState,
  reducers: {
    setUserStore: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
  },
});

export const { setUserStore, clearUser } = isUser.actions;
export default isUser.reducer;
