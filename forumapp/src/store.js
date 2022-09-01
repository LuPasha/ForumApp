import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "./features/channel/channelSlice";
import UserReducer from "./features/user/userSlice";
import ReservedWordReducer from "./features/reservedWords/reservedWordsSlice";
import DirectMessageReducer from "./features/directMessage/directMessageSlice";
import TmsmReducer from "./features/tmsm/tmsmSlice";
export const store = configureStore({
  reducer: {
    channel: ChannelReducer,
    user: UserReducer,
    reserved: ReservedWordReducer,
    directMessage: DirectMessageReducer,
    tmsm: TmsmReducer,
  },
});
