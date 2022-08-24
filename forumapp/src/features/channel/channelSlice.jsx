import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  total: 0,
  isAddChannelPopupOpen: false,
  isReplyPageOpen: false,
  replies: [],
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
    openReplyPage: (state) => {
      state.isReplyPageOpen = true;
    },
    closeReplyPage: (state) => {
      state.isReplyPageOpen = false;
    },
    setupReplies: (state, action) => {
      state.replies = action.payload;
    },
  },
});

export const {
  addRoom,
  closeAddChannelPopupOpen,
  openAddChannelPopupOpen,
  setupRooms,
  openReplyPage,
  closeReplyPage,
  setupReplies,
} = ChannelSlice.actions;

export default ChannelSlice.reducer;
