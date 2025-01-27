import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/userAuthSlice";
import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import coinReducer from "./slices/coinSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    user: userReducer,
    alert: alertReducer,
    coin: coinReducer,
  },
});

export default store;
