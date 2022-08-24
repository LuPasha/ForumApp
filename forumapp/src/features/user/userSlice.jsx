import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userId: null,
  userName: null,
  userRooms: [],
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
    setupUserRooms: (state, action) => {
      state.userRooms = action.payload;
    },
    setupUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { loginUser, setupUid, setupUserRooms, setupUserName } =
  UserSlice.actions;
export default UserSlice.reducer;
