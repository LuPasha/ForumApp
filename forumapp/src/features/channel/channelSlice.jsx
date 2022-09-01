import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  total: 0,
  isAddChannelPopupOpen: false,
  isReplyPageOpen: false,
  replies: [],
  selectRoom: null,
  selectMessage: null,
  displayMessage: null,
};

const ChannelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
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
    setupSelectRoom: (state, action) => {
      state.selectRoom = action.payload;
    },
    setupSelectMessage: (state, action) => {
      state.selectMessage = action.payload;
    },
  },
});

export const {
  closeAddChannelPopupOpen,
  openAddChannelPopupOpen,
  setupRooms,
  openReplyPage,
  closeReplyPage,
  setupReplies,
  setupSelectRoom,
  setupSelectMessage,
} = ChannelSlice.actions;

export default ChannelSlice.reducer;
