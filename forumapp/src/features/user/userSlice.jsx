import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userId: null,
  userName: null,
  userRooms: [],
  isDropdownOpen: false,
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
    toggleIcon: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    resetUser: (state) => {
      state.currentUser = null;
      state.userId = null;
      state.userName = null;
      state.userRooms = [];
      state.isDropdownOpen = false;
    },
  },
});

export const {
  loginUser,
  setupUid,
  setupUserRooms,
  setupUserName,
  toggleIcon,
  resetUser,
} = UserSlice.actions;
export default UserSlice.reducer;
