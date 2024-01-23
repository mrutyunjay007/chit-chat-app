import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInChat: false,
  isCreatingChat: false,
  isInProfile: false,
};

const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    InChat(state) {
      state.isInChat = true;
      state.isCreatingChat = false;
      state.isInProfile = false;
    },
    CreatingChat(state) {
      state.isCreatingChat = true;
      state.isInChat = false;
      state.isInProfile = false;
    },
    InProfile(state) {
      state.isInProfile = true;
      state.isInChat = false;
      state.isCreatingChat = false;
    },
  },
});

export const { InChat, CreatingChat, InProfile } = navSlice.actions;
export default navSlice.reducer;
