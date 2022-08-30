import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservedWords: [],
};
const ReservedWordSlice = createSlice({
  name: "reserved",
  initialState,
  reducers: {
    addReservedWords: (state, action) => {
      state.reservedWords = [...state.reservedUserName, action.payload];
    },

    setupReservedWords: (state, action) => {
      state.reservedWords = action.payload;
    },
  },
});

export const { addReservedWords, setupReservedWords } =
  ReservedWordSlice.actions;

export default ReservedWordSlice.reducer;
