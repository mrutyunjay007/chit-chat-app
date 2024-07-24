import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userFullName: "",
  userName: "",
  profilePic: "",
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userData(state, action) {
      state.userId = action.payload.userId;
      state.userFullName = action.payload.userFullName;
      state.userName = action.payload.userName;
      state.profilePic = action.payload.profilePic;
    },
    upDateUserFullName(state, action) {
      state.userFullName = action.payload.userFullName;
    },
    upDateUserProfilePic(state, action) {
      state.profilePic = action.payload.profilePic;
    },
  },
});

export const { userData, upDateUserFullName, upDateUserProfilePic } =
  userSlice.actions;
export default userSlice.reducer;
