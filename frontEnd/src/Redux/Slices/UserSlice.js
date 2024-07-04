import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userFullName: "",
  userName: "",
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userData(state, action) {
      state.userId = action.payload.userId;
      state.userFullName = action.payload.userFullName;
      state.userName = action.payload.userName;
    },
  },
});

export const { userData } = userSlice.actions;
export default userSlice.reducer;
