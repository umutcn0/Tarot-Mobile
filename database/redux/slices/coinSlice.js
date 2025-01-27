import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coinAmount: 0,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoinAmount: (state, action) => {
      state.coinAmount = action.payload;
    },
    addCoinAmount: (state, action) => {
      state.coinAmount += action.payload;
    },
    subtractCoinAmount: (state, action) => {
      state.coinAmount -= action.payload;
    },
  },
});

export const { setCoinAmount, addCoinAmount, subtractCoinAmount } = coinSlice.actions;
export default coinSlice.reducer;