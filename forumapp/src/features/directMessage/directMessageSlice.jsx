import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  selectFriend: null,
};

const DirectMessageSlice = createSlice({
  name: "directMessage",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends = [...state.friends, action.payload];
    },
    setupFriends: (state, action) => {
      state.friends = action.payload;
    },
    setupSelectFriend: (state, action) => {
      state.selectFriend = action.payload;
    },
  },
});

export const { addFriend, setupFriends, setupSelectFriend } =
  DirectMessageSlice.actions;

export default DirectMessageSlice.reducer;
