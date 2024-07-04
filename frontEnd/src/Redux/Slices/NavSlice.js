import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInChat: true,
  isCreatingChat: false,
  isInNotification: false,
  isInProfile: false,
};

const navSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    InChat(state) {
      state.isInChat = true;
      state.isCreatingChat = false;
      state.isInNotification = false;
      state.isInProfile = false;
    },
    CreatingChat(state) {
      state.isCreatingChat = true;
      state.isInChat = false;
      state.isInNotification = false;
      state.isInProfile = false;
    },
    ShowNewNotification(state) {
      state.isInNotification = true;
      state.isInProfile = false;
      state.isInChat = false;
      state.isCreatingChat = false;
    },

    InProfile(state) {
      state.isInProfile = true;
      state.isInChat = false;
      state.isInNotification = false;
      state.isCreatingChat = false;
    },
  },
});

export const { InChat, CreatingChat, ShowNewNotification, InProfile } =
  navSlice.actions;
export default navSlice.reducer;
