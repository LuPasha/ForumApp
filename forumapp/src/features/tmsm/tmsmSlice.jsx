import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectTmsm: null,
  allChannels: [],
};

const TmsmSlice = createSlice({
  name: "tmsm",
  initialState,
  reducers: {
    setupSelectTmsm: (state, action) => {
      state.selectTmsm = action.payload;
    },
    setupAllChannels: (state, action) => {
      state.allChannels = action.payload;
    },
  },
});

export const { setupSelectTmsm, setupAllChannels } = TmsmSlice.actions;

export default TmsmSlice.reducer;
