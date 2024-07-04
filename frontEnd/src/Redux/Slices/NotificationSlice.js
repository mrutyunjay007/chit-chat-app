import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationElement: null,
  notificationCount: 0,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notificationInfo",
  initialState,
  reducers: {
    ConnectionElememtFromNotification(state, action) {
      state.notificationElement = action.payload;
    },
    NotificationCount(state, action) {
      state.notificationCount = action.payload;
    },
    ShowAllNotifications(state, action) {
      state.notifications = action.payload;
    },
    AddAllNotification(state, action) {
      state.notifications = action.payload;
    },
    AddNotification(state, action) {
      state.notifications.push(action.payload);
    },
    RemoveNotification(state, action) {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const {
  ConnectionElememtFromNotification,
  NotificationCount,
  ShowAllNotifications,
  AddAllNotification,
  AddNotification,
  RemoveNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
