import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageContent: "",
  sendingMessage: "",
  imageMessage: "",
  messageView: 0,
};

const messageSlice = createSlice({
  name: "messageInfo",
  initialState,
  reducers: {
    AddMessageContent(state, action) {
      state.messageContent = action.payload;
    },
    AddSendingMessageContent(state, action) {
      state.sendingMessage = action.payload;
    },
    RemoveSedingMessage(state) {
      state.sendingMessage = "";
    },
    RemoveMessageContent(state) {
      state.messageContent = "";
    },
    ViewedMessage(state, action) {
      state.messageView = action.payload;
    },
    AddImageMessage(state, action) {
      state.imageMessage = action.payload;
    },
    RemoveImageMessage(state) {
      state.imageMessage = "";
    },
  },
});

export const {
  AddMessageContent,
  AddSendingMessageContent,
  RemoveMessageContent,
  RemoveSedingMessage,
  ViewedMessage,
  AddImageMessage,
  RemoveImageMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
