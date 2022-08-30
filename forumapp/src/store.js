import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "./features/channel/channelSlice";
import UserReducer from "./features/user/userSlice";
import ReservedWordReducer from "./features/reservedWords/reservedWordsSlice";
export const store = configureStore({
  reducer: {
    channel: ChannelReducer,
    user: UserReducer,
    reserved: ReservedWordReducer,
  },
});
