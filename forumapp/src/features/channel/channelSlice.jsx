import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  total: 0,
};

const ChannelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, { roomName: action.payload }];
    },
    removeRoom: (state, action) => {},
  },
});

export const { addRoom } = ChannelSlice.actions;

export default ChannelSlice.reducer;
