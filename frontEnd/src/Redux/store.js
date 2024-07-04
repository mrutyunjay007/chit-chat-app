import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./Slices/NavSlice";
import ChatSlice from "./Slices/ChatSlice";
import SignUpSlice from "./Slices/SignUpSlice";
import UserSlice from "./Slices/UserSlice";
import NotificationSlice from "./Slices/NotificationSlice";
import SearchSlice from "./Slices/SearchSlice";
import MessageSlice from "./Slices/MessageSlice";

const store = configureStore({
  reducer: {
    Navigation: NavSlice,
    ChatInfo: ChatSlice,
    MessageInfo: MessageSlice,
    SignUpInfo: SignUpSlice,
    UserInfo: UserSlice,
    NotificationInfo: NotificationSlice,
    SearchInfo: SearchSlice,
  },
});

export default store;
