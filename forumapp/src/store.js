import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "./features/channel/channelSlice";
import UserReducer from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    channel: ChannelReducer,
    user: UserReducer,
  },
});
