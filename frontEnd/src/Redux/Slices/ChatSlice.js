import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  chatId: "",
  connecetionId: "",
  connectionUserName: "",
  connectionFullName: "",
  connectionProfilePic: "",
  isConnectionOnline: false,
};

const chatSlice = createSlice({
  name: "chatInfo",
  initialState,
  reducers: {
    chatAct(state, action) {
      state.status = action.payload;
    },
    activatedChat(state, action) {
      state.chatId = action.payload._id;
      state.connecetionId = action.payload.connection._id;
      state.connectionFullName = action.payload.connection.fullName;
      state.connectionUserName = action.payload.connection.userName;
    },
    connectionOnlineStatus(state, action) {
      state.isConnectionOnline = action.payload;
    },
  },
});

export const { chatAct, activatedChat, connectionOnlineStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
