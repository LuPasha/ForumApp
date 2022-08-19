import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "./features/channel/channelSlice";
export const store = configureStore({
  reducer: {
    channel: ChannelReducer,
  },
});
