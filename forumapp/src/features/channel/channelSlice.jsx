import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  total: 0,
  isAddChannelPopupOpen: false,
};

const ChannelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, { roomName: action.payload }];
    },
    setupRooms: (state, action) => {
      state.rooms = action.payload;
    },

    closeAddChannelPopupOpen: (state) => {
      state.isAddChannelPopupOpen = false;
    },
    openAddChannelPopupOpen: (state) => {
      state.isAddChannelPopupOpen = true;
    },
  },
});

export const {
  addRoom,
  closeAddChannelPopupOpen,
  openAddChannelPopupOpen,
  setupRooms,
} = ChannelSlice.actions;

export default ChannelSlice.reducer;
