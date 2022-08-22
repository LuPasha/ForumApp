import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userId: null,
  rooms: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setupUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { loginUser, setupUid } = UserSlice.actions;
export default UserSlice.reducer;
